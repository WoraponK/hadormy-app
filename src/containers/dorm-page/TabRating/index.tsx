'use client'
// Lib
import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RatingStar } from '@/components/shared'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

// Images
import { FaStar, FaRegStar } from 'react-icons/fa6'

// Include in project
import ratingSchema from '@/schemas/ratingSchema'
import { ERating } from '@/lib/type'
import { addRating } from '@/collections/ratingsCollection'

type Props = {
  dormId: string
  rating: number
  userId: string | null
  isCreator: boolean
  isSuperuser: boolean
  isAdmin: boolean | null
  isMember: boolean
  isRated: boolean
}

const TabRating: React.FC<Props> = ({ dormId, userId, rating, isCreator, isSuperuser, isAdmin, isMember, isRated }) => {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof ratingSchema>>({
    resolver: zodResolver(ratingSchema),
  })

  const onSubmit = async (values: z.infer<typeof ratingSchema>) => {
    try {
      if (!userId) return
      await addRating(dormId, userId, values.rate)
      toast({
        icon: <FaStar className="text-primary" />,
        title: 'ให้คะแนนสำเร็จ',
        description: 'ขอบคุณสำหรับการให้คะแนน',
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="grid grid-cols-2 divide-gray-300 divide-x-2 max-sm:grid-cols-1 max-sm:divide-x-0 max-sm:divide-y-2">
      <div className="flex flex-col items-center gap-4 p-8">
        <h4>คะแนนโดยรวม</h4>
        <div className="flex items-end gap-2">
          <h2>{rating && rating.toFixed(2)}</h2>
          <p className="text-gray-400">/5</p>
        </div>
        <RatingStar rating={rating} />
      </div>
      <div className="p-8 flex justify-center items-center">
        {isAdmin ? (
          <p>เนื่องจากคุณเป็นผู้ดูแลระบบ จึงไม่สามารถให้คะแนนได้</p>
        ) : isCreator || isSuperuser ? (
          <p>เนื่องจากคุณมีบทบาทเป็นเจ้าของหอพัก จึงไม่สามารถให้คะแนนได้</p>
        ) : isRated ? (
          <div className="flex flex-col items-center space-y-2">
            <FaStar className="text-primary text-3xl" />
            <h4 className="text-primary">ขอบคุณสำหรับคะแนนของคุณ :)</h4>
          </div>
        ) : isMember ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
              <FormField
                control={form.control}
                name="rate"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel asChild>
                      <div>
                        <h4 className="text-center">ให้คะแนนที่พัก</h4>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <RadioGroup
                          aria-label="Rating"
                          id="rating"
                          className="flex justify-center items-center gap-2"
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <RadioGroupItem value={ERating.One} id="rating-1" className="peer sr-only" />
                          <Label htmlFor="rating-1" className="cursor-pointer text-primary peer-checked:text-primary">
                            <h3 className="transition-transform duration-100 active:scale-90">
                              {field.value == ERating.One ? (
                                <FaStar />
                              ) : field.value == ERating.Two ? (
                                <FaStar />
                              ) : field.value == ERating.Three ? (
                                <FaStar />
                              ) : field.value == ERating.Four ? (
                                <FaStar />
                              ) : field.value == ERating.Five ? (
                                <FaStar />
                              ) : (
                                <FaRegStar />
                              )}
                            </h3>
                          </Label>
                          <RadioGroupItem value={ERating.Two} id="rating-2" className="peer sr-only" />
                          <Label htmlFor="rating-2" className="cursor-pointer text-primary peer-checked:text-primary">
                            <h3 className="transition-transform duration-100 active:scale-90">
                              {field.value == ERating.One ? (
                                <FaRegStar />
                              ) : field.value == ERating.Two ? (
                                <FaStar />
                              ) : field.value == ERating.Three ? (
                                <FaStar />
                              ) : field.value == ERating.Four ? (
                                <FaStar />
                              ) : field.value == ERating.Five ? (
                                <FaStar />
                              ) : (
                                <FaRegStar />
                              )}
                            </h3>
                          </Label>
                          <RadioGroupItem value={ERating.Three} id="rating-3" className="peer sr-only" />
                          <Label htmlFor="rating-3" className="cursor-pointer text-primary peer-checked:text-primary">
                            <h3 className="transition-transform duration-100 active:scale-90">
                              {field.value == ERating.One ? (
                                <FaRegStar />
                              ) : field.value == ERating.Two ? (
                                <FaRegStar />
                              ) : field.value == ERating.Three ? (
                                <FaStar />
                              ) : field.value == ERating.Four ? (
                                <FaStar />
                              ) : field.value == ERating.Five ? (
                                <FaStar />
                              ) : (
                                <FaRegStar />
                              )}
                            </h3>
                          </Label>
                          <RadioGroupItem value={ERating.Four} id="rating-4" className="peer sr-only" />
                          <Label htmlFor="rating-4" className="cursor-pointer text-primary peer-checked:text-primary">
                            <h3 className="transition-transform duration-100 active:scale-90">
                              {field.value == ERating.One ? (
                                <FaRegStar />
                              ) : field.value == ERating.Two ? (
                                <FaRegStar />
                              ) : field.value == ERating.Three ? (
                                <FaRegStar />
                              ) : field.value == ERating.Four ? (
                                <FaStar />
                              ) : field.value == ERating.Five ? (
                                <FaStar />
                              ) : (
                                <FaRegStar />
                              )}
                            </h3>
                          </Label>
                          <RadioGroupItem value={ERating.Five} id="rating-5" className="peer sr-only" />
                          <Label htmlFor="rating-5" className="cursor-pointer text-primary peer-checked:text-primary">
                            <h3 className="transition-transform duration-100 active:scale-90">
                              {field.value == ERating.One ? (
                                <FaRegStar />
                              ) : field.value == ERating.Two ? (
                                <FaRegStar />
                              ) : field.value == ERating.Three ? (
                                <FaRegStar />
                              ) : field.value == ERating.Four ? (
                                <FaRegStar />
                              ) : field.value == ERating.Five ? (
                                <FaStar />
                              ) : (
                                <FaRegStar />
                              )}
                            </h3>
                          </Label>
                        </RadioGroup>
                        <div className="flex justify-center">
                          <Button type="submit" disabled={field.value ? false : true}>
                            ส่ง
                          </Button>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        ) : (
          <p>เนื่องจากคุณไม่ได้เป็นสมาชิกของหอพัก จึงไม่สามารถให้คะแนนได้</p>
        )}
      </div>
    </div>
  )
}

export default TabRating
