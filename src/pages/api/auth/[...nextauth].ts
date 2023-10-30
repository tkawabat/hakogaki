import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
import GoogleProvider from 'next-auth/providers/google'

async function refreshAccessToken(token: JWT) {
    try {
        if (!token.refreshToken) {
            console.error('No refresh token found')
            throw Error();
        }
        if (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID === undefined) {
            console.error('No client id found')
            throw Error();
        }
        if (process.env.GOOGLE_CLIENT_SECRET === undefined) {
            console.error('No client secret found')
            throw Error();
        }

        const url =
            'https://oauth2.googleapis.com/token?' +
            new URLSearchParams({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                grant_type: 'refresh_token',
                refresh_token: token.refreshToken,
            })

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
        })

        const refreshedTokens = await response.json()

        if (!response.ok) {
            throw refreshedTokens
        }

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        }
    } catch (error) {
        console.log(error)

        return {
            ...token,
            error: 'RefreshAccessTokenError',
        }
    }
}

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    access_type: "offline",
                    prompt: "force",
                    scope: 'openid email profile https://www.googleapis.com/auth/drive.file',
                },
            },
        }),
    ],
    secret: process.env.GOOGLE_CLIENT_SECRET,
    session: { strategy: 'jwt' },
    callbacks: {
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            // @ts-ignore
            session.user.image = token.user.image
            
            return session
        },
        async jwt({ token, user, account }) {
            // Initial sign in
            if (account && user) {
                return {
                    accessToken: account.access_token,
                    accessTokenExpires: Date.now() + (account.expires_at ?? 0) * 1000,
                    refreshToken: account.refresh_token,
                    user,
                }
            }

            // Return previous token if the access token has not expired yet
            if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
                return token
            }

            // Access token has expired, try to update it
            return refreshAccessToken(token)
        },
    },
})
