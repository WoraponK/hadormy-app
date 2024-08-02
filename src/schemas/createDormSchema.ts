import { z } from 'zod'
import { EDormType } from '@/lib/type'

const dormTypeOptions = z.enum([EDormType.All, EDormType.Male, EDormType.Female], {
  message: 'กรุณากรอกประเภทของหอพัก',
})

const createDormSchema = z
  .object({
    name: z.string({ message: 'กรุณากรอกชื่อหอพัก' }).min(2, { message: 'อีเมลของคุณไม่ถูกต้อง' }),
    priceStart: z.number({ message: 'กรุณากรอกราคาต่ำสุด' }).gte(0, { message: 'ราคาต่ำสุดอย่างน้อย 0 บาท' }),
    priceEnd: z.number({ message: 'กรุณากรอกราคาสูงสุด' }),
    address: z.string({ message: 'กรุณากรอกที่อยู่หอพัก' }).max(100, { message: 'ที่อยู่ไม่เกิน 500 ตัวอักษร' }),
    billElectic: z.number().optional(),
    billWater: z.number().optional(),
    billInternet: z.number().optional(),
    billService: z.number().optional(),
    distance: z.number({ message: 'กรุณากรอกระยะทางห่างจากหน้ามหาวิทยาลัย' }),
    roomAmount: z.number().gte(1, { message: 'ห้องพักอย่างน้อย 1 ห้อง' }),
    phoneContact: z
      .string()
      .startsWith('0', { message: 'เบอร์โทรศัพท์ของคุณไม่ถูกต้อง' })
      .length(10, { message: 'กรุณากรอกเบอร์โทรศัพท์ของคุณให้ครบ 10 หลัก' }),
    dormType: dormTypeOptions,
    images: z.any(),
    description: z.string().max(500, { message: 'คำอธิบายไม่เกิน 500 ตัวอักษร' }),
  })
  .refine((data) => data.priceEnd > data.priceStart, {
    message: 'ราคาสูงสุดต้องไม่ต่ำกว่าราคาต่ำสุด',
    path: ['priceEnd'],
  })

export default createDormSchema
