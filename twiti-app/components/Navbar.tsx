'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function Navbar() {
    const pathname = usePathname()

    const links = [
        { href: '/', label: 'Home' },
        { href: '/pay', label: 'Send SUI' },
    ]

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 pointer-events-none">
            <div className="flex items-center gap-1 p-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full pointer-events-auto shadow-lg">
                {links.map((link) => {
                    const isActive = pathname === link.href
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "relative px-6 py-2 rounded-full text-sm font-medium transition-colors hover:text-white",
                                isActive ? "text-white" : "text-gray-400"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="navbar-indicator"
                                    className="absolute inset-0 bg-white/10 rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            {link.label}
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
