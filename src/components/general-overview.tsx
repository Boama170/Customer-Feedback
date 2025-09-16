"use client"

import { useState } from "react"
import { CompaniesTable } from "@/components/ui/companies-table"
import { FeedbackTable } from "@/components/feedback-table"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function Home() {
  const [currentView, setCurrentView] = useState<"home" | "companies" | "feedback">("home")
  const [selectedCompany, setSelectedCompany] = useState<string>("")

  const handleViewFeedback = (companyName: string) => {
    setSelectedCompany(companyName)
    setCurrentView("feedback")
  }

  if (currentView === "companies") {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentView("home")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold">Companies Management</h1>
        </div>
        <CompaniesTable onViewFeedback={handleViewFeedback} />
      </div>
    )
  }

  if (currentView === "feedback") {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentView("companies")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Companies
          </Button>
          <h1 className="text-2xl font-bold">Feedback for {selectedCompany}</h1>
        </div>
        <FeedbackTable companyName={selectedCompany} />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-lg">Manage your companies and feedback</p>
        <Button onClick={() => setCurrentView("companies")} size="lg" className="px-8">
          View Companies
        </Button>
      </div>
    </div>
  )
}
