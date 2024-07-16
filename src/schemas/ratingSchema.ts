import { z } from 'zod'

const ratingSchema = z.object({
  rating: z.enum(['1', '2', '3', '4', '5'], {
    required_error: 'เลือกคะแนนที่พักก่อนยืนยัน',
  }),
})

export default ratingSchema
