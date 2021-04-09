import format from 'date-fns/format'

const formatTime = (dateTimeText: string): string => (
  format(new Date(dateTimeText), 'kk:mm')
)

export { formatTime }
