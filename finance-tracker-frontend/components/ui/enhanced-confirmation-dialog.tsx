"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface EnhancedConfirmationDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    categoryId: number | null
    expenseCount: number
    hasBudget: boolean
    onConfirm: () => void
}

export function EnhancedConfirmationDialog({
    open,
    onOpenChange,
    categoryId,
    expenseCount,
    hasBudget,
    onConfirm,
}: EnhancedConfirmationDialogProps) {
    const hasExpenses = expenseCount > 0

    const getDialogProps = () => {
        // Category has both expenses and budget
        if (hasExpenses && hasBudget) {
            return {
                title: "Delete Category, Budget, and Associated Expenses",
                description: `This category has a budget allocated and is used in ${expenseCount} expense(s). Deleting this category will also delete the budget and all associated expenses. Do you wish to continue?`,
                confirmText: "Delete All",
            }
        }

        // Category has only expenses, no budget
        if (hasExpenses && !hasBudget) {
            return {
                title: "Delete Category and Associated Expenses",
                description: `This category is used in ${expenseCount} expense(s). Deleting this category will also delete all associated expenses. Do you wish to continue?`,
                confirmText: "Delete All",
            }
        }

        // Category has only budget, no expenses
        if (!hasExpenses && hasBudget) {
            return {
                title: "Delete Category and Associated Budget",
                description: "This category has a budget allocated. Deleting this category will also delete the associated budget. Do you wish to continue?",
                confirmText: "Delete All",
            }
        }

        // Category has neither expenses nor budget
        return {
            title: "Delete Category",
            description: "Are you sure you want to delete this category? This action cannot be undone.",
            confirmText: "Delete",
        }
    }

    const dialogProps = getDialogProps()

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{dialogProps.title}</AlertDialogTitle>
                    <AlertDialogDescription>{dialogProps.description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {dialogProps.confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}