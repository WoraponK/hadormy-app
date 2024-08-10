// Lib
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

// Include in project
import manageRoomSchema from '@/schemas/manageRoomSchema'
import { EDormType } from '@/lib/type'
import { BackButton } from '@/components/shared'

const ManageRoomCreateSection: React.FC = () => {
  const form = useForm<z.infer<typeof manageRoomSchema>>({
    resolver: zodResolver(manageRoomSchema),
    defaultValues: {},
  })

  const onSubmit = (values: z.infer<typeof manageRoomSchema>) => {
    console.log('🚀 ~ onSubmit ~ values:', values)
  }

  return (
    <div className="space-y-4">
      <h1>เพิ่มห้องพัก</h1>
      <div className="bg-background p-8 rounded-lg max-lg:p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 grid grid-cols-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อห้องพัก/หมายเลขห้องพัก</FormLabel>
                  <FormControl>
                    <Input placeholder="ชื่อห้องพัก / หมายเลขห้องพัก" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ราคา</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="ราคา" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center pt-8">
              <BackButton />
              <Button variant="success" type="submit">
                บันทึก
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ManageRoomCreateSection
