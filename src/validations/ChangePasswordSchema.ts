import * as yup from 'yup'

const ChangePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required('changePassword.errors.oldPassword.required'),
  newPassword: yup
    .string()
    .min(8, 'changePassword.errors.newPassword.min')
    .required('changePassword.errors.newPassword.required'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'common.errors.confirmPassword.dontMatch')
    .required('changePassword.errors.confirmNewPassword.required'),
})

export { ChangePasswordSchema }
