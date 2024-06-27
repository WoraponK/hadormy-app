import { z } from 'zod'

const announceSchema = z.object({
  title: z
    .string()
    .min(4, { message: 'กรุณากรอกหัวข้ออย่างน้อย 4 ตัว' })
    .max(25, { message: 'กรุณากรอกหัวข้อไม่เกิน 25 ตัว' }),
  description: z
    .string()
    .min(6, { message: 'กรุณากรอกเนื้อหาอย่างน้อย 6 ตัว' })
    .max(25, { message: 'กรุณากรอกเนื้อหาไม่เกิน 50 ตัว' }),
  image: z.instanceof(FileList).optional(),
})

export default announceSchema
