'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
    const [certificateId, setCertificateId] = useState('')
    const router = useRouter()

    const handleVerify = (e) => {
        e.preventDefault()
        if (certificateId.trim()) {
            router.push(`/verify/${certificateId.trim()}`)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Verify Certificate</h1>
                    <p className="text-gray-600 mt-2">Enter the certificate ID below to verify its authenticity.</p>
                </div>

                <form onSubmit={handleVerify} className="space-y-4">
                    <div>
                        <label htmlFor="certificateId" className="block text-sm font-medium text-gray-700 mb-1">
                            Certificate ID
                        </label>
                        <input
                            type="text"
                            id="certificateId"
                            value={certificateId}
                            onChange={(e) => setCertificateId(e.target.value)}
                            placeholder="e.g. NIT-FA5PNY0W"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                    >
                        Verify Certificate
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Novantix Innovation Technology</p>
                </div>
            </div>
        </div>
    )
}
