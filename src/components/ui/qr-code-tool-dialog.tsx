'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog';
import { Button } from './button';
import { Input } from './input';
import { QrCode, Download, Printer, MessageSquare } from 'lucide-react';
import QRCode from 'qrcode';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

interface QRCodeToolDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QRCodeToolDialog({ open, onOpenChange }: QRCodeToolDialogProps) {
  const [mode, setMode] = useState<'initial' | 'custom' | 'feedback'>('initial');
  const [customLink, setCustomLink] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCustomQR = () => {
    setMode('custom');
  };

  const handleFeedback = () => {
    setMode('feedback');
    // Navigation will be handled by Link
  };

  const generateCustomQR = async () => {
    if (!customLink.trim()) return;

    setIsGenerating(true);
    try {
      const qrDataUrl = await QRCode.toDataURL(customLink, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
      setQrCodeUrl(qrDataUrl);
      toast.success("QR code generated successfully!");
    } catch (error) {
      console.error("Error generating QR code:", error);
      toast.error("Failed to generate QR code");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement("a");
      link.download = `custom-qr-code.png`;
      link.href = qrCodeUrl;
      link.click();
      toast.success("QR code downloaded!");
    }
  };

  const printQRCode = () => {
    if (qrCodeUrl) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Custom QR Code</title>
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
              </style>
            </head>
            <body>
              <div class="qr-container">
                <h2>Custom QR Code</h2>
                <img src="${qrCodeUrl}" alt="QR Code" />
                <p>Link: ${customLink}</p>
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const resetDialog = () => {
    setMode('initial');
    setCustomLink('');
    setQrCodeUrl('');
    setIsGenerating(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
    if (!newOpen) {
      resetDialog();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code Generator Tool</DialogTitle>
          <DialogDescription>
            What do you want to use this tool for?
          </DialogDescription>
        </DialogHeader>

        {mode === 'initial' && (
          <div className="space-y-4">
            <Button onClick={handleCustomQR} className="w-full">
              <QrCode className="mr-2 h-4 w-4" />
              Generate ANY QR Code
            </Button>
            <Link href="/companies" onClick={() => onOpenChange(false)}>
              <Button variant="secondary" className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Customer Feedback
              </Button>
            </Link>
          </div>
        )}

        {mode === 'custom' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="custom-link" className="block text-sm font-medium mb-2">
                Enter the link for your QR code:
              </label>
              <Input
                id="custom-link"
                type="url"
                placeholder="https://example.com"
                value={customLink}
                onChange={(e) => setCustomLink(e.target.value)}
              />
            </div>
            <Button
              onClick={generateCustomQR}
              disabled={isGenerating || !customLink.trim()}
              className="w-full"
            >
              <QrCode className="mr-2 h-4 w-4" />
              {isGenerating ? 'Generating...' : 'Generate QR Code'}
            </Button>
            {qrCodeUrl && (
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <Image
                    src={qrCodeUrl}
                    alt="Custom QR Code"
                    width={256}
                    height={256}
                    className="w-64 h-64"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {mode === 'feedback' && (
          <div className="text-center">
            <p>Redirecting to customer feedback...</p>
          </div>
        )}

        {qrCodeUrl && mode === 'custom' && (
          <DialogFooter className="flex gap-2">
            <Button onClick={downloadQRCode} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button onClick={printQRCode} variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}