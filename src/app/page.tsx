"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import bg from "@/../public/bg.png"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // router.push('/admin/qr-generator')
  }, [router])

  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section - Full Screen */}
      <section className="min-h-screen flex items-center justify-center bg-cover px-4 relative" style={{ backgroundImage: `url(${bg.src})` }}>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-transparent to-slate-900/10" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white my-6 text-balance leading-tight">
              Customer Feedback System
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto text-pretty leading-relaxed">
              Generate QR codes for multiple companies and collect customer feedback seamlessly
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/admin/qr-generator">
                <button className="group px-10 py-5 bg-white/95 backdrop-blur-sm text-slate-900 rounded-2xl font-semibold text-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl border border-white/20">
                  <span className="flex items-center gap-2">
                    Generate QR Codes
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </Link>
              <Link href="/feedback/best-western">
                <button className="px-10 py-5 border-2 border-white/40 text-white rounded-2xl font-semibold text-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300 backdrop-blur-sm">
                  Preview Feedback Form
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Content Below Hero */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-800 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Companies Section */}
          <section className="my-20">
            <h2 className="text-3xl md:text-3xl font-bold text-white text-center mb-4 text-balance">Our Companies</h2>
            <p className="text-white/80 text-center mb-12 text-lg">Manage feedback across all your business locations</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <Link
                href="/feedback/best-western"
                className="group bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center hover:scale-105 border border-white/20"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-700 to-red-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <span className="text-white font-bold text-xl">BW</span>
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-2">Best Western</h3>
                <p className="text-sm text-slate-600">View feedback form</p>
              </Link>

              <Link
                href="/feedback/soho"
                className="group bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center hover:scale-105 border border-white/20"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <span className="text-white font-bold text-lg">SH</span>
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-2">SOHO</h3>
                <p className="text-sm text-slate-600">View feedback form</p>
              </Link>

              <Link
                href="/feedback/white"
                className="group bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center hover:scale-105 border border-white/20"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <span className="text-white font-bold text-xl">W</span>
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-2">White Restaurant</h3>
                <p className="text-sm text-slate-600">View feedback form</p>
              </Link>

            </div>
          </section>

          {/* Features Grid */}
          <section className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Multiple Companies</h3>
              <p className="text-slate-600 leading-relaxed">
                Support multiple companies within your organization with custom branding and tailored experiences
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">QR Code Generation</h3>
              <p className="text-slate-600 leading-relaxed">
                Generate unique QR codes for each company&apos;s feedback form with instant deployment
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Feedback Analytics</h3>
              <p className="text-slate-600 leading-relaxed">
                Collect and analyze customer feedback with advanced NPS scoring and insights
              </p>
            </div>
          </section>
        </div>
      </div>
       {/* Footer */}
    <footer
      className="w-full py-6 text-center text-white font-medium relative"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <span className="relative font-light tracking-wide z-10">Copyright &copy; 2025. All rights reserved</span>
    </footer>
    </div>
  )
}