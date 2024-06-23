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
