"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Category, getAuthHeaders, mockCategories, type Expense } from "@/lib/mock-data"

interface ExpenseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  expense?: Expense | null
  onSave: (expense: Expense) => void
}

export function ExpenseModal({ open, onOpenChange, expense, onSave }: ExpenseModalProps) {
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [date, setDate] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
    // Load categories when modal opens
    if (open) {
      loadCategories()
    }

    if (expense) {
      setAmount(expense.amount.toString())
      setDescription(expense.description)
      setCategoryId(expense.categoryId.toString())
      setDate(expense.date)
    } else {
      setAmount("")
      setDescription("")
      setCategoryId("")
      setDate(new Date().toISOString().split("T")[0])
    }
  }, [expense, open])

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsLoading(true)

  //   try {
  //     const expenseData: Expense = {
  //       id: expense?.id || Date.now(), // Mock ID generation
  //       userId: 1, // Mock user ID
  //       amount: Number.parseFloat(amount),
  //       description,
  //       categoryId: Number.parseInt(categoryId),
  //       date,
  //     }

  //     // Mock implementation
  //     onSave(expenseData)

  //     /* TODO: Replace with real API
  //     const url = expense ? `/api/expenses/${expense.id}` : '/api/expenses'
  //     const method = expense ? 'PUT' : 'POST'

  //     const response = await fetch(url, {
  //       method,
  //       headers: getAuthHeaders(),
  //       body: JSON.stringify(expenseData)
  //     })

  //     if (response.ok) {
  //       const savedExpense = await response.json()
  //       onSave(savedExpense)
  //     } else {
  //       const error = await response.json()
  //       throw new Error(error.message || 'Failed to save expense')
  //     }
  //     */

  //     toast({
  //       title: expense ? "Expense updated" : "Expense added",
  //       description: "Your expense has been saved successfully.",
  //     })

  //     onOpenChange(false)
  //   } catch (error) {
  //     console.error("Error saving expense:", error)
  //     toast({
  //       title: "Error",
  //       description: "Failed to save expense. Please try again.",
  //       variant: "destructive",
  //     })
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const loadCategories = async () => {
    try {

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const expenseData: Expense = {
        id: expense?.id || Date.now(), // Mock ID generation
        userId: 1, // Mock user ID
        amount: Number.parseFloat(amount),
        description,
        categoryId: Number.parseInt(categoryId),
        date,
      }

      const url = expense
        ? `${API_BASE_URL}/api/expenses/${expense.id}` // Optional: if your PUT endpoint accepts ID in URL
        : `${API_BASE_URL}/api/expenses`

      const method = expense ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(expenseData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to save expense")
      }

      const savedExpense = await response.json()
      onSave(savedExpense)

      toast({
        title: expense ? "Expense updated" : "Expense added",
        description: "Your expense has been saved successfully.",
      })

      onOpenChange(false)
    } catch (error) {
      console.error("Error saving expense:", error)
      toast({
        title: "Error",
        description: "Failed to save expense. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{expense ? "Edit Expense" : "Add New Expense"}</DialogTitle>
          <DialogDescription>
            {expense ? "Update your expense details." : "Enter the details of your new expense."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter expense description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={categoryId} onValueChange={setCategoryId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : expense ? "Update" : "Add"} Expense
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

