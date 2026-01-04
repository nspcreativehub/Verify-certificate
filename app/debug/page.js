'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function DebugPage() {
    const [status, setStatus] = useState('Checking...')
    const [error, setError] = useState(null)
    const [envVars, setEnvVars] = useState({})
    const [data, setData] = useState(null)

    useEffect(() => {
        async function checkConnection() {
            try {
                // Check environment variables
                setEnvVars({
                    url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET',
                    hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                })

                // Try to fetch certificates
                const { data, error } = await supabase
                    .from('certificates')
                    .select('*')
                    .limit(1)

                if (error) {
                    setError(error.message)
                    setStatus('Error')
                } else {
                    setData(data)
                    setStatus('Success!')
                }
            } catch (err) {
                setError(err.message)
                setStatus('Failed')
            }
        }

        checkConnection()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold mb-4">Supabase Connection Debug</h1>

                <div className="space-y-4">
                    <div>
                        <h2 className="font-semibold">Status:</h2>
                        <p className={status === 'Success!' ? 'text-green-600' : 'text-red-600'}>
                            {status}
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold">Environment Variables:</h2>
                        <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
                            {JSON.stringify(envVars, null, 2)}
                        </pre>
                    </div>

                    {error && (
                        <div>
                            <h2 className="font-semibold text-red-600">Error:</h2>
                            <pre className="bg-red-50 p-2 rounded text-sm overflow-auto">
                                {error}
                            </pre>
                        </div>
                    )}

                    {data && (
                        <div>
                            <h2 className="font-semibold text-green-600">Data Retrieved:</h2>
                            <pre className="bg-green-50 p-2 rounded text-sm overflow-auto">
                                {JSON.stringify(data, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
