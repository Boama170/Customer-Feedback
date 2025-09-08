"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, QrCode } from "lucide-react"

export default function QRCodeDisplay() {
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [customUrl, setCustomUrl] = useState("")
  const [currentUrl, setCurrentUrl] = useState("")

  useEffect(() => {
    const feedbackUrl = `${window.location.origin}/feedback`
    setCurrentUrl(feedbackUrl)
    setCustomUrl(feedbackUrl)
    // Auto-generate QR code for feedback form on load
    generateQRCode(feedbackUrl)
  }, [])

  const generateQRCode = async (url: string) => {
    try {
      const QRCode = (await import('qrcode')).default
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      })
      setQrCodeUrl(qrDataUrl)
    } catch (error) {
      console.error("Error generating QR code:", error)
    }
  }

  const handleGenerateQR = () => {
    if (customUrl) {
      generateQRCode(customUrl)
    }
  }

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement("a")
      link.download = "qr-code.png"
      link.href = qrCodeUrl
      link.click()
    }
  }

  const printQRCode = () => {
    if (qrCodeUrl) {
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>QR Code</title>
              <style>
                body { 
                  display: flex; 
                  justify-content: center; 
                  align-items: center; 
                  min-height: 100vh; 
                  margin: 0; 
                  font-family: Arial, sans-serif;
                }
                .qr-container {
                  text-align: center;
                  padding: 20px;
                }
                img { 
                  max-width: 100%; 
                  height: auto; 
                }
                h2 { 
                  margin-bottom: 20px; 
                  color: #333;
                }
                p {
                  margin-top: 15px;
                  color: #666;
                  font-size: 14px;
                }
              </style>
            </head>
            <body>
              <div class="qr-container">
                <h2>Scan to Access</h2>
                <img src="${qrCodeUrl}" alt="QR Code" />
                <p>Point your camera at this QR code</p>
              </div>
            </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.print()
      }
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <QrCode className="h-6 w-6" />
            Customer Feedback QR Code
          </CardTitle>
          <CardDescription>Generate QR codes for customers to easily access your feedback form</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="url">Feedback Form URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com/feedback"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
            />
          </div>

          <Button onClick={handleGenerateQR} className="w-full" disabled={!customUrl}>
            Generate QR Code
          </Button>

          {qrCodeUrl && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <img src={qrCodeUrl || "/placeholder.svg"} alt="Generated QR Code" className="w-64 h-64" />
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  QR Code for: <span className="font-mono text-xs">{customUrl}</span>
                </p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={downloadQRCode} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download PNG
                  </Button>
                  <Button onClick={printQRCode} variant="outline" size="sm">
                    Print QR Code
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
              1
            </div>
            <p className="text-sm">The QR code automatically points to your feedback form</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
              2
            </div>
            <p className="text-sm">Download or print the QR code to display at your location</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
              3
            </div>
            <p className="text-sm">Customers scan with their phone camera to access the feedback form</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
              4
            </div>
            <p className="text-sm">Feedback is collected and stored locally for your review</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
