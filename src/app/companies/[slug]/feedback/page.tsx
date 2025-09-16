"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { CompanyService } from "@/services/companyService";
import { FeedbackTable } from "@/components/feedback-table";
import Link from "next/link";
import { Undo } from "lucide-react";

export default function FeedbackPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCompany() {
      setLoading(true);
      const companyService = CompanyService.getInstance();
      let data = await companyService.getCompanyBySlug(slug);

      // If not found in service, check localStorage
      if (!data) {
        const stored = localStorage.getItem('companies');
        if (stored) {
          const storedCompanies = JSON.parse(stored);
          data = storedCompanies.find((company: any) => company.slug === slug);
        }
      }

      if (data) {
        setCompany(data);
      }
      setLoading(false);
    }
    if (slug) fetchCompany();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold text-gray-900">Loading...</h1>
        </div>
      </main>
    );
  }

  if (!company) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900">Company not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <Link href="/companies" className="flex gap-2 text-sm">
          <Undo className="w-4 h-4" />
          Back
        </Link>
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">{company.name} Feedback</h1>
        </div>
        <FeedbackTable companyName={company.name} />
      </div>
    </main>
  );
}