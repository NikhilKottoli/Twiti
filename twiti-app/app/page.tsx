'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Zap, Globe, FileCode, CheckCircle2 } from 'lucide-react'

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } }
const stagger = { staggerChildren: 0.08, delayChildren: 0.12 }

export default function Landing() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden selection:bg-indigo-500/20">
      {/* Background — soft orbs, no harsh gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-500/[0.07] blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] rounded-full bg-violet-500/[0.06] blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-indigo-500/[0.04] to-transparent" />
      </div>

      {/* Hero */}
      <section className="relative z-10 px-4 pt-28 pb-20 md:pt-36 md:pb-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] font-medium tracking-widest uppercase text-gray-400 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          HackMoney 2026 · ENS × Sui
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-[1.1]"
        >
          Send SUI to{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-violet-300">
            any ENS name
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          One identity across chains. Type an ENS name, we resolve the Sui address and send—no copy-paste, no mistakes.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
        >
          <Link
            href="/pay"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/30"
          >
            Send SUI now <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-4 py-20 md:py-28 border-t border-white/5">
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-5xl mx-auto"
        >
          <motion.p variants={fadeUp} className="text-center text-xs font-medium tracking-widest uppercase text-gray-500 mb-3">
            Why SuiENS Pay
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
            Built for the ENS pool and Sui track
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 text-center max-w-lg mx-auto mb-14 text-sm md:text-base">
            Features that actually ship—with on-chain proof and a clean flow.
          </motion.p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[
              { icon: ShieldCheck, title: 'On-chain payment proof', desc: 'Every payment goes through a Sui Move contract and emits a verifiable Payment event for indexing and audits.' },
              { icon: Globe, title: 'One name, any chain', desc: 'Your ENS name holds a Sui address in text records. One human-readable identity for Ethereum and Sui.' },
              { icon: Zap, title: 'Instant resolution', desc: 'We read com.sui.addr or sui from ENS on Ethereum mainnet and show the resolved Sui address before you send.' },
              { icon: FileCode, title: 'No address copying', desc: 'Type alice.eth instead of pasting long 0x strings. We resolve and send—you stay in flow.' },
              { icon: CheckCircle2, title: 'Open & verifiable', desc: 'Open-source frontend and Move contract. Anyone can verify resolution logic and on-chain behavior.' },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.article
                key={title}
                variants={fadeUp}
                className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-colors">
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 transition-colors" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="relative z-10 px-4 py-20 md:py-28 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-xs font-medium tracking-widest uppercase text-gray-500 mb-3">How it works</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-12">Three steps</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { step: '1', title: 'Connect', body: 'Connect your Sui wallet (and optionally Ethereum) on the Send SUI page.' },
              { step: '2', title: 'Resolve', body: 'Enter an ENS name. We fetch its com.sui.addr or sui record and show the Sui address.' },
              { step: '3', title: 'Send', body: 'Enter amount and send. Transaction runs on Sui and our Move contract if deployed.' },
            ].map(({ step, title, body }) => (
              <div key={step} className="relative">
                <div className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-sm font-semibold text-white mb-4">
                  {step}
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <Link
            href="/pay"
            className="inline-flex items-center gap-2 mt-12 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Go to Send SUI <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-4 py-20 md:py-28 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center p-10 md:p-12 rounded-3xl border border-white/10 bg-white/[0.02]"
        >
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">Ready to pay with identity?</h2>
          <p className="text-gray-400 text-sm md:text-base mb-8 max-w-md mx-auto">
            Use an ENS name that has a Sui address in its text records. Add one at app.ens.domains if you own the name.
          </p>
          <Link
            href="/pay"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/20"
          >
            Open Send SUI <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      <footer className="relative z-10 py-8 text-center text-xs text-gray-500 border-t border-white/5">
        Built for HackMoney 2026 (ENS × Sui) · Open source
      </footer>
    </main>
  )
}
