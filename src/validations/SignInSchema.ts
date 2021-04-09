import * as yup from 'yup'

const SignInSchema = yup.object().shape({
  emailOrUsername: yup.string().required('common.errors.emailOrUsername.required'),
  password: yup.string().required('common.errors.password.required'),
})

export { SignInSchema }
