'use client';

import { Company } from "@/types/company";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { QrCode, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { QRCodeDialog } from './qr-code-dialog';

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const copyFeedbackLink = async () => {
    const feedbackUrl = `${window.location.origin}/companies/${company.slug}/form`;
    try {
      await navigator.clipboard.writeText(feedbackUrl);
      toast.success("Feedback link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy link:", error);
      toast.error("Failed to copy link");
    }
  };

  return (
    <Card className="w-full backdrop-blur-3xl bg-white/80 hover:bg-white/90 transition-all duration-300">
      <CardHeader>
        <CardTitle>{company.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* QR code display removed - now in dialog */}
      </CardContent>
      <CardFooter className="flex gap-2 flex-wrap">
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="flex-1"
        >
          <QrCode className="mr-2 h-4 w-4" />
          QR Code Tool
        </Button>

        <Button
          onClick={copyFeedbackLink}
          className="flex-1"
          variant="secondary"
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy Feedback Link
        </Button>
      </CardFooter>

      <QRCodeDialog
        company={company}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </Card>
  );
}