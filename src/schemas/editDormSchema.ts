import { z } from 'zod'
import { EDormType } from '@/lib/type'
import { zfd } from 'zod-form-data'


const editDormSchema = zfd
  .formData({
    name: z.string({ message: 'กรุณากรอกชื่อหอพัก' }).min(2, { message: 'ชื่อหอพักอย่างน้อย 2 ตัวอักษร' }),
    priceStart: z.number({ message: 'กรุณากรอกราคาต่ำสุด' }).gte(0, { message: 'ราคาต่ำสุดอย่างน้อย 0 บาท' }),
    priceEnd: z.number({ message: 'กรุณากรอกราคาสูงสุด' }),
    address: z
      .string({ message: 'กรุณากรอกที่อยู่หอพัก' })
      .min(8, { message: 'ที่อยู่อย่างน้อย 8 ตัวอักษร' })
      .max(100, { message: 'ที่อยู่ไม่เกิน 200 ตัวอักษร' }),
    billElectric: z.number().optional(),
    billWater: z.number().optional(),
    billInternet: z.number().optional(),
    billService: z.number().optional(),
    distance: z
      .number({ message: 'กรุณากรอกระยะทางห่างจากหน้ามหาวิทยาลัย' })
      .gte(0, { message: 'ระยะทางอย่างน้อย 0 เมตร' }),
    phoneContact: z
      .string({ message: 'กรุณากรอกเบอร์โทรศัพท์ของคุณ' })
      .startsWith('0', { message: 'เบอร์โทรศัพท์ของคุณไม่ถูกต้อง' })
      .length(10, { message: 'กรุณากรอกเบอร์โทรศัพท์ของคุณให้ครบ 10 หลัก' }),
    description: z
      .string({ message: 'กรุณากรอกรายละเอียดหอพัก' })
      .max(500, { message: 'รายละเอียดหอพักหอพักไม่เกิน 500 ตัวอักษร' }),
  })
  .refine((data) => data.priceEnd > data.priceStart, {
    message: 'ราคาสูงสุดต้องไม่ต่ำกว่าราคาต่ำสุด',
    path: ['priceEnd'],
  })

export default editDormSchema
