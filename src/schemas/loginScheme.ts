import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email({ message: 'อีเมลของคุณไม่ถูกต้อง' }),
  password: z.string().min(8, { message: 'รหัสผ่านอย่างน้อย 8 ตัว' }),
})

export default loginSchema
