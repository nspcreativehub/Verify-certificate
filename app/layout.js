import './globals.css'

export const metadata = {
    title: 'Verify Certificate | Novantix Innovation Technology',
    description: 'Verify certificate authenticity',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
