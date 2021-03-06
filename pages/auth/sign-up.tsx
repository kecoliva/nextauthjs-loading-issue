import { ErrorMessage, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import PasswordStrengthMeter from '../../components/Auth/PasswordStrengthMeter.component'
import Button from '../../components/Common/Button.component'
import Checkbox from '../../components/Common/Checkbox.component'
import BriefcaseIcon from '../../components/Common/Icons/Briefcase.icon'
import CaretRightIcon from '../../components/Common/Icons/CaretRight.icon'
import EmailIcon from '../../components/Common/Icons/Email.icon'
import LockIcon from '../../components/Common/Icons/Lock.icon'
import UserIcon from '../../components/Common/Icons/User.icon'
import Link from '../../components/Common/Link.component'
import TextInput from '../../components/Common/TextInput.component'
import AuthLayout from '../../layouts/Auth.layout'
import useStore from '../../store/store'
import { API_BASE_URL } from '../../utils/constants'
import { NextPageWithLayout } from '../_app'

interface SignUpFormValues {
  fullName: string
  companyName: string
  email: string
  password: string
  passwordConfirmation: string
  rememberMe: boolean
}

const SignUp: NextPageWithLayout = () => {
  const passwordStrength = useStore(({ strength }) => strength)
  const computePasswordStrength = useStore(({ computePasswordStrength }) => computePasswordStrength)

  useEffect(() => {
    computePasswordStrength('')
  }, [])

  const formInitialValues: SignUpFormValues = {
    fullName: '',
    companyName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    rememberMe: false,
  }

  return (
    <>
      <Head>
        <title>Daily Press - Sign Up</title>
      </Head>
      <Formik
        initialValues={formInitialValues}
        onSubmit={signUp}
        validate={({ password }) => {
          computePasswordStrength(password)
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="flex w-full flex-col items-center">
              <div className="mb-[18px] flex w-full space-x-[12px]">
                <TextInput
                  type="text"
                  name="fullName"
                  Icon={UserIcon}
                  label="Full Name"
                  placeholder="Enter Full Name"
                />
                <ErrorMessage name="fullName" />
                <TextInput
                  type="text"
                  name="companyName"
                  Icon={BriefcaseIcon}
                  label="Company Name"
                  placeholder="Enter Company Name"
                />
              </div>
              <div className="mb-[18px] w-full">
                <TextInput
                  type="email"
                  name="email"
                  Icon={EmailIcon}
                  label="Email"
                  placeholder="Enter Email"
                />
              </div>
              <div className="mb-[8px] flex w-full space-x-[12px]">
                <TextInput
                  type="password"
                  name="password"
                  Icon={LockIcon}
                  label="Password"
                  placeholder="Enter Password"
                  disableAutoComplete
                />
                <TextInput
                  type="password"
                  name="passwordConfirmation"
                  Icon={LockIcon}
                  label="Password"
                  placeholder="Enter Password"
                  disableAutoComplete
                />
              </div>
              <div className="mr-auto mb-[8px] w-[50%]">
                <PasswordStrengthMeter strength={passwordStrength} />
              </div>
              <div className="mr-auto mb-[24px]">
                <div className="word select-none font-inter text-[10px] font-normal text-darksilver">
                  Should be at least 8 symbols and contain
                  <br />
                  one small and one big character, special
                  <br />
                  character and number
                </div>
              </div>
              <div className="mr-auto mb-[32px]">
                <Checkbox name="rememberMe" label="Remember me" />
              </div>
              <div className="mb-[24px] flex w-[312px]">
                <Button type="submit" ariaLabel="Sign Up" disabled={isSubmitting}>
                  <span>Sign Up</span>
                  <CaretRightIcon />
                </Button>
              </div>
              <div className="flex select-none items-center space-x-[6px]">
                <div className="font-inter text-[14px] font-normal text-davysgrey">
                  Already have an account?
                </div>
                <Link href="/auth/login">Login</Link>
              </div>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

SignUp.getLayout = (page: ReactElement) => {
  return (
    <AuthLayout
      title="Welcome to Daily Press"
      subtitle="Please sign up and start the adventure"
      className="w-[652px]"
    >
      {page}
    </AuthLayout>
  )
}

const signUp = async (signUpFormValues: SignUpFormValues) => {
  // Temp Start
  // Just here to make sign up work because it needs access token
  const authRes = await fetch(`${API_BASE_URL}/authenticate`, {
    method: 'POST',
    body: JSON.stringify({
      email: 'superadmin@dailypress.com',
      password: 'letmein',
    }),
  })
  const {
    data: { access_token: accessToken },
  } = await authRes.json()
  // Temp End

  const res = await fetch(`${API_BASE_URL}/v1/users/client`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      email: signUpFormValues.email,
      password: signUpFormValues.password,
      birth_date: '1993/02/02',
      password_confirmation: signUpFormValues.passwordConfirmation,
      contact_number: '123',
      first_name: '123',
      last_name: '123',
      middle_name: '123',
      gender: 'Male',
      role: 'marketing',
      client_id: 1,
    }),
  })

  const { data } = await res.json()

  if (data) {
    alert('noice')
  } else {
    alert('not noice')
  }
}

SignUp.auth = false

export default SignUp
