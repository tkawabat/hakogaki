import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import GoogleDriveApiDao from 'src/dao/GoogleDriveApiDao'

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_API_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: 'openid email profile https://www.googleapis.com/auth/drive.file'
                }
            }
        }),
    ],
    secret: process.env.NEXT_PUBLIC_SECRET,
    session: { strategy: 'jwt' },
    callbacks: {
        async session({ session, token }) {
            session.user.accessToken = token.accessToken
            if (token.accessToken) {
                GoogleDriveApiDao.setToken(token.accessToken)
            }
            return session
        },
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
    },
})
