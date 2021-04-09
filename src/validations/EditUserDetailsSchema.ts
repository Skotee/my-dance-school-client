import * as yup from 'yup'

const EditUserDetailsSchema = yup.object().shape({
  firstName: yup.string().required('common.errors.firstName.required'),
  lastName: yup.string().required('common.errors.lastName.required'),
  email: yup.string().email('common.errors.email.invalid').required('common.errors.email.required'),
  username: yup.string(),
  phoneNumber: yup.string().required('common.errors.phoneNumber.required'),
})

export { EditUserDetailsSchema }
