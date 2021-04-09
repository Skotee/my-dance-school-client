import * as yup from 'yup'

const NotificationsSchema = yup.object().shape({
  aboutNewContentOnEmail: yup.boolean().when('agreeToReceiveOnEmail', {
    is: false,
    then: yup.boolean().oneOf([false], 'notifications.errors.aboutNewContentOnEmail'),
    otherwise: yup.boolean()
  }),
  aboutNewContentOnMobile: yup.boolean().when('agreeToReceiveOnMobile', {
    is: false,
    then: yup.boolean().oneOf([false], 'notifications.errors.aboutNewContentOnMobile'),
    otherwise: yup.boolean()
  }),
  agreeToReceiveOnEmail: yup.boolean().when('aboutNewContentOnEmail', {
    is: true,
    then: yup.boolean().oneOf([true], ''),
    otherwise: yup.boolean()
  }),
  agreeToReceiveOnMobile: yup.boolean().when('aboutNewContentOnMobile', {
    is: true,
    then: yup.boolean().oneOf([true], ''),
    otherwise: yup.boolean()
  }),
  aboutNewCommentsOnForumOnBoard: yup.boolean(),
  aboutChangesOfAppointmentOnBoard: yup.boolean(),
  aboutContentToDownloadOnBoard: yup.boolean(),
}, [
  ['aboutNewContentOnEmail', 'agreeToReceiveOnEmail'],
  ['aboutNewContentOnMobile', 'agreeToReceiveOnMobile']
])

export { NotificationsSchema }
