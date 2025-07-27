// "use client"

// import { useEffect, useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { Navbar } from "@/components/layout/navbar"
// import { MobileNav } from "@/components/layout/mobile-nav"
// import { useToast } from "@/hooks/use-toast"
// import { getAuthHeaders, mockExpenses, mockCategories, mockBudgets, Budget, Expense, Category } from "@/lib/mock-data"
// import {
//   DollarSign,
//   Wallet,
//   Calendar,
//   ShoppingCart,
//   AlertTriangle,
//   ArrowUpRight,
//   ArrowDownRight,
//   Clock,
//   Target,
// } from "lucide-react"

// interface DashboardSummary {
//   totalBudget: number
//   totalExpenses: number
//   remainingBudget: number
//   thisMonthExpenses: number
//   lastMonthExpenses: number
//   expenseChange: number
// }

// interface CategoryExpense {
//   id: number
//   name: string
//   amount: number
//   color: string
//   percentage: number
//   budgetLimit?: number
//   isOverBudget: boolean
// }

// interface RecentExpense {
//   id: number
//   description: string
//   amount: number
//   categoryName: string
//   categoryColor: string
//   date: string
//   daysAgo: number
// }

// export default function DashboardPage() {
//   const [summary, setSummary] = useState<DashboardSummary>({
//     totalBudget: 0,
//     totalExpenses: 0,
//     remainingBudget: 0,
//     thisMonthExpenses: 0,
//     lastMonthExpenses: 0,
//     expenseChange: 0,
//   })
//   const [categoryExpenses, setCategoryExpenses] = useState<CategoryExpense[]>([])
//   const [recentExpenses, setRecentExpenses] = useState<RecentExpense[]>([])
//   const [budgets, setBudgets] = useState<Budget[]>([])
//   const [expenses, setExpenses] = useState<Expense[]>([])
//   const [categories, setCategories] = useState<Category[]>([])
//   const [loading, setLoading] = useState(true)
//   const [dataLoaded, setDataLoaded] = useState(false)
//   const { toast } = useToast()
//   const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

//   // useEffect(() => {
//   //   loadExpenses()
//   //   loadBudgets()
//   //   loadCategories()
//   //   loadDashboardData()
//   // }, [])

//   useEffect(() => {
//     loadAllData()
//   }, [])

//   // Calculate dashboard data whenever the core data changes
//   useEffect(() => {
//     if (dataLoaded && budgets.length >= 0 && categories.length >= 0 && expenses.length >= 0) {
//       loadDashboardData()
//     }
//   }, [budgets, categories, expenses, dataLoaded])

//   const loadAllData = async () => {
//     setLoading(true)
//     try {
//       // Load all data in parallel, but wait for all to complete
//       await Promise.all([
//         loadBudgets(),
//         loadExpenses(),
//         loadCategories()
//       ])
//       setDataLoaded(true)
//     } catch (error) {
//       console.error("Error loading data:", error)
//       toast({
//         title: "Error loading data",
//         description: "Failed to load dashboard data. Please refresh the page.",
//         variant: "destructive",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const loadBudgets = async () => {
//     try {
//       // Mock implementation
//       // setBudgets(mockBudgets)
//       // return

//       // TODO: Replace with real API
//       const response = await fetch(`${API_BASE_URL}/api/budgets`, {
//         headers: getAuthHeaders()
//       })

//       if (response.ok) {
//         const data = await response.json()
//         // Ensure all budget objects have proper structure
//         const validBudgets = data.filter((budget: any) =>
//           budget &&
//           typeof budget.id !== 'undefined' &&
//           typeof budget.limitAmount === 'number' &&
//           typeof budget.categoryId !== 'undefined'
//         )
//         setBudgets(validBudgets)
//       } else {
//         throw new Error('Failed to load budgets')
//       }
//     } catch (error) {
//       console.error("Error loading budgets:", error)
//       // Fallback to mock data in case of error
//       // setBudgets(mockBudgets || [])

//       toast({
//         title: "Error loading budgets",
//         description: "Failed to load budgets. Using offline data.",
//         variant: "destructive",
//       })
//     }
//   }

//   const loadExpenses = async () => {
//     setLoading(true)
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/expenses`, {
//         headers: getAuthHeaders()
//       })

//       if (response.ok) {
//         const data = await response.json()
//         setExpenses(data)
//       } else {
//         throw new Error("Failed to load expenses")
//       }
//     } catch (error) {
//       console.error("Error loading expenses:", error)
//       toast({
//         title: "Error loading expenses",
//         description: "Failed to load expenses. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setLoading(false)
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

//   const loadDashboardData = async () => {
//     try {
//       // TODO: Replace with real API calls when backend is ready

//       // Fetch dashboard summary
//       const summaryResponse = await fetch(`${API_BASE_URL}/api/dashboard/summary`, {
//         headers: getAuthHeaders(),
//       })

//       if (summaryResponse.ok) {
//         const summaryData = await summaryResponse.json()
//         console.log("Summary Data:", summaryData)
//         setSummary(summaryData)
//       }

//       // Fetch category expenses
//       const categoryResponse = await fetch(`${API_BASE_URL}/api/dashboard/category-expenses`, {
//         headers: getAuthHeaders(),
//       })

//       if (categoryResponse.ok) {
//         const categoryData = await categoryResponse.json()
//         setCategoryExpenses(categoryData)
//       }

//       // // Fetch recent expenses
//       // const recentResponse = await fetch("/api/dashboard/recent-expenses?limit=5", {
//       //   headers: getAuthHeaders(),
//       // })

//       // if (recentResponse.ok) {
//       //   const recentData = await recentResponse.json()
//       //   setRecentExpenses(recentData)
//       // }


//       console.log(categories, expenses, budgets);

//       // Mock implementation - calculate from mock data
//       const totalBudget = budgets.reduce((sum, budget) => sum + budget.limitAmount, 0)
//       console.log("Total Budget:", totalBudget)
//       const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
//       console.log("Total Expenses:", totalExpenses)
//       const remainingBudget = totalBudget - totalExpenses
//       console.log("Remaining Budget:", remainingBudget)

//       // Mock monthly comparison
//       const thisMonthExpenses = totalExpenses
//       const lastMonthExpenses = 520.3
//       const expenseChange =
//         lastMonthExpenses > 0 ? ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100 : 0

//       setSummary({
//         totalBudget,
//         totalExpenses,
//         remainingBudget,
//         thisMonthExpenses,
//         lastMonthExpenses,
//         expenseChange,
//       })

//       // Calculate category-wise expenses with budget comparison
//       const categoryExpenseMap = new Map<number, number>()
//       expenses.forEach((expense) => {
//         const current = categoryExpenseMap.get(expense.categoryId) || 0
//         categoryExpenseMap.set(expense.categoryId, current + expense.amount)
//       })

//       const categoryData: CategoryExpense[] = Array.from(categoryExpenseMap.entries())
//         .map(([categoryId, amount]) => {
//           const category = categories.find((c) => c.id === categoryId)
//           const budget = budgets.find((b) => b.categoryId === categoryId)
//           const percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0

//           return {
//             id: categoryId,
//             name: category?.name || "Unknown",
//             amount,
//             color: category?.color || "#6b7280",
//             percentage,
//             budgetLimit: budget?.limitAmount,
//             isOverBudget: budget ? amount > budget.limitAmount : false,
//           }
//         })
//         .sort((a, b) => b.amount - a.amount)

//       setCategoryExpenses(categoryData)

//       // Calculate recent expenses with days ago
//       const recentExpenseData: RecentExpense[] = expenses
//         .map((expense) => {
//           const category = categories.find((c) => c.id === expense.categoryId)
//           const expenseDate = new Date(expense.date)
//           const today = new Date()
//           const diffTime = Math.abs(today.getTime() - expenseDate.getTime())
//           const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

//           return {
//             id: expense.id,
//             description: expense.description,
//             amount: expense.amount,
//             categoryName: category?.name || "Unknown",
//             categoryColor: category?.color || "#6b7280",
//             date: expense.date,
//             daysAgo: diffDays,
//           }
//         })
//         .sort((a, b) => a.daysAgo - b.daysAgo)
//         .slice(0, 5)

//       setRecentExpenses(recentExpenseData)
//     } catch (error) {
//       console.error("Error loading dashboard data:", error)

//       // TODO: Add proper error handling for API failures
//       // toast({
//       //   title: "Error loading dashboard",
//       //   description: "Failed to load dashboard data. Please try again.",
//       //   variant: "destructive",
//       // })
//     }
//   }

//   const formatCurrency = (amount: number) => `₹${amount.toFixed(2)}`

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="md:hidden p-4 bg-white border-b">
//         <div className="flex items-center justify-between">
//           <h1 className="text-lg font-semibold">Dashboard</h1>
//           <MobileNav />
//         </div>
//       </div>

//       <div className="w-full p-4 sm:p-6 lg:p-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 hidden md:block">Dashboard</h1>
//           <p className="text-gray-600 hidden md:block">Welcome back! Here's your financial overview</p>
//         </div>

//         {/* Main Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-blue-100">Total Budget</CardTitle>
//               <Wallet className="h-5 w-5 text-blue-200" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold">{formatCurrency(summary.totalBudget)}</div>
//               <p className="text-xs text-blue-100 mt-1">Allocated across all categories</p>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-green-100">This Month</CardTitle>
//               <Calendar className="h-5 w-5 text-green-200" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold">{formatCurrency(summary.thisMonthExpenses)}</div>
//               <div className="flex items-center mt-1">
//                 {summary.expenseChange >= 0 ? (
//                   <ArrowUpRight className="h-4 w-4 text-green-200 mr-1" />
//                 ) : (
//                   <ArrowDownRight className="h-4 w-4 text-green-200 mr-1" />
//                 )}
//                 <p className="text-xs text-green-100">{Math.abs(summary.expenseChange).toFixed(1)}% vs last month</p>
//               </div>
//             </CardContent>
//           </Card>

//           <Card
//             className={`${summary.remainingBudget >= 0 ? "bg-gradient-to-r from-emerald-500 to-emerald-600" : "bg-gradient-to-r from-red-500 to-red-600"} text-white`}
//           >
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium opacity-90">Remaining Budget</CardTitle>
//               <DollarSign className="h-5 w-5 opacity-75" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold">{formatCurrency(Math.abs(summary.remainingBudget))}</div>
//               <p className="text-xs opacity-90 mt-1">
//                 {summary.remainingBudget >= 0 ? "Available to spend" : "Over budget"}
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-purple-100">Categories</CardTitle>
//               <Target className="h-5 w-5 text-purple-200" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold">{categoryExpenses.length}</div>
//               <p className="text-xs text-purple-100 mt-1">
//                 {categoryExpenses.filter((c) => c.isOverBudget).length} over budget
//               </p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Category Breakdown */}
//           <Card className="lg:col-span-2">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <ShoppingCart className="h-5 w-5" />
//                 Spending by Category
//               </CardTitle>
//               <CardDescription>Your expense distribution this month</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {categoryExpenses.map((category) => (
//                   <div key={category.id} className="space-y-2">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
//                         <span className="font-medium">{category.name}</span>
//                         {category.isOverBudget && (
//                           <Badge variant="destructive" className="text-xs">
//                             <AlertTriangle className="h-3 w-3 mr-1" />
//                             Over Budget
//                           </Badge>
//                         )}
//                       </div>
//                       <div className="text-right">
//                         <div className="font-semibold">{formatCurrency(category.amount)}</div>
//                         <div className="text-sm text-gray-500">{category.percentage.toFixed(1)}%</div>
//                       </div>
//                     </div>
//                     <div className="space-y-1">
//                       <Progress
//                         value={category.percentage}
//                         className="h-2"
//                         style={{
//                           backgroundColor: `${category.color}20`,
//                         }}
//                       />
//                       {category.budgetLimit && (
//                         <div className="flex justify-between text-xs text-gray-500">
//                           <span>Budget: {formatCurrency(category.budgetLimit)}</span>
//                           <span>
//                             {category.budgetLimit - category.amount >= 0
//                               ? `${formatCurrency(category.budgetLimit - category.amount)} left`
//                               : `${formatCurrency(category.amount - category.budgetLimit)} over`}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//                 {categoryExpenses.length === 0 && (
//                   <div className="text-center py-8 text-gray-500">
//                     <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                     <p>No expenses yet</p>
//                     <p className="text-sm">Add your first expense to see the breakdown</p>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Recent Transactions */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Clock className="h-5 w-5" />
//                 Recent Transactions
//               </CardTitle>
//               <CardDescription>Your latest expenses</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {recentExpenses.map((expense) => (
//                   <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <div className="flex items-center gap-3">
//                       <div className="w-3 h-3 rounded-full" style={{ backgroundColor: expense.categoryColor }} />
//                       <div>
//                         <div className="font-medium text-sm">{expense.description}</div>
//                         <div className="text-xs text-gray-500">{expense.categoryName}</div>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="font-semibold text-sm">{formatCurrency(expense.amount)}</div>
//                       <div className="text-xs text-gray-500">
//                         {expense.daysAgo === 0
//                           ? "Today"
//                           : expense.daysAgo === 1
//                             ? "Yesterday"
//                             : `${expense.daysAgo} days ago`}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 {recentExpenses.length === 0 && (
//                   <div className="text-center py-8 text-gray-500">
//                     <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                     <p>No recent transactions</p>
//                     <p className="text-sm">Your recent expenses will appear here</p>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Quick Stats Row */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//           <Card>
//             <CardHeader className="pb-3">
//               <CardTitle className="text-lg">Average Daily Spending</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-blue-600">{formatCurrency(summary.totalExpenses / 30)}</div>
//               <p className="text-sm text-gray-600 mt-1">Based on this month's expenses</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="pb-3">
//               <CardTitle className="text-lg">Largest Expense</CardTitle>
//             </CardHeader>
//             <CardContent>
//               {expenses.length > 0 ? (
//                 <>
//                   <div className="text-2xl font-bold text-red-600">
//                     {formatCurrency(Math.max(...expenses.map((e) => e.amount)))}
//                   </div>
//                   <p className="text-sm text-gray-600 mt-1">
//                     {
//                       expenses.find((e) => e.amount === Math.max(...expenses.map((ex) => ex.amount)))
//                         ?.description
//                     }
//                   </p>
//                 </>
//               ) : (
//                 <div className="text-gray-500">No expenses yet</div>
//               )}
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="pb-3">
//               <CardTitle className="text-lg">Budget Utilization</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-green-600">
//                 {summary.totalBudget > 0 ? ((summary.totalExpenses / summary.totalBudget) * 100).toFixed(1) : 0}%
//               </div>
//               <p className="text-sm text-gray-600 mt-1">Of total budget used</p>
//               <Progress
//                 value={summary.totalBudget > 0 ? (summary.totalExpenses / summary.totalBudget) * 100 : 0}
//                 className="mt-2 h-2"
//               />
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/components/layout/navbar"
import { MobileNav } from "@/components/layout/mobile-nav"
import { useToast } from "@/hooks/use-toast"
import { useIsMobile } from "@/hooks/use-mobile"
import { useRouter } from "next/navigation"
import { getAuthHeaders, mockExpenses, mockCategories, mockBudgets, Budget, Expense, Category } from "@/lib/mock-data"
import {
  DollarSign,
  Coins,
  Wallet,
  Calendar,
  ShoppingCart,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Target,
  ArrowRight,
  Eye,
} from "lucide-react"

interface DashboardSummary {
  totalBudget: number
  totalExpenses: number
  remainingBudget: number
  thisMonthExpenses: number
  lastMonthExpenses: number
  expenseChange: number
}

interface CategoryExpense {
  id: number
  name: string
  amount: number
  color: string
  percentage: number
  budgetLimit?: number
  isOverBudget: boolean
}

interface RecentExpense {
  id: number
  description: string
  amount: number
  categoryName: string
  categoryColor: string
  date: string
  daysAgo: number
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary>({
    totalBudget: 0,
    totalExpenses: 0,
    remainingBudget: 0,
    thisMonthExpenses: 0,
    lastMonthExpenses: 0,
    expenseChange: 0,
  })
  const [categoryExpenses, setCategoryExpenses] = useState<CategoryExpense[]>([])
  const [recentExpenses, setRecentExpenses] = useState<RecentExpense[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [dataLoaded, setDataLoaded] = useState(false)
  const { toast } = useToast()
  const isMobile = useIsMobile()
  const router = useRouter()
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
    loadAllData()
  }, [])

  // Calculate dashboard data whenever the core data changes
  useEffect(() => {
    if (dataLoaded && budgets.length >= 0 && categories.length >= 0 && expenses.length >= 0) {
      loadDashboardData()
    }
  }, [budgets, categories, expenses, dataLoaded])

  const loadAllData = async () => {
    setLoading(true)
    try {
      // Load all data in parallel, but wait for all to complete
      await Promise.all([
        loadBudgets(),
        loadExpenses(),
        loadCategories()
      ])
      setDataLoaded(true)
    } catch (error) {
      console.error("Error loading data:", error)
      toast({
        title: "Error loading data",
        description: "Failed to load dashboard data. Please refresh the page.",
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
      toast({
        title: "Error loading budgets",
        description: "Failed to load budgets. Using offline data.",
        variant: "destructive",
      })
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

  const loadCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories`, {
        headers: getAuthHeaders()
      })

      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      } else {
        throw new Error('Failed to load categories')
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

  const loadDashboardData = async () => {
    try {
      // Fetch dashboard summary
      const summaryResponse = await fetch(`${API_BASE_URL}/api/dashboard/summary`, {
        headers: getAuthHeaders(),
      })

      if (summaryResponse.ok) {
        const summaryData = await summaryResponse.json()
        console.log("Summary Data:", summaryData)
        setSummary(summaryData)
      }

      // Fetch category expenses
      const categoryResponse = await fetch(`${API_BASE_URL}/api/dashboard/category-expenses`, {
        headers: getAuthHeaders(),
      })

      if (categoryResponse.ok) {
        const categoryData = await categoryResponse.json()
        setCategoryExpenses(categoryData)
      }

      console.log(categories, expenses, budgets);

      // Mock implementation - calculate from mock data
      const totalBudget = budgets.reduce((sum, budget) => sum + budget.limitAmount, 0)
      console.log("Total Budget:", totalBudget)
      const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
      console.log("Total Expenses:", totalExpenses)
      const remainingBudget = totalBudget - totalExpenses
      console.log("Remaining Budget:", remainingBudget)

      // Mock monthly comparison
      const thisMonthExpenses = totalExpenses
      const lastMonthExpenses = 520.3
      const expenseChange =
        lastMonthExpenses > 0 ? ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100 : 0

      setSummary({
        totalBudget,
        totalExpenses,
        remainingBudget,
        thisMonthExpenses,
        lastMonthExpenses,
        expenseChange,
      })

      // Calculate category-wise expenses with budget comparison
      const categoryExpenseMap = new Map<number, number>()
      expenses.forEach((expense) => {
        const current = categoryExpenseMap.get(expense.categoryId) || 0
        categoryExpenseMap.set(expense.categoryId, current + expense.amount)
      })

      const categoryData: CategoryExpense[] = Array.from(categoryExpenseMap.entries())
        .map(([categoryId, amount]) => {
          const category = categories.find((c) => c.id === categoryId)
          const budget = budgets.find((b) => b.categoryId === categoryId)
          const percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0

          return {
            id: categoryId,
            name: category?.name || "Unknown",
            amount,
            color: category?.color || "#6b7280",
            percentage,
            budgetLimit: budget?.limitAmount,
            isOverBudget: budget ? amount > budget.limitAmount : false,
          }
        })
        .sort((a, b) => b.amount - a.amount)

      setCategoryExpenses(categoryData)

      // Calculate recent expenses with days ago
      const recentExpenseData: RecentExpense[] = expenses
        .map((expense) => {
          const category = categories.find((c) => c.id === expense.categoryId)
          const expenseDate = new Date(expense.date)
          const today = new Date()
          const diffTime = Math.abs(today.getTime() - expenseDate.getTime())
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

          return {
            id: expense.id,
            description: expense.description,
            amount: expense.amount,
            categoryName: category?.name || "Unknown",
            categoryColor: category?.color || "#6b7280",
            date: expense.date,
            daysAgo: diffDays,
          }
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

      setRecentExpenses(recentExpenseData)
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    }
  }

  const formatCurrency = (amount: number) => `₹${amount.toFixed(2)}`

  // Get top 4 categories for display
  const displayCategories = categoryExpenses.slice(0, 4)
  const hasMoreCategories = categoryExpenses.length > 4

  // Get latest 5 expenses for display
  const displayExpenses = recentExpenses.slice(0, 4)
  const hasMoreExpenses = recentExpenses.length > 4

  const handleViewAllCategories = () => {
    router.push('/categories')
  }

  const handleViewAllExpenses = () => {
    router.push('/expenses')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="md:hidden p-4 bg-white border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <MobileNav />
        </div>
      </div>

      <div className="w-full p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 hidden md:block">Dashboard</h1>
          <p className="text-gray-600 hidden md:block">Welcome back! Here's your financial overview</p>
        </div>

        {/* Main Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Total Budget</CardTitle>
              <Wallet className="h-5 w-5 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatCurrency(summary.totalBudget)}</div>
              <p className="text-xs text-blue-100 mt-1">Allocated across all categories</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-100">This Month</CardTitle>
              <Calendar className="h-5 w-5 text-green-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatCurrency(summary.thisMonthExpenses)}</div>
              <div className="flex items-center mt-1">
                {summary.expenseChange >= 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-green-200 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-green-200 mr-1" />
                )}
                <p className="text-xs text-green-100">{Math.abs(summary.expenseChange).toFixed(1)}% vs last month</p>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`${summary.remainingBudget >= 0 ? "bg-gradient-to-r from-emerald-500 to-emerald-600" : "bg-gradient-to-r from-red-500 to-red-600"} text-white`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Remaining Budget</CardTitle>
              <DollarSign className="h-5 w-5 opacity-75" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatCurrency(Math.abs(summary.remainingBudget))}</div>
              <p className="text-xs opacity-90 mt-1">
                {summary.remainingBudget >= 0 ? "Available to spend" : "Over budget"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">Categories</CardTitle>
              <Target className="h-5 w-5 text-purple-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{categoryExpenses.length}</div>
              <p className="text-xs text-purple-100 mt-1">
                {categoryExpenses.filter((c) => c.isOverBudget).length} over budget
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Category Breakdown */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Spending by Category
                  </CardTitle>
                  <CardDescription className="mt-3">Your expense distribution</CardDescription>
                </div>
                {hasMoreCategories && (
                  <Button
                    variant="outline"
                    size={isMobile ? "sm" : "default"}
                    onClick={handleViewAllCategories}
                    className="flex items-center gap-2"
                  >
                    {isMobile ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <>
                        <span>View All</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {displayCategories.map((category) => (
                  <div key={category.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                        <span className="font-medium">{category.name}</span>
                        {category.isOverBudget && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Over Budget
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(category.amount)}</div>
                        <div className="text-sm text-gray-500">{category.percentage.toFixed(1)}%</div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Progress
                        value={category.percentage}
                        className="h-2"
                        style={{
                          backgroundColor: `${category.color}20`,
                        }}
                      />
                      {category.budgetLimit && (
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Budget: {formatCurrency(category.budgetLimit)}</span>
                          <span>
                            {category.budgetLimit - category.amount >= 0
                              ? `${formatCurrency(category.budgetLimit - category.amount)} left`
                              : `${formatCurrency(category.amount - category.budgetLimit)} over`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {displayCategories.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No expenses yet</p>
                    <p className="text-sm">Add your first expense to see the breakdown</p>
                  </div>
                )}
                {hasMoreCategories && (
                  <div className="pt-4 border-t">
                    <Button
                      variant="ghost"
                      onClick={handleViewAllCategories}
                      className="w-full flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                    >
                      <span>View {categoryExpenses.length - 4} more categories</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Transactions
                  </CardTitle>
                  <CardDescription className="mt-3">Your latest expenses</CardDescription>
                </div>
                {hasMoreExpenses && (
                  <Button
                    variant="outline"
                    size={isMobile ? "sm" : "default"}
                    onClick={handleViewAllExpenses}
                    className="flex items-center gap-2"
                  >
                    {isMobile ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <>
                        <span>View All</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {displayExpenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: expense.categoryColor }} />
                      <div>
                        <div className="font-medium text-sm">{expense.description}</div>
                        <div className="text-xs text-gray-500">{expense.categoryName}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm">{formatCurrency(expense.amount)}</div>
                      <div className="text-xs text-gray-500">
                        {expense.daysAgo === 0
                          ? "Today"
                          : expense.daysAgo === 1
                            ? "Yesterday"
                            : `${expense.daysAgo} days ago`}
                      </div>
                    </div>
                  </div>
                ))}
                {displayExpenses.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No recent transactions</p>
                    <p className="text-sm">Your recent expenses will appear here</p>
                  </div>
                )}
                {hasMoreExpenses && (
                  <div className="pt-4 border-t">
                    <Button
                      variant="ghost"
                      onClick={handleViewAllExpenses}
                      className="w-full flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                    >
                      <span>View all expenses</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Average Daily Spending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(summary.totalExpenses / 30)}</div>
              <p className="text-sm text-gray-600 mt-1">Based on this month's expenses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Largest Expense</CardTitle>
            </CardHeader>
            <CardContent>
              {expenses.length > 0 ? (
                <>
                  <div className="text-2xl font-bold text-red-600">
                    {formatCurrency(Math.max(...expenses.map((e) => e.amount)))}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {
                      expenses.find((e) => e.amount === Math.max(...expenses.map((ex) => ex.amount)))
                        ?.description
                    }
                  </p>
                </>
              ) : (
                <div className="text-gray-500">No expenses yet</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Budget Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {summary.totalBudget > 0 ? ((summary.totalExpenses / summary.totalBudget) * 100).toFixed(1) : 0}%
              </div>
              <p className="text-sm text-gray-600 mt-1">Of total budget used</p>
              <Progress
                value={summary.totalBudget > 0 ? (summary.totalExpenses / summary.totalBudget) * 100 : 0}
                className="mt-2 h-2"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
