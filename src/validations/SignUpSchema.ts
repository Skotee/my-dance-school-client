import * as yup from 'yup'

const SignUpSchema = yup.object().shape({
  firstName: yup.string().required('common.errors.firstName.required'),
  lastName: yup.string().required('common.errors.lastName.required'),
  email: yup.string().email('common.errors.email.invalid').required('common.errors.email.required'),
  username: yup.string(),
  password: yup
    .string()
    .min(8, 'common.errors.password.min')
    .required('common.errors.password.required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'common.errors.confirmPassword.dontMatch')
    .required('common.errors.confirmPassword.required'),
  phoneNumber: yup.string().required('common.errors.phoneNumber.required'),
  privacyPolicy: yup.boolean().oneOf([true], 'signUp.errors.privacyPolicy.required'),
})

export { SignUpSchema }
