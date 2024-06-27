import { z } from 'zod'

const registerSchema = z
  .object({
    name: z
      .string({ required_error: 'กรุณากรอกชื่อของคุณ', invalid_type_error: 'ชื่อต้องเป็นตัวอักษรเท่านั้น' })
      .min(4, { message: 'กรุณากรอกชื่ออย่างน้อย 4 ตัว' }),
    email: z.string().email({ message: 'อีเมลของคุณไม่ถูกต้อง' }),
    password: z.string().min(8, { message: 'กรุณากรอกรหัสผ่านอย่างน้อย 8 ตัว' }),
    confirmPassword: z.string(),
    phone: z
      .string()
      .startsWith('0', { message: 'เบอร์โทรศัพท์ของคุณไม่ถูกต้อง' })
      .length(10, { message: 'กรุณากรอกเบอร์โทรศัพท์ของคุณให้ครบ 10 หลัก' }),
    privacy: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'รหัสผ่านของคุณไม่ตรงกัน',
    path: ['confirmPassword'],
  })

export default registerSchema
