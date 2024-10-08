import thumbnailPlaceholderSVG from '@/images/common/thumbnail-placeholder.svg'
import { ESort, EUserRole } from './type'

export const imagePlaceholder = thumbnailPlaceholderSVG

export const convertNumberToString = (inputNumber: number): string | undefined => {
  if (inputNumber) {
    const formatNumber = inputNumber.toLocaleString()
    return formatNumber
  } else {
    return undefined
  }
}

export const convertDateFormat = (inputDate: string): string => {
  const date = new Date(inputDate)
  const day = ('0' + date.getDate()).slice(-2)
  const month = ('0' + date.getMonth()).slice(-2)
  const year = date.getFullYear()

  const hour = ('0' + date.getHours()).slice(-2)
  const minute = ('0' + date.getMinutes()).slice(-2)

  return `${day}/${month}/${year} ${hour}:${minute}น.`
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
    case 'ALLDATA':
      return 'หอพักทั้งหมด'
  }
}

export const convertSortToName = (sort: ESort) => {
  switch (sort) {
    case ESort.Price:
      return 'ราคา'
    case ESort.Distance:
      return 'ระยะทาง'
    case ESort.Time:
      return 'เวลาประกาศ'
  }
}

export const convertRoleToName = (role: EUserRole) => {
  switch (role) {
    case EUserRole.Admin:
      return 'ผู้ดูแลระบบ'
    case EUserRole.Superuser:
      return 'เจ้าของหอพัก'
    case EUserRole.User:
      return 'ผู้ใช้งานทั่วไป'
  }
}

export const formatPhoneNumber = (phoneNumber: string) => {
  if (phoneNumber) {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
  } else {
    return undefined
  }
}

export const copyTextToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}
