 /* eslint-disable @typescript-eslint/no-unused-vars */ 
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Eye } from "lucide-react"

interface Feedback {
  id: string
  name: string
  date: string
  email: string
  recommendationScore: number
  feedback: string
}

interface ApiFeedback {
  id: string
  customerName: string
  customerEmail: string
  npsScore: number
  comments: string
  company: string
  timestamp: string
}

interface FeedbackTableProps {
  companyName: string
}

export function FeedbackTable({ companyName }: FeedbackTableProps) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(`/api/feedback?company=${encodeURIComponent(companyName)}`)
        if (response.ok) {
          const data: ApiFeedback[] = await response.json()
          const mappedFeedbacks: Feedback[] = data.map(f => ({
            id: f.id,
            name: f.customerName,
            date: new Date(f.timestamp).toISOString().split('T')[0],
            email: f.customerEmail,
            recommendationScore: f.npsScore,
            feedback: f.comments,
          }))
          setFeedbacks(mappedFeedbacks)
        }
      } catch (error) {
        console.error('Error fetching feedbacks:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFeedbacks()
  }, [companyName])

  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const getRecommendationBadge = (score: number) => {
    if (score >= 9) return <Badge className="bg-green-100 text-green-800">Promoter ({score})</Badge>
    if (score >= 7) return <Badge className="bg-yellow-100 text-yellow-800">Passive ({score})</Badge>
    return <Badge className="bg-red-100 text-red-800">Detractor ({score})</Badge>
  }

  const handleViewDetails = (feedback: Feedback) => {
    setSelectedFeedback(feedback)
    setIsDetailModalOpen(true)
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600"
    if (score >= 6) return "text-yellow-600"
    return "text-red-600"
  }

  
  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <CardTitle>Feedback for {companyName}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Recommendation</TableHead>
                <TableHead>Feedback</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Loading feedbacks...
                  </TableCell>
                </TableRow>
              ) : feedbacks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No feedbacks yet for {companyName}.
                  </TableCell>
                </TableRow>
              ) : (
                feedbacks.map((feedback) => (
                  <TableRow key={feedback.id}>
                    <TableCell className="font-medium">{feedback.name}</TableCell>
                    <TableCell>{new Date(feedback.date).toLocaleDateString()}</TableCell>
                    <TableCell>{getRecommendationBadge(feedback.recommendationScore)}</TableCell>
                    <TableCell className="max-w-xs truncate">{feedback.feedback}</TableCell>
                    <TableCell className="text-right">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => handleViewDetails(feedback)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View Details</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Feedback Details</DialogTitle>
          </DialogHeader>
          {selectedFeedback && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Customer</h4>
                  <p className="font-medium">{selectedFeedback.name}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Date</h4>
                  <p>{new Date(selectedFeedback.date).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">Email</h4>
                <p>{selectedFeedback.email}</p>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">Recommendation Score</h4>
                {getRecommendationBadge(selectedFeedback.recommendationScore)}
              </div>

           

              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">Feedback</h4>
                <p className="text-sm bg-muted p-3 rounded-md">{selectedFeedback.feedback}</p>
              </div>

            </div>
          )}
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
}
