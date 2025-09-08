"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Star, MessageSquare, CheckCircle } from "lucide-react"

interface FeedbackData {
  customerName: string
  customerEmail: string
  overallRating: number
  npsScore: number
  feedbackType: string
  comments: string
}

export default function FeedbackForm() {
  const [formData, setFormData] = useState<FeedbackData>({
    customerName: "",
    customerEmail: "",
    overallRating: 0,
    npsScore: 0,
    feedbackType: "",
    comments: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleStarClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, overallRating: rating }))
  }

  const handleNpsClick = (score: number) => {
    setFormData((prev) => ({ ...prev, npsScore: score }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store feedback in localStorage for demo purposes
    const existingFeedback = JSON.parse(localStorage.getItem("customerFeedback") || "[]")
    const newFeedback = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    }
    existingFeedback.push(newFeedback)
    localStorage.setItem("customerFeedback", JSON.stringify(existingFeedback))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const resetForm = () => {
    setFormData({
      customerName: "",
      customerEmail: "",
      overallRating: 0,
      npsScore: 0,
      feedbackType: "",
      comments: "",
    })
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold text-green-700">Thank You!</h2>
              <p className="text-muted-foreground">
                Your feedback has been submitted successfully. We appreciate you taking the time to share your thoughts
                with us.
              </p>
              <Button onClick={resetForm} variant="outline">
                Submit Another Response
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <MessageSquare className="h-6 w-6" />
            Customer Feedback
          </CardTitle>
          <CardDescription>
            We value your opinion! Please take a moment to share your experience with us.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.customerName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, customerName: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData((prev) => ({ ...prev, customerEmail: e.target.value }))}
                  required
                />
              </div>
            </div>

            {/* Overall Rating */}
            <div className="space-y-3">
              <Label>Overall Experience *</Label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= formData.overallRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {formData.overallRating > 0 &&
                    `${formData.overallRating} star${formData.overallRating !== 1 ? "s" : ""}`}
                </span>
              </div>
            </div>

            {/* NPS Score */}
            <div className="space-y-3">
              <Label>How likely are you to recommend us to others? *</Label>
              <div className="grid grid-cols-11 gap-1">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                  <button
                    key={score}
                    type="button"
                    onClick={() => handleNpsClick(score)}
                    className={`h-10 w-full rounded text-sm font-medium transition-colors ${
                      score === formData.npsScore ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Not likely</span>
                <span>Very likely</span>
              </div>
            </div>

            {/* Feedback Type */}
            <div className="space-y-3">
              <Label>Type of Feedback *</Label>
              <RadioGroup
                value={formData.feedbackType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, feedbackType: value }))}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compliment" id="compliment" />
                  <Label htmlFor="compliment" className="cursor-pointer">
                    Compliment - Something we did well
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="suggestion" id="suggestion" />
                  <Label htmlFor="suggestion" className="cursor-pointer">
                    Suggestion - How we can improve
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="complaint" id="complaint" />
                  <Label htmlFor="complaint" className="cursor-pointer">
                    Complaint - Something that went wrong
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Comments */}
            <div className="space-y-2">
              <Label htmlFor="comments">Additional Comments</Label>
              <Textarea
                id="comments"
                placeholder="Please share any additional thoughts or details..."
                value={formData.comments}
                onChange={(e) => setFormData((prev) => ({ ...prev, comments: e.target.value }))}
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={
                isSubmitting ||
                !formData.customerName ||
                !formData.customerEmail ||
                !formData.overallRating ||
                !formData.npsScore ||
                !formData.feedbackType
              }
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
