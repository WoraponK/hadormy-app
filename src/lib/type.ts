export type TUserRole = 'USER' | 'SUPERUSER' | 'ADMIN'

export type TBill = {
  water?: number
  electic?: number
  internet?: number
  service?: number
  deposit?: number
  bail?: number
}

export type TCardAnnounce = {
  id: string | number
  author: string
  title: string
  description: string
  role: TUserRole
  timestamp: string
  thumbnail?: string
}

export type TCardDorm = {
  id: string | number
  name: string
  thumbnail?: string
  address: string
  priceStart: number
  priceEnd: number
  timestamp: string
  distance: number
}

export type TRoom = {
  id: string | number
  name: string
  price: number
  isAvailable: boolean
}

export type TDorm = {
  id: string | number
  name: string
  address: string
  phoneNumber: string
  priceStart: number
  priceEnd: number
  distance: number
  thumbnail: string[]
  rooms: TRoom[]
  rating: number
  description: string
  bill: TBill
}
