import { z } from 'zod'

const manageRoomSchema = z.object({
  name: z.string({ message: 'กรุณากรอกชื่อหอพัก' }).min(1, { message: 'ชื่อหอพักอย่างน้อย 2 ตัวอักษร' }),
  price: z.number({ message: 'กรุณากรอกราคาต่ำสุด' }).gte(0, { message: 'ราคาต่ำสุดอย่างน้อย 0 บาท' }),
})

export default manageRoomSchema
