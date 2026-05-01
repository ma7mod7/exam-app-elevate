import React from 'react'
import NextAuthProvider from './next-auth.provider'
import ReactQueryProvider from './react-query.provider'

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryProvider>
            <NextAuthProvider>
                {children}
            </NextAuthProvider>
        </ReactQueryProvider>
    )
}