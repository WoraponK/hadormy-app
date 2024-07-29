import { z } from 'zod'

const searchSchema = z.object({
  searching: z.string(),
})

export default searchSchema
