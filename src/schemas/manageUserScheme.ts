import { z } from 'zod'
import { EUserRole } from '@/lib/type'

const userRoleOptions = z.enum([EUserRole.User, EUserRole.Superuser, EUserRole.Admin], {
  message: 'กรุณากรอกประเภทของตำแหน่ง',
})

const manageUserScheme = z.object({
  name: z
    .string({ required_error: 'กรุณากรอกชื่อของคุณ', invalid_type_error: 'ชื่อต้องเป็นตัวอักษรเท่านั้น' })
    .min(4, { message: 'กรุณากรอกชื่ออย่างน้อย 4 ตัว' }),
  email: z.string().email({ message: 'อีเมลของคุณไม่ถูกต้อง' }),
  password: z.string().min(8, { message: 'กรุณากรอกรหัสผ่านอย่างน้อย 8 ตัว' }),
  userRole: userRoleOptions,
})

export default manageUserScheme
