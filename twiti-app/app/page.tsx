'use client'

import { PaymentForm } from '@/components/PaymentForm'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden selection:bg-purple-500/30">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] pointer-events-none animate-pulse delay-1000" />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center mb-10 px-4"
      >
        <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs tracking-wider uppercase mb-6 font-medium text-purple-300 backdrop-blur-md">
          Sui x ENS
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          Pay with Identity.
        </h1>
        <p className="text-lg text-gray-400 max-w-lg mx-auto">
          Send SUI directly to any ENS name. Bridging the gap between Ethereum identity and Sui performance.
        </p>
      </motion.div>

      {/* App Interface */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="z-10 w-full px-4"
      >
        <PaymentForm />
      </motion.div>

      {/* Footer */}
      <footer className="absolute bottom-6 text-center text-xs text-gray-600 z-10 w-full">
        <p>Built for Sui Hackathon • Open Source</p>
      </footer>
    </main>
  )
}
