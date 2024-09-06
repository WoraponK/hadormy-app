export type TUserRole = 'USER' | 'SUPERUSER' | 'ADMIN'
export enum EUserRole {
  User = 'USER',
  Superuser = 'SUPERUSER',
  Admin = 'ADMIN',
}

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

export enum ERating {
  One = 'ONE',
  Two = 'TWO',
  Three = 'THREE',
  Four = 'FOUR',
  Five = 'FIVE',
}

export type TUser = {
  id: string | number
  name: string
  email: string
  phone: string
  role: TUserRole
  password?: string
  owner_dorm?: any
  created_at?: string
}

export type TBill = {
  water?: number
  electric?: number
  internet?: number
  service?: number
  deposit?: number
  bail?: number
}

export type TCardAnnounce = {
  id?: string | number
  user_id: string
  author: string
  title: string
  description: string
  role: TUserRole
  timestamp: any
  thumbnail?: any
}

export type TRoom = {
  id: string | number
  name: string
  price: number
  isAvailable: boolean
  userID?: string
  userName?: string
}

export type TDorm = {
  [x: string]: any
  id: string | number
  name: string
  creator_name?: string
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
  updated_at?: string
  type: EDormType
  is_activated?: boolean
}

export type TUserTable = {
  id: string | number
  name: string
  phoneNumber: string
  email: string
  created_at: string
  role: EUserRole
}

export type TRoomApproveTable = {
  id: string | number
  dormId: string | number
  username: string
  userId: string | number
  phoneNumber: string
  room: string
  roomId: string | number
  updateAt: string
}

export type TDormTable = {
  id: string | number
  name: string
  createdBy?: string
  phoneNumber: string
  updateAt?: string
}

export type TNotification = {
  id: string | number
  title: string
  updateAt: string
  image: string
  is_seen: boolean
  role: EUserRole
  description?: string
  link?: string
}
