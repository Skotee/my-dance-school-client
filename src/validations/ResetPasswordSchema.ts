import * as yup from 'yup'

const ResetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, 'common.errors.password.min')
    .required('common.errors.password.required'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'common.errors.confirmPassword.dontMatch')
    .required('common.errors.confirmPassword.required'),
})

export { ResetPasswordSchema }
