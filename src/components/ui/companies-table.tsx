"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Download, Eye, Printer, QrCode, Copy, Plus, ExternalLink } from "lucide-react"
import Link from "next/link"
import QRCode from 'qrcode'
import Image from "next/image"
import { Company } from "@/types/company"
import { companies as defaultCompanies } from "@/data/companies"
import { toast } from "sonner"

interface CompaniesTableProps {
  companies?: Company[]
  onViewFeedback: (company: Company) => void
}

export function CompaniesTable({ companies: propCompanies }: CompaniesTableProps) {
  const [companies, setCompanies] = useState<Company[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('companies')
    if (stored) {
      setCompanies(JSON.parse(stored))
    } else {
      const initial = propCompanies || defaultCompanies
      setCompanies(initial)
      localStorage.setItem('companies', JSON.stringify(initial))
    }
  }, [propCompanies])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCompany, setNewCompany] = useState({
    name: "",
    subsidiaries: "",
    domain: "",
  })
    const [isQrDialogOpen, setIsQrDialogOpen] = useState(false)
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
    const [qrCodeUrl, setQrCodeUrl] = useState("")


  const handleAddCompany = () => {
    if (newCompany.name && newCompany.domain) {
      const company: Company = {
        id: Date.now().toString(),
        name: newCompany.name,
        subsidiaries: newCompany.subsidiaries
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
        domain: newCompany.domain,
        slug: newCompany.name.toLowerCase().replace(/\s+/g, "-"),
        feedbackUrl: `${newCompany.domain}/feedback`,
      }
      const updated = [...companies, company]
      setCompanies(updated)
      localStorage.setItem('companies', JSON.stringify(updated))
      setNewCompany({ name: "", subsidiaries: "", domain: "" })
      setIsAddDialogOpen(false)
    }
  }



    useEffect(() => {
        if (selectedCompany) {
            const generate = async () => {
                try {
                    const feedbackUrl = `${window.location.origin}/companies/${selectedCompany.slug}/form`
                    const url = await QRCode.toDataURL(feedbackUrl, {
                        width: 300,
                        margin: 2,
                        color: {
                            dark: "#000000",
                            light: "#FFFFFF",
                        },
                    })
                    setQrCodeUrl(url)
                } catch (error) {
                    console.error("Error generating QR code:", error)
                }
            }
            generate()
        }
    }, [selectedCompany])

    const handleQrCodeClick = (company: Company) => {
        setSelectedCompany(company)
        setIsQrDialogOpen(true)
    }

    const downloadQRCode = () => {
        if (qrCodeUrl && selectedCompany) {
            const link = document.createElement("a")
            link.download = `${selectedCompany.slug}-qr-code.png`
            link.href = qrCodeUrl
            link.click()
        }
    }

    const printQRCode = () => {
        if (qrCodeUrl && selectedCompany) {
            const printWindow = window.open("", "_blank")
            if (printWindow) {
                printWindow.document.write(`
            <html>
              <head>
                <title>${selectedCompany.name} QR Code</title>
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
                  <h2>${selectedCompany.name} Feedback</h2>
                  <img src="${qrCodeUrl}" alt="QR Code" />
                  <p>Scan to provide feedback</p>
                </div>
              </body>
            </html>
          `)
                printWindow.document.close()
                printWindow.print()
            }
        }
    }

    const copyFeedbackLink = async (company: Company) => {
        const feedbackUrl = `${window.location.origin}/companies/${company.slug}/form`
        try {
            await navigator.clipboard.writeText(feedbackUrl)
            toast.success("Feedback link copied to clipboard!")
        } catch (error) {
            console.error("Failed to copy link:", error)
            toast.error("Failed to copy link")
        }
    }
  
  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Companies</CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Company
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Company</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input
                      id="company-name"
                      value={newCompany.name}
                      onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subsidiaries">Subsidiaries (comma-separated)</Label>
                    <Input
                      id="subsidiaries"
                      value={newCompany.subsidiaries}
                      onChange={(e) => setNewCompany({ ...newCompany, subsidiaries: e.target.value })}
                      placeholder="Subsidiary 1, Subsidiary 2, ..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="domain">Company Domain</Label>
                    <Input
                      id="domain"
                      value={newCompany.domain}
                      onChange={(e) => setNewCompany({ ...newCompany, domain: e.target.value })}
                      placeholder="https://company.com"
                    />
                  </div>
                  <Button onClick={handleAddCompany} className="w-full">
                    Add Company
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Subsidiaries</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {(company.subsidiaries || []).map((subsidiary, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground"
                        >
                          {subsidiary}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {company.domain ? (
                      <a
                        href={company.domain}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {company.domain}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                        <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => copyFeedbackLink(company)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy Feedback Link</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => handleQrCodeClick(company)}>
                            <QrCode className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Generate QR Code</p>
                        </TooltipContent>
                      </Tooltip>

                      <Link href={`/companies/${company.slug}/feedback`} className="flex-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View Feedback</p>
                        </TooltipContent>
                      </Tooltip>
                          </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
        <Dialog open={isQrDialogOpen} onOpenChange={setIsQrDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>QR Code for {selectedCompany?.name}</DialogTitle>
                </DialogHeader>
                {qrCodeUrl ? (
                    <div className="flex flex-col items-center gap-4">
                        <Image src={qrCodeUrl} alt={`QR Code for ${selectedCompany?.name}`} width={300} height={300} />
                        <div className="flex gap-2">
                            <Button onClick={downloadQRCode}><Download className="mr-2 h-4 w-4" /> Download</Button>
                            <Button onClick={printQRCode}><Printer className="mr-2 h-4 w-4" /> Print</Button>
                        </div>
                    </div>
                ) : (
                    <p>Generating QR code...</p>
                )}
            </DialogContent>
        </Dialog>
    </TooltipProvider>
  )
}