import { NextRequest, NextResponse } from "next/server"

interface FeedbackData {
  customerName: string
  customerEmail: string
  npsScore: number
  comments: string
  company: string
  timestamp: string
}

interface StoredFeedback extends FeedbackData {
  id: string
}

// In-memory storage (replace with database in production)
const feedbackStorage: StoredFeedback[] = []

export async function POST(req: NextRequest) {
  try {
    const feedbackData: FeedbackData = await req.json()

    // Validate required fields
    if (
      !feedbackData.customerName ||
      !feedbackData.customerEmail ||
      !feedbackData.comments ||
      !feedbackData.company
    ) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(feedbackData.customerEmail)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 })
    }

    // Validate NPS score
    if (feedbackData.npsScore < 0 || feedbackData.npsScore > 10) {
      return NextResponse.json({ message: "NPS score must be between 0 and 10" }, { status: 400 })
    }

    // Validate company exists
    const validCompanies = ["best-western", "soho", "white"]
    if (!validCompanies.includes(feedbackData.company)) {
      return NextResponse.json({ message: "Invalid company" }, { status: 400 })
    }

    // Create feedback entry
    const newFeedback: StoredFeedback = {
      ...feedbackData,
      id: `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }

    feedbackStorage.push(newFeedback)

    // Log for debugging
    console.log("New feedback received:", {
      id: newFeedback.id,
      company: newFeedback.company,
      npsScore: newFeedback.npsScore,
      timestamp: newFeedback.timestamp
    })

    return NextResponse.json({
      message: "Feedback submitted successfully",
      id: newFeedback.id,
      company: feedbackData.company
    })
  } catch (error) {
    console.error("Error processing feedback:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}