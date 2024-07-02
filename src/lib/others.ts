import thumbnailPlaceholderSVG from '@/images/common/thumbnail-placeholder.svg'

export const imagePlaceholder = thumbnailPlaceholderSVG

export const convertNumberToString = (inputNumber: number): string => {
  const formatNumber = inputNumber.toLocaleString()
  return formatNumber
}

export const convertDateFormat = (inputDate: string): string => {
  const date = new Date(inputDate)
  const day = ('0' + date.getDate()).slice(-2)
  const month = ('0' + date.getMonth()).slice(-2)
  const year = date.getFullYear()

  const hour = ('0' + date.getHours()).slice(-2)
  const minute = ('0' + date.getMinutes()).slice(-2)

  return `${day}/${month}/${year} ${hour}:${minute}`
}

export const calDistance = (distance: number): string => {
  if (distance >= 1000) {
    const kilometers = (distance / 1000).toFixed(1)
    return `${kilometers} กิโลเมตร`
  } else {
    return `${distance} เมตร`
  }
}

export const convertDormTypeToName = (dormType: string) => {
  switch (dormType) {
    case 'MALE':
      return 'หอพักชายล้วน'
    case 'FEMALE':
      return 'หอพักหญิงล้วน'
    case 'ALL':
      return 'หอพักรวม'
  }
}

export const convertSortToName = (sort: string) => {
  switch (sort) {
    case 'PRICE':
      return 'ราคา'
    case 'DISTANCE':
      return 'ระยะทาง'
    case 'ANTIME':
      return 'เวลาประกาศ'
  }
}
