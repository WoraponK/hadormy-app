export type TUserRole = 'USER' | 'SUPERUSER' | 'ADMIN'

export enum EDormType {
  All = 'ALL',
  Male = 'MALE',
  Female = 'FEMALE',
}

export enum ESort {
  Price = 'PRICE',
  Distance = 'DISTANCE',
  Time = 'TIME',
}

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
  timestamp: string
  type: EDormType
}

export type TUserTable = {
  id: string | number
  name: string
  phoneNumber: string
  email: string
  updateAt: string
}

export type TRoomApproveTable = {
  id: string | number
  name: string
  phoneNumber: string
  room: string
  updateAt: string
}

export type TDormTable = {
  id: string | number
  name: string
  createdBy: string
  phoneNumber: string
  updateAt: string
}
