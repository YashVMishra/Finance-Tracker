// Mock data for development - replace with real API calls

export interface User {
  id: number
  name: string
  email: string
}

export interface Expense {
  id: number
  userId: number
  amount: number
  description: string
  categoryId: number
  date: string // Format: "YYYY-MM-DD"
}

export interface Category {
  id: number
  userId: number
  name: string
  color?: string
}

export interface Budget {
  id: number
  userId: number
  categoryId: number
  limitAmount: number
}

// Mock data
export const mockCategories: Category[] = [
  { id: 1, userId: 1, name: "Food & Dining", color: "#ef4444" },
  { id: 2, userId: 1, name: "Transportation", color: "#3b82f6" },
  { id: 3, userId: 1, name: "Shopping", color: "#8b5cf6" },
  { id: 4, userId: 1, name: "Entertainment", color: "#f59e0b" },
  { id: 5, userId: 1, name: "Bills & Utilities", color: "#10b981" },
  { id: 6, userId: 1, name: "Healthcare", color: "#ec4899" },
]

export const mockExpenses: Expense[] = [
  { id: 1, userId: 1, amount: 25.5, description: "Lunch at restaurant", categoryId: 1, date: "2024-01-15" },
  { id: 2, userId: 1, amount: 60.0, description: "Gas station", categoryId: 2, date: "2024-01-14" },
  { id: 3, userId: 1, amount: 120.0, description: "Grocery shopping", categoryId: 1, date: "2024-01-13" },
  { id: 4, userId: 1, amount: 15.99, description: "Netflix subscription", categoryId: 4, date: "2024-01-12" },
  { id: 5, userId: 1, amount: 85.0, description: "Electric bill", categoryId: 5, date: "2024-01-11" },
  { id: 6, userId: 1, amount: 45.0, description: "Movie tickets", categoryId: 4, date: "2024-01-10" },
  { id: 7, userId: 1, amount: 200.0, description: "Clothes shopping", categoryId: 3, date: "2024-01-09" },
  { id: 8, userId: 1, amount: 30.0, description: "Doctor visit", categoryId: 6, date: "2024-01-08" },
]

export const mockBudgets: Budget[] = [
  { id: 1, userId: 1, categoryId: 1, limitAmount: 500 },
  { id: 2, userId: 1, categoryId: 2, limitAmount: 200 },
  { id: 3, userId: 1, categoryId: 3, limitAmount: 300 },
  { id: 4, userId: 1, categoryId: 4, limitAmount: 150 },
  { id: 5, userId: 1, categoryId: 5, limitAmount: 400 },
  { id: 6, userId: 1, categoryId: 6, limitAmount: 100 },
]

// Helper functions to get token for API calls
export const getAuthToken = () => {
  return localStorage.getItem("finance_token")
}

export const getAuthHeaders = () => {
  const token = getAuthToken()
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}
