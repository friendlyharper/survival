import Link from 'next/link'
import { emergencyQuickRef } from '@/data/index'
import Navbar from '../components/Navbar'
import { AlertTriangle, Phone } from 'lucide-react'

export const metadata = {
    title: "⚠️ Emergency Reference — Pyro's Survival Guide",
}

export default function EmergencyPage() {
    return (
        <div className="min-h-screen bg-gray-950">
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="flex items-center gap-3 mb-2">
                    <AlertTriangle size={28} className="text-red-400" />
                    <h1 className="text-3xl font-extrabold text-white">Emergency Reference</h1>
                </div>
                <p className="text-gray-400 mb-8">Critical actions for life-threatening situations. Act now — read detail later.</p>

                {/* Call 911 prompt */}
                <div className="bg-red-950 border-2 border-red-600 rounded-xl p-5 mb-8 flex items-center gap-4">
                    <Phone size={32} className="text-red-400 flex-shrink-0" />
                    <div>
                        <p className="font-bold text-red-200 text-lg">Always call 911 first if you have signal</p>
                        <p className="text-red-300/80 text-sm mt-0.5">Colorado Search & Rescue is free. Call early — do not wait until the situation is critical.</p>
                    </div>
                </div>

                {/* Quick reference cards */}
                <div className="space-y-4">
                    {emergencyQuickRef.map((ref) => (
                        <Link
                            key={ref.url}
                            href={ref.url}
                            className="flex items-start gap-4 bg-gray-900 hover:bg-gray-800 border-2 border-red-900 hover:border-red-700 rounded-xl p-5 transition-all"
                        >
                            <span className="text-3xl flex-shrink-0">{ref.icon}</span>
                            <div>
                                <h2 className="font-bold text-white text-lg">{ref.title}</h2>
                                <p className="text-red-300 mt-1 font-semibold">{ref.action}</p>
                                <p className="text-orange-400 text-sm mt-2">Tap for full guide →</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
