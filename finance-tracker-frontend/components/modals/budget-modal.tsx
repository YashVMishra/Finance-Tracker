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
import { useToast } from "@/hooks/use-toast"
import { Category, getAuthHeaders, mockCategories, type Budget } from "@/lib/mock-data"

interface BudgetModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  budget?: Budget | null
  onSave: (budget: Budget) => void
  existingBudgets: Budget[]
}

export function BudgetModal({ open, onOpenChange, budget, onSave, existingBudgets }: BudgetModalProps) {
  const [categoryId, setCategoryId] = useState("")
  const [limitAmount, setLimitAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const { toast } = useToast()
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
    if (open) {
      loadCategories()
    }

    if (budget) {
      setCategoryId(budget.categoryId.toString())
      setLimitAmount(budget.limitAmount.toString())
    } else {
      setCategoryId("")
      setLimitAmount("")
    }
  }, [budget, open])

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
      // Check if budget already exists for this category (only for new budgets)
      if (!budget) {
        const existingBudget = existingBudgets.find((b) => b.categoryId === Number.parseInt(categoryId))
        if (existingBudget) {
          toast({
            title: "Budget already exists",
            description: "A budget for this category already exists. Please edit the existing budget instead.",
            variant: "destructive",
          })
          setIsLoading(false)
          return
        }
      }

      // const budgetData: Budget = {
      //   id: budget?.id || Date.now(), // Mock ID generation
      //   userId: 1, // Mock user ID
      //   categoryId: Number.parseInt(categoryId),
      //   limitAmount: Number.parseFloat(limitAmount),
      // }

      // Prepare payload (without userId)
      const budgetData = {
        categoryId,
        limitAmount,
      }

      // Mock implementation
      // onSave(budgetData)

      // TODO: Replace with real API
      const url = budget ? `${API_BASE_URL}/api/budgets/${budget.id}` : `${API_BASE_URL}/api/budgets`
      const method = budget ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(budgetData)
      })

      if (response.ok) {
        const savedBudget = await response.json()
        onSave(savedBudget)
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Failed to save budget')
      }

      toast({
        title: budget ? "Budget updated" : "Budget added",
        description: "Your budget has been saved successfully.",
      })

      onOpenChange(false)
    } catch (error) {
      console.error("Error saving budget:", error)
      toast({
        title: "Error",
        description: "Failed to save budget. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Get available categories (exclude categories that already have budgets, unless editing)
  const availableCategories = categories.filter((category) => {
    if (budget && category.id === budget.categoryId) return true
    return !existingBudgets.some((b) => b.categoryId === category.id)
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{budget ? "Edit Budget" : "Add New Budget"}</DialogTitle>
          <DialogDescription>
            {budget ? "Update your budget limit." : "Set a spending limit for a category."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={categoryId}
                onValueChange={setCategoryId}
                required
                disabled={!!budget} // Disable category selection when editing
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {availableCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {budget && <p className="text-sm text-gray-500">Category cannot be changed when editing a budget.</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="limitAmount">Budget Limit</Label>
              <Input
                id="limitAmount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={limitAmount}
                onChange={(e) => setLimitAmount(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || availableCategories.length === 0}>
              {isLoading ? "Saving..." : budget ? "Update" : "Add"} Budget
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
