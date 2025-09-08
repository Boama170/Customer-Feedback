import QRCodeDisplay from "@/components/qr-code-display"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="container mx-auto">
        <QRCodeDisplay />
      </div>
    </main>
  )
}
