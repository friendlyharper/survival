import Link from 'next/link'
import { WifiOff } from 'lucide-react'

export default function OfflinePage() {
    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <WifiOff size={64} className="mx-auto text-amber-400 mb-6" />
                <h1 className="text-3xl font-extrabold text-white mb-4">You are offline</h1>
                <p className="text-gray-400 mb-6 leading-relaxed">
                    No internet connection detected. All previously visited pages are available from your cache.
                    Navigate to any content you have already opened.
                </p>
                <Link href="/" className="btn-primary inline-flex">
                    Go to Home
                </Link>
            </div>
        </div>
    )
}
