// app>api>auth>[...nextauth]>route.ts
import { supabase } from '@/shared/supabase/supabase'
import KakaoProvider from 'next-auth/providers/kakao'
import GoogleProvider from 'next-auth/providers/google'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CILENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: 'email-password-credential',
      name: 'Credentials',
      credentials: {
        email: {
          label: '이메일',
          type: 'email',
        },
        password: {
          label: '비밀번호',
          type: 'password',
        },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error('이메일과 비밀번호를 입력하세요.')
        }

        const { email, password } = credentials
        const { data, error } = await supabase
          .from('userInfo')
          .select('userId, email, nickname, password, userImage')
          .eq('email', email)
          .single()

        if (error) {
          const emptyDBuser = error.code === 'PGRST116'
          if (emptyDBuser) {
            throw new Error('존재하지 않는 유저입니다. 회원가입을 해주세요.')
          }
        }

        if (data && credentials && data?.password !== password) {
          throw new Error('비밀번호가 다릅니다.')
        }

        if (!data) {
          throw new Error('존재하지 않는 이메일입니다.')
        }

        const spendSessionUserInfo = {
          id: data.userId,
          email: data.email,
          name: data.nickname,
        }

        return spendSessionUserInfo
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        uid: token.sub,
      },
    }),
  },
  pages: {
    signIn: '/',
    signOut: '/signout',
  },
})

export { handler as GET, handler as POST }
