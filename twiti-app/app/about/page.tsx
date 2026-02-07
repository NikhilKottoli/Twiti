'use client'

import { motion } from 'framer-motion'

export default function About() {
    return (
        <main className="min-h-screen bg-black text-white flex flex-col items-center justify-start pt-32 relative overflow-hidden selection:bg-purple-500/30">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
            <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] pointer-events-none animate-pulse" />
            <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] pointer-events-none animate-pulse delay-1000" />

            <div className="z-10 w-full max-w-4xl px-6 space-y-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <span className="inline-change px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs tracking-wider uppercase mb-6 font-medium text-purple-300 backdrop-blur-md">
                        Sui Hackathon 2026
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 mt-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                        About SuiENS Pay
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        A bridge between Ethereum identity and Sui performance.
                    </p>
                </motion.div>

                {/* Content Blocks */}
                <div className="grid md:grid-cols-2 gap-8">
                    <MotionCard delay={0.2} title="The Problem">
                        <p className="text-gray-400 leading-relaxed">
                            Cryptocurrency addresses are long, complex, and intimidating strings like <code className="text-xs bg-white/10 px-1 py-0.5 rounded">0x7d...a2</code>. While Ethereum users enjoy human-readable names via ENS (Ethereum Name Service), this utility is often siloed within the EVM ecosystem.
                        </p>
                    </MotionCard>

                    <MotionCard delay={0.4} title="Our Solution">
                        <p className="text-gray-400 leading-relaxed">
                            SuiENS Pay allows users to use their existing ENS names (like <span className="text-white font-medium">vatsak.eth</span>) to receive assets on the Sui network. By reading cross-chain text records, we resolve the associated Sui address instantly.
                        </p>
                    </MotionCard>
                </div>

                {/* Features Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-8 py-10 border-t border-white/10"
                >
                    <h2 className="text-2xl font-bold text-center">How it Works</h2>
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        <FeatureStep number="1" title="Connect" desc="Connect your Sui wallet to send funds." />
                        <FeatureStep number="2" title="Resolve" desc="Type an ENS name. We fetch the 'com.sui.addr' record from Ethereum." />
                        <FeatureStep number="3" title="Send" desc="Execute the transaction at blazing speed on Sui." />
                    </div>
                </motion.div>

                {/* Team Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-8 py-10 border-t border-white/10"
                >
                    <h2 className="text-2xl font-bold text-center">The Team</h2>
                    <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        <TeamMember name="vatsak Kottoli" role="Full Stack Developer" />
                        <TeamMember name="Alex Chen" role="Smart Contract Engineer" />
                        <TeamMember name="Sarah Jones" role="UI/UX Designer" />
                        <TeamMember name="David Kim" role="Product Manager" />
                    </div>
                </motion.div>

                {/* Team / Hackathon Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center backdrop-blur-sm"
                >
                    <h3 className="text-xl font-bold mb-4">Built for the Sui Ecosystem</h3>
                    <p className="text-gray-400">
                        This project showcases the composability of Web3—leveraging Ethereum's established identity layer to enhance the user experience on Sui's high-performance blockchain.
                    </p>
                </motion.div>

            </div>
            {/* Footer */}
            <footer className="mt-20 py-6 text-center text-xs text-gray-600 z-10 w-full mb-10">
                <p>Built for Sui Hackathon • Open Source</p>
            </footer>
        </main>
    )
}

function MotionCard({ delay, title, children }: { delay: number, title: string, children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
        >
            <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
            {children}
        </motion.div>
    )
}

function FeatureStep({ number, title, desc }: { number: string, title: string, desc: string }) {
    return (
        <div className="space-y-3">
            <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white">
                {number}
            </div>
            <h4 className="font-semibold text-lg">{title}</h4>
            <p className="text-sm text-gray-400">{desc}</p>
        </div>
    )
}

function TeamMember({ name, role, nameClass = "", roleClass = "" }: { name: string, role: string, nameClass?: string, roleClass?: string }) {
    return (
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-lg">
                {name.charAt(0)}
            </div>
            <div>
                <h4 className={`font-semibold ${nameClass}`}>{name}</h4>
                <p className={`text-sm text-gray-400 ${roleClass}`}>{role}</p>
            </div>
        </div>
    )
}
