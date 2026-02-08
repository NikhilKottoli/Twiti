'use client'

import { PaymentForm } from '@/components/PaymentForm'
import { motion } from 'framer-motion'

export default function PayPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center relative overflow-hidden selection:bg-indigo-500/20 pt-20 pb-24">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full bg-indigo-500/[0.06] blur-[100px]" />
        <div className="absolute bottom-0 -right-40 w-[400px] h-[400px] rounded-full bg-violet-500/[0.06] blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 text-center mb-8 px-4"
      >
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Send SUI via ENS</h1>
        <p className="text-gray-400 text-sm">Enter an ENS name and amount. We resolve the Sui address and send.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="z-10 w-full px-4 max-w-md mx-auto"
      >
        <PaymentForm />
      </motion.div>
    </main>
  )
}
