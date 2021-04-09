import format from 'date-fns/format'

const formatDate = (dateTimeText: string): string => (
  format(new Date(dateTimeText), 'dd/MM/yyyy')
)

export { formatDate }
