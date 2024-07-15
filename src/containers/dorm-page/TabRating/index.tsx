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
import { useRouter } from 'next/navigation'

// Images
import { FaStar, FaRegStar } from 'react-icons/fa6'

// Include in project
import ratingSchema from '@/schemas/ratingSchema'

type Props = {
  rating: number
}

const TabRating: React.FC<Props> = ({ rating }) => {
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof ratingSchema>>({
    resolver: zodResolver(ratingSchema),
  })

  const onSubmit = (values: z.infer<typeof ratingSchema>) => {
    console.log('🚀 ~ onSubmit ~ values:', values)
    toast({
      icon: <FaStar className="text-primary" />,
      title: 'ให้คะแนนสำเร็จ',
      description: 'ขอบคุณสำหรับการให้คะแนน',
    })
    router.refresh()
  }

  return (
    <div className="grid grid-cols-3 divide-gray-300 divide-x-2 max-md:grid-cols-1 max-md:divide-x-0 max-md:divide-y-2">
      <div className="flex flex-col items-center gap-4 p-8">
        <h4>คะแนนโดยรวม</h4>
        <div className="flex items-end gap-2">
          <h2>{rating.toFixed(2)}</h2>
          <p className="text-gray-400">/5</p>
        </div>
        <RatingStar rating={rating} />
      </div>
      <div className="p-8 col-span-2 flex justify-center items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <FormField
              control={form.control}
              name="rating"
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
                        <RadioGroupItem value="1" id="rating-1" className="peer sr-only" />
                        <Label htmlFor="rating-1" className="cursor-pointer text-primary peer-checked:text-primary">
                          <h3>
                            {field.value == '1' ? (
                              <FaStar />
                            ) : field.value == '2' ? (
                              <FaStar />
                            ) : field.value == '3' ? (
                              <FaStar />
                            ) : field.value == '4' ? (
                              <FaStar />
                            ) : field.value == '5' ? (
                              <FaStar />
                            ) : (
                              <FaRegStar />
                            )}
                          </h3>
                        </Label>
                        <RadioGroupItem value="2" id="rating-2" className="peer sr-only" />
                        <Label htmlFor="rating-2" className="cursor-pointer text-primary peer-checked:text-primary">
                          <h3>
                            {field.value == '1' ? (
                              <FaRegStar />
                            ) : field.value == '2' ? (
                              <FaStar />
                            ) : field.value == '3' ? (
                              <FaStar />
                            ) : field.value == '4' ? (
                              <FaStar />
                            ) : field.value == '5' ? (
                              <FaStar />
                            ) : (
                              <FaRegStar />
                            )}
                          </h3>
                        </Label>
                        <RadioGroupItem value="3" id="rating-3" className="peer sr-only" />
                        <Label htmlFor="rating-3" className="cursor-pointer text-primary peer-checked:text-primary">
                          <h3>
                            {field.value == '1' ? (
                              <FaRegStar />
                            ) : field.value == '2' ? (
                              <FaRegStar />
                            ) : field.value == '3' ? (
                              <FaStar />
                            ) : field.value == '4' ? (
                              <FaStar />
                            ) : field.value == '5' ? (
                              <FaStar />
                            ) : (
                              <FaRegStar />
                            )}
                          </h3>
                        </Label>
                        <RadioGroupItem value="4" id="rating-4" className="peer sr-only" />
                        <Label htmlFor="rating-4" className="cursor-pointer text-primary peer-checked:text-primary">
                          <h3>
                            {field.value == '1' ? (
                              <FaRegStar />
                            ) : field.value == '2' ? (
                              <FaRegStar />
                            ) : field.value == '3' ? (
                              <FaRegStar />
                            ) : field.value == '4' ? (
                              <FaStar />
                            ) : field.value == '5' ? (
                              <FaStar />
                            ) : (
                              <FaRegStar />
                            )}
                          </h3>
                        </Label>
                        <RadioGroupItem value="5" id="rating-5" className="peer sr-only" />
                        <Label htmlFor="rating-5" className="cursor-pointer text-primary peer-checked:text-primary">
                          <h3>
                            {field.value == '1' ? (
                              <FaRegStar />
                            ) : field.value == '2' ? (
                              <FaRegStar />
                            ) : field.value == '3' ? (
                              <FaRegStar />
                            ) : field.value == '4' ? (
                              <FaRegStar />
                            ) : field.value == '5' ? (
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
      </div>
    </div>
  )
}

export default TabRating
