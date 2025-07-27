"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/layout/navbar"
import { MobileNav } from "@/components/layout/mobile-nav"
import { CategoryModal } from "@/components/modals/category-modal"
import { useToast } from "@/hooks/use-toast"
import { Expense, getAuthHeaders, mockCategories, mockExpenses, type Category } from "@/lib/mock-data"
import { Plus, Edit, Trash2, Palette } from "lucide-react"
import { EnhancedConfirmationDialog } from "@/components/ui/enhanced-confirmation-dialog"

// Add Budget type
type Budget = {
  id: number
  categoryId: number
  limitAmount: number
  // Add other budget properties as needed
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const { toast } = useToast()
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
    loadCategories()
    loadExpenses()
    loadBudgets()
  }, [])

  const loadExpenses = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/expenses`, {
        headers: getAuthHeaders()
      })

      if (response.ok) {
        const data = await response.json()
        setExpenses(data)
      } else {
        throw new Error("Failed to load expenses")
      }
    } catch (error) {
      console.error("Error loading expenses:", error)
      toast({
        title: "Error loading expenses",
        description: "Failed to load expenses. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const loadBudgets = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/budgets`, {
        headers: getAuthHeaders()
      })

      if (response.ok) {
        const data = await response.json()
        setBudgets(data)
      } else {
        throw new Error("Failed to load budgets")
      }
    } catch (error) {
      console.error("Error loading budgets:", error)
      toast({
        title: "Error loading budgets",
        description: "Failed to load budgets. Please try again.",
        variant: "destructive",
      })
    }
  }

  const loadCategories = async () => {
    try {
      // Mock implementation
      // setCategories(mockCategories)

      // TODO: Replace with real API
      const response = await fetch(`${API_BASE_URL}/api/categories`, {
        headers: getAuthHeaders()
      })

      if (response.ok) {
        const data = await response.json()
        setCategories(data)
        console.log(data)
      } else {
        throw new Error('Failed to load categories')
      }
    } catch (error) {
      console.error("Error loading categories:", error)
      // TODO: Add proper error handling
      toast({
        title: "Error loading categories",
        description: "Failed to load categories. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSaveCategory = (category: Category) => {
    if (editingCategory) {
      setCategories((prev) => prev.map((c) => (c.id === category.id ? category : c)))
    } else {
      setCategories((prev) => [...prev, category])
    }

    loadCategories()
    setEditingCategory(null)
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setIsModalOpen(true)
  }

  const handleDeleteCategory = async (categoryId: number) => {
    // Check if category is being used by any expenses and budgets
    const associatedExpenses = expenses.filter((expense) => expense.categoryId === categoryId)
    const hasExpenses = associatedExpenses.length > 0
    const hasBudget = budgets.some((budget) => budget.categoryId === categoryId)

    try {
      // Delete in the order: expenses -> budgets -> category

      // 1. Delete associated expenses if any
      if (hasExpenses) {
        const deleteExpensesResponse = await fetch(`${API_BASE_URL}/api/expenses/deleteByCategoryId/${categoryId}`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        })

        if (!deleteExpensesResponse.ok) {
          throw new Error('Failed to delete associated expenses')
        }

        // Update local expenses state by removing the deleted expenses
        setExpenses(prev => prev.filter(expense => expense.categoryId !== categoryId))
      }

      // 2. Delete associated budget if any
      if (hasBudget) {
        const deleteBudgetResponse = await fetch(`${API_BASE_URL}/api/budgets/deleteByCategoryId/${categoryId}`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        })

        if (!deleteBudgetResponse.ok) {
          throw new Error('Failed to delete associated budget')
        }

        // Update local budgets state by removing the deleted budget
        setBudgets(prev => prev.filter(budget => budget.categoryId !== categoryId))
      }

      // 3. Delete the category
      const response = await fetch(`${API_BASE_URL}/api/categories/${categoryId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })

      if (response.ok) {
        setCategories(prev => prev.filter(c => c.id !== categoryId))

        // Show appropriate success message based on what was deleted
        if (hasExpenses && hasBudget) {
          toast({
            title: "Category, budget, and expenses deleted",
            description: `The category, its budget, and ${associatedExpenses.length} associated expense(s) have been removed successfully.`,
          })
        } else if (hasExpenses && !hasBudget) {
          toast({
            title: "Category and expenses deleted",
            description: `The category and its ${associatedExpenses.length} associated expense(s) have been removed successfully.`,
          })
        } else if (!hasExpenses && hasBudget) {
          toast({
            title: "Category and budget deleted",
            description: "The category and its associated budget have been removed successfully.",
          })
        } else {
          toast({
            title: "Category deleted",
            description: "The category has been removed successfully.",
          })
        }
      } else {
        throw new Error('Failed to delete category')
      }
    } catch (error) {
      console.error("Error deleting category:", error)
      toast({
        title: "Error",
        description: "Failed to delete category. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeleteConfirmOpen(false)
      setCategoryToDelete(null)
    }
  }

  const openDeleteConfirmation = (categoryId: number) => {
    setCategoryToDelete(categoryId)
    setDeleteConfirmOpen(true)
  }

  const getCategoryHasBudget = (categoryId: number) => {
    return budgets.some((budget) => budget.categoryId === categoryId)
  }

  const getCategoryExpenseCount = (categoryId: number) => {
    return expenses.filter((expense) => expense.categoryId === categoryId).length
  }

  const getCategoryTotalAmount = (categoryId: number) => {
    return expenses
      .filter((expense) => expense.categoryId === categoryId)
      .reduce((sum, expense) => sum + expense.amount, 0)
  }



  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="md:hidden p-4 bg-white border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Categories</h1>
          <MobileNav />
        </div>
      </div>

      <div className="w-full p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 hidden md:block">Categories</h1>
              <p className="text-gray-600 hidden md:block">Manage your expense categories</p>
            </div>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => openDeleteConfirmation(category.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Expenses</span>
                    <Badge variant="secondary">{getCategoryExpenseCount(category.id)}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Amount</span>
                    <span className="font-medium">${getCategoryTotalAmount(category.id).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Color</span>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded border" style={{ backgroundColor: category.color }} />
                      <span className="text-xs font-mono">{category.color}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {categories.length === 0 && (
            <div className="col-span-full">
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Palette className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No categories yet</h3>
                  <p className="text-gray-600 text-center mb-4">
                    Create your first category to start organizing your expenses.
                  </p>
                  <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      <EnhancedConfirmationDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        categoryId={categoryToDelete}
        expenseCount={categoryToDelete ? getCategoryExpenseCount(categoryToDelete) : 0}
        hasBudget={categoryToDelete ? getCategoryHasBudget(categoryToDelete) : false}
        onConfirm={() => categoryToDelete && handleDeleteCategory(categoryToDelete)}
      />
      <CategoryModal
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open)
          if (!open) setEditingCategory(null)
        }}
        category={editingCategory}
        onSave={handleSaveCategory}
      />
    </div>
  )
}