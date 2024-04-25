import { JoinApi, SignIn, SignUp } from '@/types/loginJoin/types'
import { supabase } from '../supabase/supabase'

export const signUp = async ({ email, password }: JoinApi) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  return { data, error }
}

export const saveSignUpInUserInfo = async ({
  userId,
  email,
  password,
  nickname,
  userType,
}: SignUp) => {
  const { data, error } = await supabase
    .from('userInfo')
    .insert([
      {
        userId,
        email,
        password,
        nickname,
        userType,
        follower: [],
        following: [],
        userChar: {},
      },
    ])
    .select()

  if (error) {
    if (error.code == '23505') {
      alert('이미 존재하는 이메일입니다.')
      throw new Error('이미 존재하는 이메일입니다.')
    }
  }
  return data
}

export const getSignUpUserList = async () => {
  const { data: signUpUserList, error: signUpUserListError } = await supabase
    .from('userInfo')
    .select('*')
  if (signUpUserListError) {
    throw new Error('오류로 인해 정보를 가져오지 못 하고 있습니다')
  }
  return signUpUserList
}

export const saveSignUpInProviderUserInfo = async ({
  userId,
  email,
  password,
  nickname,
  userType,
}: SignIn) => {
  const { data, error } = await supabase
    .from('providerUserInfo')
    .insert([
      {
        userId,
        email,
        password,
        nickname,
        userType,
        follower: [],
        following: [],
        userChar: {},
      },
    ])
    .select()

  if (error) {
    if (
      error.details &&
      (error.details.includes('0 rows') || error.details.includes('already'))
    ) {
      return
    }
    if (error.code === '22P02') {
      alert('정보를 받아오지 못하고 있습니다. 문의해주세요')
      return
    }
    return
  }

  if (data) {
    return data
  }
}

export const updateInProviderUserInfo = async ({
  userId,
  email,
  password,
  nickname,
  userType,
}: SignIn) => {
  const { data, error } = await supabase
    .from('providerUserInfo')
    .upsert({
      userId,
      email,
      password,
      nickname,
      userType,
      follower: [],
      following: [],
      userChar: {},
    })
    .select()

  if (error) {
    if (
      error.details &&
      (error.details.includes('0 rows') || error.details.includes('already'))
    ) {
      throw new Error('정보를 받아오지 못하고 있습니다. 문의해주세요')
    }
    alert('정보를 받아오지 못하고 있습니다. 문의해주세요')
    return
  }

  if (data) {
    return data
  }
}
