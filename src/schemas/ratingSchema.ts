import { z } from 'zod'
import { ERating } from '@/lib/type'

const ratingSchema = z.object({
  rate: z.enum([ERating.One, ERating.Two, ERating.Three, ERating.Four, ERating.Five], {
    required_error: 'เลือกคะแนนที่พักก่อนยืนยัน',
  }),
})

export default ratingSchema
