import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

// Configure this valid certificate structure based on what we saw in the backend
// We need to return: id, certificate_id, student_name, project_title, category, duration, issue_date, technologies, instructor_name, is_valid

export async function GET(request, { params }) {
    const id = params.id

    try {
        const client = await clientPromise
        const db = client.db('certificate_verification') // Make sure this matches your DB name

        // Find certificate
        const certificate = await db.collection('certificates').findOne({
            certificate_id: id
        })

        if (!certificate) {
            return NextResponse.json(
                { error: 'Certificate not found' },
                { status: 404 }
            )
        }

        // Format duration helper
        const formatDate = (d) => {
            if (!d) return ''
            // Handle MongoDB date object or string
            const date = new Date(d)
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        }

        const duration = `${formatDate(certificate.start_date)} to ${formatDate(certificate.end_date)}`

        // Construct response matching the schemas.py structure
        const responseData = {
            id: certificate.certificate_id,
            certificate_id: certificate.certificate_id,
            student_name: certificate.student_name,
            project_title: certificate.project_title,
            category: certificate.category,
            start_date: certificate.start_date,
            end_date: certificate.end_date,
            duration: duration,
            issue_date: certificate.issue_date,
            technologies: certificate.technologies || "",
            instructor_name: certificate.instructor_name || "",
            is_valid: certificate.is_valid || false,
            status: certificate.is_valid ? "VALID" : "REVOKED"
        }

        return NextResponse.json(responseData)

    } catch (e) {
        console.error("Verification Error:", e)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
