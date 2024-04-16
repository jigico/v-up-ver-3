'use client'

import { FormEvent, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { findUserPassword } from '@/shared/login/loginApi'
import Link from 'next/link'
import Image from 'next/image'
import Modal from '@/util/Modal'
import useInput from '@/hooks/useInput'
import findPwImg from '@/../public/images/findPassword.svg'
import SocialLogin from '@/components/socialLogin/page'
import {
  DROP_SHADOW,
  SHADOW,
  INPUT_SHADOW,
  INPUT_FOCUS,
  DOWN_ACTIVE_BUTTON,
  OPEN_ANOTHER_SHADOW,
} from './loginCss'
import { ACTIVE_BUTTON_SHADOW } from './buttonCss'
import close from '@/../public/images/close-button.svg'

const Login = () => {
  const router = useRouter()
  const { status } = useSession()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [spendEmail, setSpendEmail] = useState<string>('')
  const [submitEmail, setSubmitEmail] = useState<boolean>(false)
  const needLoginInfo = { email: '', password: '' }

  const { form: userlogin, onChange: onChangeHandler } = useInput(needLoginInfo)
  const { email, password } = userlogin

  const openModal = (e: FormEvent) => {
    e.preventDefault()
    setIsModalOpen(true)
    setSubmitEmail(submitEmail)
  }
  const closeModal = () => setIsModalOpen(false)

  const onLoginHandler = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const signResult = await signIn('email-password-credential', {
        email: email,
        password: password,
        redirect: false,
      })

      if (signResult && signResult.ok === true) {
        alert(`V-UP에 오신 걸 환영합니다!`)
        router.push('/')
      }

      if (signResult && signResult.error) {
        alert(signResult.error)
      }
    } catch (error) {
      throw new Error('회원정보를 불러오지 못하고 있습니다.')
    }
  }

  const findPassword = async (e: FormEvent) => {
    e.preventDefault()
    if (!spendEmail) {
      alert('이메일을 입력해주세요!')
      return
    }

    if (spendEmail) {
      const data = await findUserPassword(spendEmail)
      setSpendEmail('')

      if (!data) {
        alert('이미 이메일을 보냈습니다!')
      } else {
        alert('비밀번호를 복구하는 이메일을 보냈습니다!')
        setSubmitEmail(true)
      }
      setSubmitEmail(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className='h-[full]  w-[full] bg-black text-white '>
        로딩주우우웅
      </div>
    )
  }

  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      {isModalOpen && (
        <div className='z-1000 absolute inset-0 bg-black opacity-50'></div>
      )}
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <button onClick={closeModal} className='absolute right-0 top-0 m-3'>
            <Image src={close} width={24} height={24} alt='닫기' />
          </button>
          <div
            className={`flex h-[680px] w-[516px] flex-col items-center justify-center gap-[94px] rounded-[32px] border-[4px] border-solid border-[#474747] bg-[#3D3D3D] pb-[300px] ${OPEN_ANOTHER_SHADOW} `}
          >
            <h3 className='pt-[106px] text-[20px] font-bold'>
              <p>비밀번호 찾기</p>
            </h3>
            <div className=' flex flex-col gap-[32px]'>
              <article className='gap-[4px]'>
                <label className='text-[rgba(255,255,255,0.3)]'>
                  <p>이메일</p>
                </label>
                <input
                  type='email'
                  value={spendEmail}
                  placeholder='가입 시 사용한 이메일을 입력하세요.'
                  onChange={(e) => setSpendEmail(e.target.value)}
                  className={`flex w-full items-center gap-4 rounded-[12px] border-2 border-white border-opacity-10 bg-white bg-opacity-10 px-[12px] py-[13px] font-bold caret-primary  ${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS} placeholder:text-[rgba(255,255,255,0.3)]`}
                />
              </article>
              <div>
                <button
                  onClick={findPassword}
                  className={`flex h-[48px] w-[320px] items-center justify-center  rounded-[12px] bg-primary text-[16px] font-bold active:bg-[rgba(104,91,255,0.20)] ${DOWN_ACTIVE_BUTTON} ${ACTIVE_BUTTON_SHADOW} `}
                >
                  {submitEmail ? '전송완료!' : '전송'}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <div
        className={`border-gray-300 absolute  left-1/2 top-1/2  flex w-[516px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center overflow-hidden rounded-2xl border-none border-opacity-10 bg-white bg-opacity-10 pb-[16px] pt-[106px] ${SHADOW}`}
      >
        {/* <section className='translate-y-auto  absolute left-1/2 mt-0 -translate-x-1/2 transform rounded-2xl  tracking-[-0.03em] '> */}
        <section className='tracking-[-0.03em] '>
          <div className='text-center text-[24px] font-bold'>
            <p>V-UP에 오신 걸 환영합니다</p>
          </div>
          <div className='pt-[88px] '>
            <form
              onSubmit={onLoginHandler}
              className='flex w-[320px] flex-col gap-[32px]'
            >
              <div className='flex flex-col gap-[16px] text-[rgba(255,255,255,0.3)] [&_label]:gap-[4px]'>
                <div>
                  <label htmlFor='email' className='flex flex-col '>
                    <p>이메일</p>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={email}
                      onChange={onChangeHandler}
                      placeholder='이메일을 입력하세요'
                      className={`flex items-center gap-4 rounded-[12px] border-2 border-white border-opacity-10 bg-white bg-opacity-10 px-[12px] py-[13px] font-bold caret-primary shadow-md ${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS} placeholder:text-[rgba(255,255,255,0.3)] focus:placeholder:text-white`}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor='password' className='flex flex-col '>
                    <p>비밀번호</p>
                    <input
                      type='password'
                      id='password'
                      name='password'
                      value={password}
                      onChange={onChangeHandler}
                      placeholder='비밀번호를 입력하세요'
                      className={`flex items-center gap-4 rounded-[12px] border-2 border-white border-opacity-10 bg-white bg-opacity-10 px-[12px] py-[13px] font-bold caret-primary shadow-md  ${INPUT_SHADOW} ${DROP_SHADOW} ${INPUT_FOCUS} placeholder:text-[rgba(255,255,255,0.3)] focus:placeholder:text-white`}
                    />
                  </label>
                </div>
              </div>
              <div className='tracking-[-0.03em]'>
                <button
                  type='submit'
                  className={`flex h-[48px] w-[320px] items-center justify-center  rounded-[12px] bg-primary text-[16px] font-bold active:bg-[rgba(104,91,255,0.20)] ${DOWN_ACTIVE_BUTTON} ${ACTIVE_BUTTON_SHADOW} `}
                >
                  로그인
                </button>
              </div>
            </form>
          </div>

          <article className='flex flex-col gap-[60px] tracking-[-0.03em] text-[rgba(255,255,255,0.3)]'>
            <div className='flex justify-end pt-[16px]'>
              <button
                onClick={openModal}
                className='w-101 flex items-center justify-center gap-[2px] text-[14px] text-[rgba(255,255,255,0.5)]'
              >
                비밀번호 찾기
              </button>
              <Image
                src={findPwImg}
                width={20}
                height={20}
                alt='오른쪽방향화살표'
              ></Image>
            </div>
            <section className='flex flex-col items-center gap-[68px] text-[14px]'>
              <div className='flex flex-col gap-[16px] font-bold tracking-[-0.03em] text-[rgba(255,255,255,0.5)]'>
                <p>SNS로&nbsp;간편하게&nbsp;시작하기</p>
                <div>
                  <SocialLogin />
                </div>
              </div>
              <div className='flex gap-[8px]'>
                <p>아직&nbsp;회원이&nbsp;아니신가요?</p>
                <Link
                  href={'/join'}
                  className='leading-[1.4rem] text-primary underline '
                >
                  <p>회원가입&nbsp;하기</p>
                </Link>
              </div>
            </section>
          </article>
        </section>
      </div>
    </div>
  )
}

export default Login
