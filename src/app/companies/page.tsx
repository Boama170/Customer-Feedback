
"use client"

import { CompanyService } from "@/services/companyService";
import { CompaniesTable } from "@/components/ui/companies-table"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Company } from "@/types/company";
import { Undo } from "lucide-react"
import Link from "next/link";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCompanies = async () => {
      const companyService = CompanyService.getInstance();
      const fetchedCompanies = await companyService.getCompanies();
      setCompanies(fetchedCompanies);
    };
    fetchCompanies();
  }, []);

  const handleViewFeedback = (company: Company) => {
    router.push(`/companies/${company.slug}/form`);
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex gap-2 text-sm">
          <Undo className="w-4 h-4" />
          Back
        </Link>
        <h1 className="text-2xl font-bold">Companies</h1>
        
      </div>


      <CompaniesTable companies={companies} onViewFeedback={handleViewFeedback} />

    </div>
  );
}