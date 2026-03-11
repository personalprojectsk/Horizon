import AuthForm from '@/components/AuthForm'
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const SignUp = async () => {

  return (

    <section className="flex-center size-full max-sm:px6">
    <div> 
    <AuthForm type="sign-up" />
    </div>
    </section>
  )
}

export default SignUp
