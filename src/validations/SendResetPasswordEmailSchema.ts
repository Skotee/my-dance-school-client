import * as yup from 'yup'

const SendResetPasswordEmailSchema = yup.object().shape({
  emailOrUsername: yup.string().required('common.errors.emailOrUsername.required'),
})

export { SendResetPasswordEmailSchema }
