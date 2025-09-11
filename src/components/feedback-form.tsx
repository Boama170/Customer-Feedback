"use client"

import type React from "react"
import { useState, useEffect } from "react"

 import { useParams } from "next/navigation"
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
import router from "next/router"

interface FeedbackData {
  customerName: string
  customerEmail: string
  npsScore: number
  comments: string
  company: string
}

interface CompanyConfig {
  name: string
  logo?: string
  primaryColor: string
  secondaryColor: string
  gradientFrom: string
  gradientTo: string
  theme: {
    background: string
    text: string
    accent: string
  }
}

// ...existing code...
const companyConfigs: Record<string, CompanyConfig> = {
  'best-western': {
    name: 'Best Western',
    primaryColor: '#b91c1c', // from-red-700
    secondaryColor: '#dc2626', // to-red-600
    gradientFrom: 'from-red-100',
    gradientTo: 'to-red-200',
    theme: {
      background: 'bg-red-50',
      text: 'text-red-900',
      accent: 'text-red-600'
    }
  },
  'soho': {
    name: 'SOHO',
    primaryColor: '#3b82f6', // from-blue-500
    secondaryColor: '#2563eb', // to-blue-600
    gradientFrom: 'from-blue-100',
    gradientTo: 'to-blue-200',
    theme: {
      background: 'bg-blue-50',
      text: 'text-blue-900',
      accent: 'text-blue-600'
    }
  },
  'white': {
    name: 'White Restaurant',
    primaryColor: '#64748b', // from-slate-500
    secondaryColor: '#334155', // to-slate-700
    gradientFrom: 'from-slate-100',
    gradientTo: 'to-slate-200',
    theme: {
      background: 'bg-slate-50',
      text: 'text-slate-900',
      accent: 'text-slate-700'
    }
  },
}

export default function FeedbackForm() {

 const params = useParams() // App Router
 const company = params?.company // App Router

  const [formData, setFormData] = useState<FeedbackData>({
    customerName: "",
    customerEmail: "",
    npsScore: 0,
    comments: "",
    company: company as string || ""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const companyConfig = companyConfigs[company as string]

  // Update company in form data when route changes
  useEffect(() => {
    if (company) {
      setFormData(prev => ({ ...prev, company: company as string }))
    }
  }, [company])

  // Handle case where company doesn't exist
  useEffect(() => {
    if (company && !companyConfig) {
      router.push('/404')
    }
  }, [company, companyConfig])

  const handleNpsClick = (score: number) => {
    setFormData((prev) => ({ ...prev, npsScore: score }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      // Send to your API endpoint instead of localStorage
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString()
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        alert('Error submitting feedback. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error submitting feedback. Please try again.')
    }

    setIsSubmitting(false)
  }

  const resetForm = () => {
    setFormData({
      customerName: "",
      customerEmail: "",
      npsScore: 0,
      comments: "",
      company: company as string || ""
    })
    setIsSubmitted(false)
  }

  // Loading state
  if (!company || !companyConfig) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold text-gray-900">Loading...</h1>
        </div>
      </main>
    )
  }

  return (
    <main className={`min-h-screen bg-gradient-to-br ${companyConfig.gradientFrom} ${companyConfig.gradientTo} py-8 px-4`}>
      <div className="container mx-auto">
        <div className="max-w-md mx-auto">
          {/* Company Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div
              className="inline-block px-6 py-3 rounded-full text-white font-semibold shadow-lg"
              style={{ backgroundColor: companyConfig.primaryColor }}
            >
              {companyConfig.name}
            </div>
          </motion.div>

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
                        Your feedback for <span className="font-semibold" style={{ color: companyConfig.primaryColor }}>
                          {companyConfig.name}
                        </span> has been submitted successfully. We appreciate you taking the time to share your thoughts with us.
                      </p>
                      <Button
                        onClick={resetForm}
                        variant="outline"
                        className="w-full"
                        style={{ borderColor: companyConfig.primaryColor, color: companyConfig.primaryColor }}
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
                      <MessageSquare className="h-5 w-5" style={{ color: companyConfig.primaryColor }} />
                      Customer Feedback
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      We value your opinion! Please take a moment to share your experience with us.
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                            className={`focus:ring-2 rounded-xl focus:ring-${companyConfig.primaryColor}`}
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
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                customerEmail: e.target.value,
                              }))
                            }
                            className={`focus:ring-2 rounded-xl focus:ring-${companyConfig.primaryColor}`}
                            required
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
                                  ? "text-white"
                                  : "bg-muted hover:bg-muted/80"
                              }`}
                              style={{
                                backgroundColor: score === formData.npsScore 
                                  ? companyConfig.primaryColor 
                                  : undefined
                              }}
                            >
                              {score}
                            </motion.button>
                          ))}
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Not likely</span>
                          <span>Very likely</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="comments">What&apos;s your overall view of our company? *</Label>
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
                          className={`rounded-xl focus:ring-2 focus:ring-${companyConfig.primaryColor}`}
                          required
                        />
                      </div>

                      {/* Submit Button */}
                      <motion.div
                        className="pt-4"
                        whileTap={{ scale: 0.97 }}
                      >
                        <Button
                          type="submit"
                          className="w-full rounded-xl h-12 text-base text-white"
                          disabled={
                            isSubmitting ||
                            !formData.customerName ||
                            !formData.customerEmail ||
                            !formData.npsScore ||
                            !formData.comments
                          }
                          style={{ 
                            backgroundColor: companyConfig.primaryColor,
                            opacity: (isSubmitting ||
                              !formData.customerName ||
                              !formData.customerEmail ||
                              !formData.npsScore ||
                              !formData.comments) ? 0.5 : 1
                          }}
                        >
                          {isSubmitting ? "Submitting..." : "Submit Feedback"}
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}