import FeedbackForm from "@/components/feedback-form"

export default function FeedbackPage() {
  return <FeedbackForm />
}

// Pre-generate company pages (like getStaticPaths)
export async function generateStaticParams() {
  const companies = ["best-western", "soho", "white"]

  return companies.map((company) => ({
    company,
  }))
}
