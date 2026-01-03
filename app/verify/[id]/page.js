'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function VerifyCertificate() {
    const params = useParams()
    const [certificate, setCertificate] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchCertificate() {
            try {
                const { data, error } = await supabase
                    .from('certificates')
                    .select('*')
                    .eq('id', params.id)
                    .single()

                if (error) throw error

                if (data) {
                    setCertificate(data)
                } else {
                    setError('Certificate not found')
                }
            } catch (err) {
                setError(err.message || 'Failed to verify certificate')
            } finally {
                setLoading(false)
            }
        }

        if (params.id) {
            fetchCertificate()
        }
    }, [params.id])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Verifying certificate...</p>
                </div>
            </div>
        )
    }

    if (error || !certificate) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Invalid Certificate</h1>
                    <p className="text-gray-600 mb-4">{error || 'Certificate not found'}</p>
                    <p className="text-sm text-gray-500">ID: {params.id}</p>
                </div>
            </div>
        )
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-block bg-green-100 rounded-full p-3 mb-4">
                        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">✓ Certificate Verified</h1>
                    <p className="text-gray-600">This certificate is authentic and valid</p>
                </div>

                {/* Certificate Details Card */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 text-center">
                        <h2 className="text-3xl font-bold mb-2">NOVANTIX INNOVATION TECHNOLOGY</h2>
                        <p className="text-blue-100">Training & Development Center</p>
                        <div className="mt-6 inline-block bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                            <p className="text-sm text-blue-100 mb-1">Certificate ID</p>
                            <p className="text-xl font-mono font-bold">{certificate.id}</p>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="p-8 space-y-6">
                        <div className="border-b pb-4">
                            <h3 className="text-sm  font-semibold text-gray-500 uppercase tracking-wide mb-2">RECIPIENT</h3>
                            <p className="text-3xl font-bold text-gray-800">{certificate.student_name}</p>
                        </div>

                        <div className="border-b pb-4">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">PROJECT</h3>
                            <p className="text-2xl font-semibold text-gray-800 mb-2">{certificate.project_title}</p>
                            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                {certificate.category}
                            </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">DURATION</h3>
                                <p className="text-gray-800">
                                    {formatDate(certificate.start_date)} - {formatDate(certificate.end_date)}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">ISSUED ON</h3>
                                <p className="text-gray-800">{formatDate(certificate.issue_date)}</p>
                            </div>
                        </div>

                        {certificate.technologies && (
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">TECHNOLOGIES</h3>
                                <p className="text-gray-800">{certificate.technologies}</p>
                            </div>
                        )}

                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">INSTRUCTOR</h3>
                            <p className="text-gray-800">{certificate.instructor_name}</p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 px-8 py-4 text-center border-t">
                        <p className="text-sm text-gray-600">
                            This certificate has been verified as authentic and issued by Novantix Innovation Technology
                        </p>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>For any queries, please contact Novantix Innovation Technology</p>
                </div>
            </div>
        </div>
    )
}
