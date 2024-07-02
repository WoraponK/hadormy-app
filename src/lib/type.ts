export type TUserRole = 'USER' | 'SUPERUSER' | 'ADMIN'

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
