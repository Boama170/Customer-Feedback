"use client"

import type React from "react"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

interface FeedbackData {
  customerName: string
  customerEmail: string
  npsScore: number
  comments: string
}

export default function FeedbackForm() {
  const [formData, setFormData] = useState<FeedbackData>({
    customerName: "",
    customerEmail: "",
    npsScore: 0,
    comments: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNpsClick = (score: number) => {
    setFormData((prev) => ({ ...prev, npsScore: score }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const existingFeedback = JSON.parse(
      localStorage.getItem("customerFeedback") || "[]"
    )
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
      npsScore: 0,
      comments: "",
    })
    setIsSubmitted(false)
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Card className="rounded-2xl shadow-md">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                  </motion.div>
                  <h2 className="text-xl font-bold text-green-700">
                    Thank You!
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Your feedback has been submitted successfully. We
                    appreciate you taking the time to share your thoughts
                    with us.
                  </p>
                  <Button
                    onClick={resetForm}
                    variant="outline"
                    className="w-full"
                  >
                    Submit Another Response
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="text-center space-y-2 pb-4">
                <CardTitle className="flex items-center justify-center gap-2 text-lg">
                  <MessageSquare className="h-5 w-5" />
                  Customer Feedback
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  We value your opinion! Please take a moment to share your
                  experience with us.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-6">
                  {/* Customer Information */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.customerName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            customerName: e.target.value,
                          }))
                        }
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.customerEmail}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            customerEmail: e.target.value,
                          }))
                        }
                        className="rounded-xl"
                      />
                    </div>
                  </motion.div>

                  {/* NPS Score */}
                  <div className="space-y-3">
                    <Label>
                      How likely are you to recommend us to others? *
                    </Label>
                    <div className="grid grid-cols-6 gap-2">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                        <motion.button
                          key={score}
                          type="button"
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleNpsClick(score)}
                          className={`h-10 rounded-lg text-sm font-medium transition-colors ${
                            score === formData.npsScore
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted hover:bg-muted/80"
                          }`}
                        >
                          {score}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comments">What's your overall view of our company? *</Label>
                    <Textarea
                      id="comments"
                      placeholder="Please share your thoughts about our company..."
                      value={formData.comments}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          comments: e.target.value,
                        }))
                      }
                      rows={4}
                      className="rounded-xl"
                    />
                  </div>

                  {/* Sticky Submit */}
                  <motion.div
                    className="pt-4 sticky bottom-0 bg-white"
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      onClick={handleSubmit}
                      className="w-full rounded-xl h-12 text-base"
                      disabled={
                        isSubmitting ||
                        !formData.customerName ||
                        !formData.customerEmail ||
                        !formData.npsScore ||
                        !formData.comments
                      }
                    >
                      {isSubmitting ? "Submitting..." : "Submit Feedback"}
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}