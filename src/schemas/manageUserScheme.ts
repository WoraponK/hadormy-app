import { z } from 'zod'
import { EUserRole } from '@/lib/type'

const userRoleOptions = z.enum([EUserRole.User, EUserRole.Superuser, EUserRole.Admin], {
  message: 'กรุณากรอกตำแหน่ง',
})

const manageUserScheme = z.object({
  name: z
    .string({ required_error: 'กรุณากรอกชื่อของคุณ', invalid_type_error: 'ชื่อต้องเป็นตัวอักษรเท่านั้น' })
    .min(4, { message: 'กรุณากรอกชื่ออย่างน้อย 4 ตัว' }),
  email: z.string({ message: 'กรุณากรอกอีเมล' }).email({ message: 'อีเมลของไม่ถูกต้อง' }),
  phoneNumber: z
    .string({ message: 'กรุณากรอกเบอร์โทรศัพท์' })
    .startsWith('0', { message: 'เบอร์โทรศัพท์ไม่ถูกต้อง' })
    .length(10, { message: 'กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก' }),
  password: z.string({ message: 'กรุณากรอกรหัสผ่าน' }).min(8, { message: 'กรุณากรอกรหัสผ่านอย่างน้อย 8 ตัว' }),
  userRole: userRoleOptions,
})

export default manageUserScheme
