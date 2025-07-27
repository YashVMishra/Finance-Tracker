// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
// import { Navbar } from "@/components/layout/navbar"
// import { MobileNav } from "@/components/layout/mobile-nav"
// import { ExpenseModal } from "@/components/modals/expense-modal"
// import { useToast } from "@/hooks/use-toast"
// import { getAuthHeaders, mockExpenses, mockCategories, type Expense, type Category } from "@/lib/mock-data"
// import { Plus, Edit, Trash2, Download, Search } from "lucide-react"
// import jsPDF from "jspdf"
// import "jspdf-autotable"
// import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"

// declare module "jspdf" {
//   interface jsPDF {
//     autoTable: (options: any) => jsPDF
//   }
// }

// export default function ExpensesPage() {
//   const [expenses, setExpenses] = useState<Expense[]>([])
//   const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([])
//   const [categories, setCategories] = useState<Category[]>([])
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [dateFrom, setDateFrom] = useState("")
//   const [dateTo, setDateTo] = useState("")
//   const { toast } = useToast()

//   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
//   const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null)
//   const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

//   useEffect(() => {
//     loadExpenses()
//     loadCategories()
//   }, [])

//   useEffect(() => {
//     filterExpenses()
//   }, [expenses, searchTerm, selectedCategory, dateFrom, dateTo])

//   const loadExpenses = async () => {
//     try {
//       // Mock implementation
//       // setExpenses(mockExpenses)

//       // TODO: Replace with real API
//       const response = await fetch(`${API_BASE_URL}/api/expenses`, {
//         headers: getAuthHeaders()
//       })

//       if (response.ok) {
//         const data = await response.json()
//         setExpenses(data)
//       } else {
//         throw new Error('Failed to load expenses')
//       }

//     } catch (error) {
//       console.error("Error loading expenses:", error)

//       //  TODO: Add proper error handling
//       toast({
//         title: "Error loading expenses",
//         description: "Failed to load expenses. Please try again.",
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

//   const filterExpenses = () => {
//     let filtered = expenses

//     if (searchTerm) {
//       filtered = filtered.filter((expense) => expense.description.toLowerCase().includes(searchTerm.toLowerCase()))
//     }

//     if (selectedCategory !== "all") {
//       filtered = filtered.filter((expense) => expense.categoryId === Number.parseInt(selectedCategory))
//     }

//     if (dateFrom) {
//       filtered = filtered.filter((expense) => expense.date >= dateFrom)
//     }

//     if (dateTo) {
//       filtered = filtered.filter((expense) => expense.date <= dateTo)
//     }

//     setFilteredExpenses(filtered)
//   }

//   const handleSaveExpense = (expense: Expense) => {
//     if (editingExpense) {
//       setExpenses((prev) => prev.map((e) => (e.id === expense.id ? expense : e)))
//     } else {
//       setExpenses((prev) => [...prev, expense])
//     }
//     setEditingExpense(null)
//   }

//   const handleEditExpense = (expense: Expense) => {
//     setEditingExpense(expense)
//     setIsModalOpen(true)
//   }

//   const handleDeleteExpense = async (expenseId: number) => {
//     try {
//       // Mock implementation
//       setExpenses((prev) => prev.filter((e) => e.id !== expenseId))

//       // TODO: Replace with real API
//       const response = await fetch(`${API_BASE_URL}/api/expenses/${expenseId}`, {
//         method: 'DELETE',
//         headers: getAuthHeaders()
//       })

//       if (response.ok) {
//         setExpenses(prev => prev.filter(e => e.id !== expenseId))
//       } else {
//         throw new Error('Failed to delete expense')
//       }


//       toast({
//         title: "Expense deleted",
//         description: "The expense has been removed successfully.",
//       })
//     } catch (error) {
//       console.error("Error deleting expense:", error)
//       toast({
//         title: "Error",
//         description: "Failed to delete expense. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setDeleteConfirmOpen(false)
//       setExpenseToDelete(null)
//     }
//   }

//   const openDeleteConfirmation = (expenseId: number) => {
//     setExpenseToDelete(expenseId)
//     setDeleteConfirmOpen(true)
//   }

//   const exportToPDF = () => {
//     const doc = new jsPDF()

//     doc.setFontSize(20)
//     doc.text("Expense Report", 20, 20)

//     doc.setFontSize(12)
//     doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35)
//     doc.text(`Total Expenses: ${filteredExpenses.length}`, 20, 45)
//     doc.text(`Total Amount: $${filteredExpenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}`, 20, 55)

//     const tableData = filteredExpenses.map((expense) => {
//       const category = categories.find((c) => c.id === expense.categoryId)
//       return [expense.date, expense.description, category?.name || "Unknown", `$${expense.amount.toFixed(2)}`]
//     })

//     doc.autoTable({
//       head: [["Date", "Description", "Category", "Amount"]],
//       body: tableData,
//       startY: 65,
//     })

//     doc.save("expense-report.pdf")

//     toast({
//       title: "PDF exported",
//       description: "Your expense report has been downloaded.",
//     })
//   }

//   const getCategoryName = (categoryId: number) => {
//     return categories.find((c) => c.id === categoryId)?.name || "Unknown"
//   }

//   const getCategoryColor = (categoryId: number) => {
//     return categories.find((c) => c.id === categoryId)?.color || "#gray"
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="md:hidden p-4 bg-white border-b">
//         <div className="flex items-center justify-between">
//           <h1 className="text-lg font-semibold">Expenses</h1>
//           <MobileNav />
//         </div>
//       </div>

//       <div className="w-full p-4 sm:p-6 lg:p-8">
//         <div className="mb-8">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900 hidden md:block">Expenses</h1>
//               <p className="text-gray-600 hidden md:block">Manage and track your expenses</p>
//             </div>
//             <div className="flex gap-2">
//               <Button onClick={exportToPDF} variant="outline">
//                 <Download className="h-4 w-4 mr-2" />
//                 Export PDF
//               </Button>
//               <Button onClick={() => setIsModalOpen(true)}>
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add Expense
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Filters */}
//         <Card className="mb-6">
//           <CardHeader>
//             <CardTitle>Filters</CardTitle>
//             <CardDescription>Filter your expenses by various criteria</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <Input
//                   placeholder="Search description..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//               <Select value={selectedCategory} onValueChange={setSelectedCategory}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="All categories" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All categories</SelectItem>
//                   {categories.map((category) => (
//                     <SelectItem key={category.id} value={category.id.toString()}>
//                       {category.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <Input
//                 type="date"
//                 placeholder="From date"
//                 value={dateFrom}
//                 onChange={(e) => setDateFrom(e.target.value)}
//               />
//               <Input type="date" placeholder="To date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
//               <Button
//                 variant="outline"
//                 onClick={() => {
//                   setSearchTerm("")
//                   setSelectedCategory("all")
//                   setDateFrom("")
//                   setDateTo("")
//                 }}
//               >
//                 Clear Filters
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Expenses Table */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Expense List ({filteredExpenses.length})</CardTitle>
//             <CardDescription>
//               Total: ${filteredExpenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Date</TableHead>
//                     <TableHead>Description</TableHead>
//                     <TableHead>Category</TableHead>
//                     <TableHead className="text-right">Amount</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredExpenses.map((expense) => (
//                     <TableRow key={expense.id}>
//                       <TableCell>{expense.date}</TableCell>
//                       <TableCell>{expense.description}</TableCell>
//                       <TableCell>
//                         <Badge
//                           variant="secondary"
//                           style={{
//                             backgroundColor: getCategoryColor(expense.categoryId) + "20",
//                             color: getCategoryColor(expense.categoryId),
//                           }}
//                         >
//                           {getCategoryName(expense.categoryId)}
//                         </Badge>
//                       </TableCell>
//                       <TableCell className="text-right font-medium">${expense.amount.toFixed(2)}</TableCell>
//                       <TableCell className="text-right">
//                         <div className="flex justify-end gap-2">
//                           <Button variant="ghost" size="sm" onClick={() => handleEditExpense(expense)}>
//                             <Edit className="h-4 w-4" />
//                           </Button>
//                           <Button variant="ghost" size="sm" onClick={() => openDeleteConfirmation(expense.id)}>
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                   {filteredExpenses.length === 0 && (
//                     <TableRow>
//                       <TableCell colSpan={5} className="text-center py-8 text-gray-500">
//                         No expenses found. Add your first expense to get started.
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <ExpenseModal
//         open={isModalOpen}
//         onOpenChange={(open) => {
//           setIsModalOpen(open)
//           if (!open) setEditingExpense(null)
//         }}
//         expense={editingExpense}
//         onSave={handleSaveExpense}
//       />
//       <ConfirmationDialog
//         open={deleteConfirmOpen}
//         onOpenChange={setDeleteConfirmOpen}
//         title="Delete Expense"
//         description="Are you sure you want to delete this expense? This action cannot be undone."
//         confirmText="Delete"
//         cancelText="Cancel"
//         variant="destructive"
//         onConfirm={() => expenseToDelete && handleDeleteExpense(expenseToDelete)}
//       />
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/layout/navbar"
import { MobileNav } from "@/components/layout/mobile-nav"
import { ExpenseModal } from "@/components/modals/expense-modal"
import { useToast } from "@/hooks/use-toast"
import { getAuthHeaders, type Expense, type Category } from "@/lib/mock-data"
import { Plus, Edit, Trash2, Download, Search } from "lucide-react"
import jsPDF from "jspdf"
import "jspdf-autotable"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [loading, setLoading] = useState(true)

  const { toast } = useToast()
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null)
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
    loadExpenses()
    loadCategories()
  }, [])

  useEffect(() => {
    filterExpenses()
  }, [expenses, searchTerm, selectedCategory, dateFrom, dateTo])

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

  const loadCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories`, {
        headers: getAuthHeaders()
      })

      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      } else {
        throw new Error("Failed to load categories")
      }
    } catch (error) {
      console.error("Error loading categories:", error)
      toast({
        title: "Error loading categories",
        description: "Failed to load categories. Please try again.",
        variant: "destructive",
      })
    }
  }

  const filterExpenses = () => {
    let filtered = expenses

    if (searchTerm) {
      filtered = filtered.filter((expense) =>
        expense.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((expense) => expense.categoryId === Number.parseInt(selectedCategory))
    }

    if (dateFrom) {
      filtered = filtered.filter((expense) => expense.date >= dateFrom)
    }

    if (dateTo) {
      filtered = filtered.filter((expense) => expense.date <= dateTo)
    }

    setFilteredExpenses(filtered)
  }

  const handleSaveExpense = () => {
    loadExpenses()
    setEditingExpense(null)
  }

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense)
    setIsModalOpen(true)
  }

  const handleDeleteExpense = async (expenseId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/expenses/${expenseId}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      })

      if (response.ok) {
        setExpenses((prev) => prev.filter((e) => e.id !== expenseId))
        toast({
          title: "Expense deleted",
          description: "The expense has been removed successfully.",
        })
      } else {
        throw new Error("Failed to delete expense")
      }
    } catch (error) {
      console.error("Error deleting expense:", error)
      toast({
        title: "Error",
        description: "Failed to delete expense. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeleteConfirmOpen(false)
      setExpenseToDelete(null)
    }
  }

  const openDeleteConfirmation = (expenseId: number) => {
    setExpenseToDelete(expenseId)
    setDeleteConfirmOpen(true)
  }

  const exportToPDF = () => {
    const doc = new jsPDF()

    doc.setFontSize(20)
    doc.text("Expense Report", 20, 20)

    doc.setFontSize(12)
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35)
    doc.text(`Total Expenses: ${filteredExpenses.length}`, 20, 45)
    doc.text(`Total Amount: $${filteredExpenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}`, 20, 55)

    const tableData = filteredExpenses.map((expense) => {
      const category = categories.find((c) => c.id === expense.categoryId)
      return [expense.date, expense.description, category?.name || "Unknown", `$${expense.amount.toFixed(2)}`]
    })

    doc.autoTable({
      head: [["Date", "Description", "Category", "Amount"]],
      body: tableData,
      startY: 65,
    })

    doc.save("expense-report.pdf")

    toast({
      title: "PDF exported",
      description: "Your expense report has been downloaded.",
    })
  }

  const getCategoryName = (categoryId: number) => {
    return categories.find((c) => c.id === categoryId)?.name || "Unknown"
  }

  const getCategoryColor = (categoryId: number) => {
    return categories.find((c) => c.id === categoryId)?.color || "#gray"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="md:hidden p-4 bg-white border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Expenses</h1>
          <MobileNav />
        </div>
      </div>

      <div className="w-full p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 hidden md:block">Expenses</h1>
              <p className="text-gray-600 hidden md:block">Manage and track your expenses</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={exportToPDF} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button onClick={() => setIsModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Filter your expenses by various criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="date"
                placeholder="From date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
              <Input
                type="date"
                placeholder="To date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setDateFrom("")
                  setDateTo("")
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Expenses Table */}
        <Card>
          <CardHeader>
            <CardTitle>Expense List ({filteredExpenses.length})</CardTitle>
            <CardDescription>
              Total: $
              {filteredExpenses.reduce((sum, e) => sum + (typeof e.amount === "number" ? e.amount : 0), 0).toFixed(2)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading expenses...</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExpenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell>{expense.date}</TableCell>
                        <TableCell>{expense.description}</TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            style={{
                              backgroundColor: getCategoryColor(expense.categoryId) + "20",
                              color: getCategoryColor(expense.categoryId),
                            }}
                          >
                            {getCategoryName(expense.categoryId)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ${typeof expense.amount === "number" ? expense.amount.toFixed(2) : "0.00"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditExpense(expense)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => openDeleteConfirmation(expense.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredExpenses.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                          No expenses found. Add your first expense to get started.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <ExpenseModal
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open)
          if (!open) setEditingExpense(null)
        }}
        expense={editingExpense}
        onSave={handleSaveExpense}
      />
      <ConfirmationDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Delete Expense"
        description="Are you sure you want to delete this expense? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
        onConfirm={() => expenseToDelete && handleDeleteExpense(expenseToDelete)}
      />
    </div>
  )
}

