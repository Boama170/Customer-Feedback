'use client'
import { useState } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { QRCodeToolDialog } from "@/components/ui/qr-code-tool-dialog"


export default function HomePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="font-sans">
    <div className="container ms-12 my-12 space-y-2 text-center text-[#000000]">
      <Card className="w-72 shadow-md cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setIsDialogOpen(true)}>
        <CardHeader>
          <CardTitle className="flex mx-auto font-bold gap-2">
            Generate QR Code
          </CardTitle>
          <CardDescription className="mt-4 text-sm leading-5">This generates the QR code for all the subsidiaries depending on what they want (example Customer Feedback)</CardDescription>
        </CardHeader>
      </Card>
    </div>

    <QRCodeToolDialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
    />
    </div>
  )
}