import { z } from 'zod'
import { zfd } from 'zod-form-data'

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

const announceSchema = zfd.formData({
  title: z
    .string()
    .min(4, { message: 'กรุณากรอกหัวข้ออย่างน้อย 4 ตัว' })
    .max(25, { message: 'กรุณากรอกหัวข้อไม่เกิน 25 ตัว' }),
  description: z
    .string()
    .min(6, { message: 'กรุณากรอกเนื้อหาอย่างน้อย 6 ตัว' })
    .max(100, { message: 'กรุณากรอกเนื้อหาไม่เกิน 100 ตัว' }),
  image: zfd
    .file(
      z
        .custom<FileList | File[]>((value) => value instanceof FileList || Array.isArray(value), {
          message: 'Input is not a valid file or file list.',
        })
        .refine(
          (files) => {
            const file = files instanceof FileList ? files[0] : files[0]
            return ACCEPTED_IMAGE_TYPES.includes(file?.type)
          },
          {
            message: 'ไฟล์นามสกุล .jpg, .jpeg, .png เท่านั้น',
          },
        )
        .refine(
          (files) => {
            const file = files instanceof FileList ? files[0] : files[0]
            return file?.size <= MAX_FILE_SIZE
          },
          {
            message: `ไฟล์รูปภาพไม่เกิน 5MB`,
          },
        ),
    )
    .optional(),
})

export default announceSchema
