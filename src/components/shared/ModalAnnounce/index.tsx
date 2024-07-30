'use client'

// Lib
import React from 'react'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

// Images
import IconMegaphoneWhiteSVG from '@/images/common/icon-megaphone-white.svg'
import IconMegaphonePrimarySVG from '@/images/common/icon-megaphone-primary.svg'
import announceSchema from '@/schemas/announceSchema'

const ModalAnnounce: React.FC = () => {
  const form = useForm<z.infer<typeof announceSchema>>({
    resolver: zodResolver(announceSchema),
    defaultValues: {
      title: '',
      description: '',
      image: undefined,
    },
  })

  const imageRef = form.register('image')

  const onSubmit = (values: z.infer<typeof announceSchema>) => {
    console.log('🚀 ~ onSubmit ~ values:', values)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button size="lg" className="space-x-2">
            <h5>ประกาศ</h5>
            <Image src={IconMegaphoneWhiteSVG} alt="IconMegaphoneWhiteSVG" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle asChild>
            <div className="flex gap-2">
              <h2 className="text-primary">ประกาศ</h2>
              <Image src={IconMegaphonePrimarySVG} alt="IconMegaphoneBlackSVG" />
            </div>
          </DialogTitle>
          <DialogDescription asChild>
            <div>
              <h5 className="text-gray-500 font-normal">ประกาศให้ผู้คนได้ทราบข่าวสาร!</h5>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="max-md:max-h-[250px] overflow-auto px-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      หัวข้อ <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      เนื้อหา <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} rows={3} className="resize-none" maxLength={50} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>เพิ่มรูปภาพ (เพิ่มหรือไม่เพิ่มก็ได้)</FormLabel>
                    <FormControl>
                      <Input type="file" accept="image/png, image/jpeg, image/jpg" {...imageRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                ประกาศ
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ModalAnnounce
