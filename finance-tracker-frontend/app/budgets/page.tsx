// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
// import { Badge } from "@/components/ui/badge"
// import { Navbar } from "@/components/layout/navbar"
// import { MobileNav } from "@/components/layout/mobile-nav"
// import { BudgetModal } from "@/components/modals/budget-modal"
// import { useToast } from "@/hooks/use-toast"
// import { getAuthHeaders, mockBudgets, mockCategories, mockExpenses, type Budget, type Category } from "@/lib/mock-data"
// import { Plus, Edit, Trash2, AlertTriangle, TrendingUp, DollarSign } from "lucide-react"
// import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"

// interface BudgetWithDetails extends Budget {
//   categoryName: string
//   categoryColor: string
//   totalSpent: number
//   remainingAmount: number
//   percentageUsed: number
//   isOverBudget: boolean
// }

// export default function BudgetsPage() {
//   const [budgets, setBudgets] = useState<Budget[]>([])
//   const [budgetsWithDetails, setBudgetsWithDetails] = useState<BudgetWithDetails[]>([])
//   const [categories, setCategories] = useState<Category[]>([])
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [editingBudget, setEditingBudget] = useState<Budget | null>(null)
//   const { toast } = useToast()
//   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
//   const [budgetToDelete, setBudgetToDelete] = useState<number | null>(null)
//   const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL


//   useEffect(() => {
//     loadBudgets()
//     loadCategories()
//   }, [])

//   useEffect(() => {
//     calculateBudgetDetails()
//   }, [budgets, categories])

//   const loadBudgets = async () => {
//     try {
//       // Mock implementation
//       // setBudgets(mockBudgets)

//       // TODO: Replace with real API
//       const response = await fetch(`${API_BASE_URL}/api/budgets`, {
//         headers: getAuthHeaders()
//       })

//       if (response.ok) {
//         const data = await response.json()
//         setBudgets(data)
//       } else {
//         throw new Error('Failed to load budgets')
//       }
//     } catch (error) {
//       console.error("Error loading budgets:", error)

//       // TODO: Add proper error handling
//       toast({
//         title: "Error loading budgets",
//         description: "Failed to load budgets. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const loadCategories = async () => {
//     try {
//       // Mock implementation
//       // setCategories(mockCategories)

//       // TODO: Replace with real API
//       const response = await fetch(`${API_BASE_URL}/api/categories`, {
//         headers: getAuthHeaders()
//       })

//       if (response.ok) {
//         const data = await response.json()
//         setCategories(data)
//       } else {
//         throw new Error('Failed to load categories')
//       }
//     } catch (error) {
//       console.error("Error loading categories:", error)

//       // TODO: Add proper error handling
//       toast({
//         title: "Error loading categories",
//         description: "Failed to load categories. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const calculateBudgetDetails = () => {
//     const budgetDetails: BudgetWithDetails[] = budgets.map((budget) => {
//       const category = categories.find((c) => c.id === budget.categoryId)
//       const totalSpent = mockExpenses
//         .filter((expense) => expense.categoryId === budget.categoryId)
//         .reduce((sum, expense) => sum + expense.amount, 0)

//       const remainingAmount = budget.limitAmount - totalSpent
//       const percentageUsed = (totalSpent / budget.limitAmount) * 100
//       const isOverBudget = totalSpent > budget.limitAmount

//       return {
//         ...budget,
//         categoryName: category?.name || "Unknown",
//         categoryColor: category?.color || "#gray",
//         totalSpent,
//         remainingAmount,
//         percentageUsed: Math.min(percentageUsed, 100),
//         isOverBudget,
//       }
//     })

//     setBudgetsWithDetails(budgetDetails)
//   }

//   const handleSaveBudget = (budget: Budget) => {
//     if (editingBudget) {
//       setBudgets((prev) => prev.map((b) => (b.id === budget.id ? budget : b)))
//     } else {
//       setBudgets((prev) => [...prev, budget])
//     }
//     setEditingBudget(null)
//   }

//   const handleEditBudget = (budget: Budget) => {
//     setEditingBudget(budget)
//     setIsModalOpen(true)
//   }

//   const handleDeleteBudget = async (budgetId: number) => {
//     try {
//       // Mock implementation
//       setBudgets((prev) => prev.filter((b) => b.id !== budgetId))

//       // TODO: Replace with real API
//       const response = await fetch(`${API_BASE_URL}/api/budgets/${budgetId}`, {
//         method: 'DELETE',
//         headers: getAuthHeaders()
//       })

//       if (response.ok) {
//         setBudgets(prev => prev.filter(b => b.id !== budgetId))
//       } else {
//         throw new Error('Failed to delete budget')
//       }

//       toast({
//         title: "Budget deleted",
//         description: "The budget has been removed successfully.",
//       })
//     } catch (error) {
//       console.error("Error deleting budget:", error)
//       toast({
//         title: "Error",
//         description: "Failed to delete budget. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setDeleteConfirmOpen(false)
//       setBudgetToDelete(null)
//     }
//   }

//   const openDeleteConfirmation = (budgetId: number) => {
//     setBudgetToDelete(budgetId)
//     setDeleteConfirmOpen(true)
//   }

//   const totalBudgetAmount = budgetsWithDetails.reduce((sum, budget) => sum + budget.limitAmount, 0)
//   const totalSpentAmount = budgetsWithDetails.reduce((sum, budget) => sum + budget.totalSpent, 0)
//   const overBudgetCount = budgetsWithDetails.filter((budget) => budget.isOverBudget).length

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="md:hidden p-4 bg-white border-b">
//         <div className="flex items-center justify-between">
//           <h1 className="text-lg font-semibold">Budgets</h1>
//           <MobileNav />
//         </div>
//       </div>

//       <div className="w-full p-4 sm:p-6 lg:p-8">
//         <div className="mb-8">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900 hidden md:block">Budgets</h1>
//               <p className="text-gray-600 hidden md:block">Monitor and manage your spending limits</p>
//             </div>
//             <Button onClick={() => setIsModalOpen(true)}>
//               <Plus className="h-4 w-4 mr-2" />
//               Add Budget
//             </Button>
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
//               <DollarSign className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">${totalBudgetAmount.toFixed(2)}</div>
//               <p className="text-xs text-muted-foreground">Across all categories</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
//               <TrendingUp className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">${totalSpentAmount.toFixed(2)}</div>
//               <p className="text-xs text-muted-foreground">
//                 {totalBudgetAmount > 0
//                   ? `${((totalSpentAmount / totalBudgetAmount) * 100).toFixed(1)}% of budget`
//                   : "No budget set"}
//               </p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Over Budget</CardTitle>
//               <AlertTriangle className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className={`text-2xl font-bold ${overBudgetCount > 0 ? "text-red-600" : "text-green-600"}`}>
//                 {overBudgetCount}
//               </div>
//               <p className="text-xs text-muted-foreground">
//                 {overBudgetCount === 0 ? "All budgets on track" : `${overBudgetCount} categories over budget`}
//               </p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Budget Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {budgetsWithDetails.map((budget) => (
//             <Card key={budget.id} className={`relative ${budget.isOverBudget ? "border-red-200 bg-red-50" : ""}`}>
//               <CardHeader className="pb-3">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="w-4 h-4 rounded-full" style={{ backgroundColor: budget.categoryColor }} />
//                     <CardTitle className="text-lg">{budget.categoryName}</CardTitle>
//                   </div>
//                   <div className="flex gap-1">
//                     <Button variant="ghost" size="sm" onClick={() => handleEditBudget(budget)}>
//                       <Edit className="h-4 w-4" />
//                     </Button>
//                     <Button variant="ghost" size="sm" onClick={() => openDeleteConfirmation(budget.id)}>
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//                 {budget.isOverBudget && (
//                   <Badge variant="destructive" className="w-fit">
//                     <AlertTriangle className="h-3 w-3 mr-1" />
//                     Over Budget
//                   </Badge>
//                 )}
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span>Spent</span>
//                     <span className={budget.isOverBudget ? "text-red-600 font-medium" : ""}>
//                       ${budget.totalSpent.toFixed(2)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span>Budget</span>
//                     <span>${budget.limitAmount.toFixed(2)}</span>
//                   </div>
//                   <Progress
//                     value={budget.percentageUsed}
//                     className={`h-2 ${budget.isOverBudget ? "[&>div]:bg-red-500" : ""}`}
//                   />
//                   <div className="flex justify-between text-sm">
//                     <span className={budget.remainingAmount >= 0 ? "text-green-600" : "text-red-600"}>
//                       {budget.remainingAmount >= 0 ? "Remaining" : "Over by"}
//                     </span>
//                     <span className={`font-medium ${budget.remainingAmount >= 0 ? "text-green-600" : "text-red-600"}`}>
//                       ${Math.abs(budget.remainingAmount).toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="text-center">
//                   <span className={`text-lg font-bold ${budget.isOverBudget ? "text-red-600" : "text-gray-900"}`}>
//                     {budget.percentageUsed.toFixed(1)}% used
//                   </span>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}

//           {budgetsWithDetails.length === 0 && (
//             <div className="col-span-full">
//               <Card>
//                 <CardContent className="flex flex-col items-center justify-center py-12">
//                   <DollarSign className="h-12 w-12 text-gray-400 mb-4" />
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">No budgets set</h3>
//                   <p className="text-gray-600 text-center mb-4">
//                     Create your first budget to start tracking your spending limits.
//                   </p>
//                   <Button onClick={() => setIsModalOpen(true)}>
//                     <Plus className="h-4 w-4 mr-2" />
//                     Add Budget
//                   </Button>
//                 </CardContent>
//               </Card>
//             </div>
//           )}
//         </div>
//       </div>
//       <ConfirmationDialog
//         open={deleteConfirmOpen}
//         onOpenChange={setDeleteConfirmOpen}
//         title="Delete Budget"
//         description="Are you sure you want to delete this budget? This action cannot be undone."
//         confirmText="Delete"
//         cancelText="Cancel"
//         variant="destructive"
//         onConfirm={() => budgetToDelete && handleDeleteBudget(budgetToDelete)}
//       />
//       <BudgetModal
//         open={isModalOpen}
//         onOpenChange={(open) => {
//           setIsModalOpen(open)
//           if (!open) setEditingBudget(null)
//         }}
//         budget={editingBudget}
//         onSave={handleSaveBudget}
//         existingBudgets={budgets}
//       />
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/layout/navbar"
import { MobileNav } from "@/components/layout/mobile-nav"
import { BudgetModal } from "@/components/modals/budget-modal"
import { useToast } from "@/hooks/use-toast"
import { Expense, getAuthHeaders, mockBudgets, mockCategories, mockExpenses, type Budget, type Category } from "@/lib/mock-data"
import { Plus, Edit, Trash2, AlertTriangle, TrendingUp, DollarSign, Loader2 } from "lucide-react"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"

interface BudgetWithDetails extends Budget {
  categoryName: string
  categoryColor: string
  totalSpent: number
  remainingAmount: number
  percentageUsed: number
  isOverBudget: boolean
}

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [budgetsWithDetails, setBudgetsWithDetails] = useState<BudgetWithDetails[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const { toast } = useToast()
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [budgetToDelete, setBudgetToDelete] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
    loadInitialData()
    loadExpenses()
  }, [])

  useEffect(() => {
    if (isDataLoaded && budgets.length >= 0 && categories.length >= 0) {
      calculateBudgetDetails()
    }
  }, [budgets, categories, isDataLoaded])

  const loadInitialData = async () => {
    setIsLoading(true)
    try {
      await Promise.all([loadBudgets(), loadCategories()])
      setIsDataLoaded(true)
    } catch (error) {
      console.error("Error loading initial data:", error)
      toast({
        title: "Error loading data",
        description: "Failed to load initial data. Please refresh the page.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

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
      // Mock implementation
      // setBudgets(mockBudgets)
      // return

      // TODO: Replace with real API
      const response = await fetch(`${API_BASE_URL}/api/budgets`, {
        headers: getAuthHeaders()
      })

      if (response.ok) {
        const data = await response.json()
        // Ensure all budget objects have proper structure
        const validBudgets = data.filter((budget: any) =>
          budget &&
          typeof budget.id !== 'undefined' &&
          typeof budget.limitAmount === 'number' &&
          typeof budget.categoryId !== 'undefined'
        )
        setBudgets(validBudgets)
      } else {
        throw new Error('Failed to load budgets')
      }
    } catch (error) {
      console.error("Error loading budgets:", error)
      // Fallback to mock data in case of error
      // setBudgets(mockBudgets || [])

      toast({
        title: "Error loading budgets",
        description: "Failed to load budgets. Using offline data.",
        variant: "destructive",
      })
    }
  }

  const loadCategories = async () => {
    try {
      // Mock implementation
      // setCategories(mockCategories)
      // return

      // TODO: Replace with real API
      const response = await fetch(`${API_BASE_URL}/api/categories`, {
        headers: getAuthHeaders()
      })

      if (response.ok) {
        const data = await response.json()
        // Ensure all category objects have proper structure
        const validCategories = data.filter((category: any) =>
          category &&
          typeof category.id !== 'undefined' &&
          typeof category.name === 'string'
        )
        setCategories(validCategories)
      } else {
        throw new Error('Failed to load categories')
      }
    } catch (error) {
      console.error("Error loading categories:", error)
      // Fallback to mock data in case of error
      // setCategories(mockCategories || [])

      toast({
        title: "Error loading categories",
        description: "Failed to load categories. Using offline data.",
        variant: "destructive",
      })
    }
  }

  const calculateBudgetDetails = () => {
    if (!budgets || !categories) return

    const budgetDetails: BudgetWithDetails[] = budgets.map((budget) => {
      // Ensure budget has valid properties
      const limitAmount = typeof budget.limitAmount === 'number' ? budget.limitAmount : 0
      const categoryId = budget.categoryId

      const category = categories.find((c) => c.id === categoryId)

      // Calculate total spent with proper null checks
      const totalSpent = expenses
        .filter((expense) => expense && expense.categoryId === categoryId)
        .reduce((sum, expense) => {
          const amount = typeof expense.amount === 'number' ? expense.amount : 0
          return sum + amount
        }, 0)

      const remainingAmount = limitAmount - totalSpent
      const percentageUsed = limitAmount > 0 ? (totalSpent / limitAmount) * 100 : 0
      const isOverBudget = totalSpent > limitAmount

      return {
        ...budget,
        limitAmount, // Ensure this is always a number
        categoryName: category?.name || "Unknown",
        categoryColor: category?.color || "#gray",
        totalSpent,
        remainingAmount,
        percentageUsed: Math.min(percentageUsed, 100),
        isOverBudget,
      }
    })

    setBudgetsWithDetails(budgetDetails)
  }

  const handleSaveBudget = async (budget: Budget) => {
    try {
      if (editingBudget) {
        // Update existing budget
        setBudgets((prev) => prev.map((b) => (b.id === budget.id ? budget : b)))

        // TODO: Replace with real API call
        // const response = await fetch(`${API_BASE_URL}/api/budgets/${budget.id}`, {
        //   method: 'PUT',
        //   headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
        //   body: JSON.stringify(budget)
        // })

        toast({
          title: "Budget updated",
          description: "The budget has been updated successfully.",
        })
      } else {
        // Create new budget
        setBudgets((prev) => [...prev, budget])

        // TODO: Replace with real API call
        // const response = await fetch(`${API_BASE_URL}/api/budgets`, {
        //   method: 'POST',
        //   headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
        //   body: JSON.stringify(budget)
        // })

        toast({
          title: "Budget created",
          description: "The new budget has been created successfully.",
        })
      }

      setEditingBudget(null)
      setIsModalOpen(false)

      // Reload data to ensure consistency
      await loadInitialData()

    } catch (error) {
      console.error("Error saving budget:", error)
      toast({
        title: "Error",
        description: "Failed to save budget. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEditBudget = (budget: Budget) => {
    setEditingBudget(budget)
    setIsModalOpen(true)
  }

  const handleDeleteBudget = async (budgetId: number) => {
    try {
      // TODO: Replace with real API
      const response = await fetch(`${API_BASE_URL}/api/budgets/${budgetId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })

      if (response.ok) {
        setBudgets(prev => prev.filter(b => b.id !== budgetId))
        toast({
          title: "Budget deleted",
          description: "The budget has been removed successfully.",
        })
      } else {
        throw new Error('Failed to delete budget')
      }

      // Mock implementation (remove this when API is ready)
      // setBudgets((prev) => prev.filter((b) => b.id !== budgetId))
      // toast({
      //   title: "Budget deleted",
      //   description: "The budget has been removed successfully.",
      // })

    } catch (error) {
      console.error("Error deleting budget:", error)
      toast({
        title: "Error",
        description: "Failed to delete budget. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeleteConfirmOpen(false)
      setBudgetToDelete(null)

      // Reload data to ensure consistency
      await loadInitialData()
    }
  }

  const openDeleteConfirmation = (budgetId: number) => {
    setBudgetToDelete(budgetId)
    setDeleteConfirmOpen(true)
  }

  // Safe calculations with null checks
  const totalBudgetAmount = budgetsWithDetails.reduce((sum, budget) => {
    const amount = typeof budget.limitAmount === 'number' ? budget.limitAmount : 0
    return sum + amount
  }, 0)

  const totalSpentAmount = budgetsWithDetails.reduce((sum, budget) => {
    const spent = typeof budget.totalSpent === 'number' ? budget.totalSpent : 0
    return sum + spent
  }, 0)

  const overBudgetCount = budgetsWithDetails.filter((budget) => budget.isOverBudget).length

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="md:hidden p-4 bg-white border-b">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Budgets</h1>
            <MobileNav />
          </div>
        </div>

        <div className="w-full p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Loading budgets...</h3>
              <p className="text-gray-600">Please wait while we load your data.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="md:hidden p-4 bg-white border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Budgets</h1>
          <MobileNav />
        </div>
      </div>

      <div className="w-full p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 hidden md:block">Budgets</h1>
              <p className="text-gray-600 hidden md:block">Monitor and manage your spending limits</p>
            </div>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Budget
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalBudgetAmount.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Across all categories</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSpentAmount.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {totalBudgetAmount > 0
                  ? `${((totalSpentAmount / totalBudgetAmount) * 100).toFixed(1)}% of budget`
                  : "No budget set"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Over Budget</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${overBudgetCount > 0 ? "text-red-600" : "text-green-600"}`}>
                {overBudgetCount}
              </div>
              <p className="text-xs text-muted-foreground">
                {overBudgetCount === 0 ? "All budgets on track" : `${overBudgetCount} categories over budget`}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Budget Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {budgetsWithDetails.map((budget) => (
            <Card key={budget.id} className={`relative ${budget.isOverBudget ? "border-red-200 bg-red-50" : ""}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: budget.categoryColor }} />
                    <CardTitle className="text-lg">{budget.categoryName}</CardTitle>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEditBudget(budget)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => openDeleteConfirmation(budget.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {budget.isOverBudget && (
                  <Badge variant="destructive" className="w-fit">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Over Budget
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Spent</span>
                    <span className={budget.isOverBudget ? "text-red-600 font-medium" : ""}>
                      ${(budget.totalSpent || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Budget</span>
                    <span>${(budget.limitAmount || 0).toFixed(2)}</span>
                  </div>
                  <Progress
                    value={budget.percentageUsed || 0}
                    className={`h-2 ${budget.isOverBudget ? "[&>div]:bg-red-500" : ""}`}
                  />
                  <div className="flex justify-between text-sm">
                    <span className={(budget.remainingAmount || 0) >= 0 ? "text-green-600" : "text-red-600"}>
                      {(budget.remainingAmount || 0) >= 0 ? "Remaining" : "Over by"}
                    </span>
                    <span className={`font-medium ${(budget.remainingAmount || 0) >= 0 ? "text-green-600" : "text-red-600"}`}>
                      ${Math.abs(budget.remainingAmount || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <span className={`text-lg font-bold ${budget.isOverBudget ? "text-red-600" : "text-gray-900"}`}>
                    {(budget.percentageUsed || 0).toFixed(1)}% used
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}

          {budgetsWithDetails.length === 0 && (
            <div className="col-span-full">
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <DollarSign className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No budgets set</h3>
                  <p className="text-gray-600 text-center mb-4">
                    Create your first budget to start tracking your spending limits.
                  </p>
                  <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Budget
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      <ConfirmationDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Delete Budget"
        description="Are you sure you want to delete this budget? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
        onConfirm={() => budgetToDelete && handleDeleteBudget(budgetToDelete)}
      />

      <BudgetModal
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open)
          if (!open) setEditingBudget(null)
        }}
        budget={editingBudget}
        onSave={handleSaveBudget}
        existingBudgets={budgets}
      />
    </div>
  )
}
