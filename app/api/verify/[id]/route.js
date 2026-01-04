import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET(request, { params }) {
    try {
        const { id } = await params

        const client = await clientPromise
        const db = client.db('certificate_verification')
        const collection = db.collection('certificates')

        const certificate = await collection.findOne({ id: id })

        if (!certificate) {
            return NextResponse.json(
                { error: 'Certificate not found' },
                { status: 404 }
            )
        }

        // Remove MongoDB _id field for cleaner response
        const { _id, ...certificateData } = certificate

        return NextResponse.json(certificateData)
    } catch (error) {
        console.error('Database error:', error)
        return NextResponse.json(
            { error: 'Failed to verify certificate' },
            { status: 500 }
        )
    }
}
