import { z } from 'zod'
import { EDormType } from '@/lib/type'
import { zfd } from 'zod-form-data'

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

const dormTypeOptions = z.enum([EDormType.All, EDormType.Male, EDormType.Female], {
  message: 'กรุณากรอกประเภทของหอพัก',
})

const manageDormSchema = zfd
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
    roomAmount: z.number({ message: 'กรุณากรอกจำนวนห้องพัก' }).gte(1, { message: 'จำนวนห้องพักอย่างน้อย 1 ห้อง' }),
    phoneContact: z
      .string({ message: 'กรุณากรอกเบอร์โทรศัพท์ของคุณ' })
      .startsWith('0', { message: 'เบอร์โทรศัพท์ของคุณไม่ถูกต้อง' })
      .length(10, { message: 'กรุณากรอกเบอร์โทรศัพท์ของคุณให้ครบ 10 หลัก' }),
    dormType: dormTypeOptions,
    images: zfd
      .file(z.instanceof(File)) // Validate individual file
      .array() // Expect an array of files
      .refine((files) => files.length > 0, {
        message: 'ไฟล์รูปภาพอย่างน้อย 1 รูป',
      })
      .refine((files) => files.length <= 5, {
        message: 'ไฟล์รูปภาพไม่เกิน 5 รูป',
      })
      .refine((files) => files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)), {
        message: 'ไฟล์นามสกุล .jpg, .jpeg, .png เท่านั้น',
      })
      .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE), {
        message: `ไฟล์รูปภาพไม่เกิน 5MB`,
      }),
    description: z
      .string({ message: 'กรุณากรอกรายละเอียดหอพัก' })
      .max(500, { message: 'รายละเอียดหอพักหอพักไม่เกิน 500 ตัวอักษร' }),
  })
  .refine((data) => data.priceEnd > data.priceStart, {
    message: 'ราคาสูงสุดต้องไม่ต่ำกว่าราคาต่ำสุด',
    path: ['priceEnd'],
  })

export default manageDormSchema
