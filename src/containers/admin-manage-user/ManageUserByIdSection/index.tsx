// Lib
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

// Include in project
import { BackButton } from '@/components/shared'
import manageUserScheme from '@/schemas/manageUserScheme'
import { EUserRole } from '@/lib/type'

const ManageUserByIdSection: React.FC = () => {
  const form = useForm<z.infer<typeof manageUserScheme>>({
    resolver: zodResolver(manageUserScheme),
    defaultValues: {},
  })

  const onSubmit = (values: z.infer<typeof manageUserScheme>) => {
    console.log('🚀 ~ onSubmit ~ values:', values)
  }

  return (
    <div className="space-y-4">
      <h1>จัดการบัญชีผู้ใช้</h1>
      <div className="bg-background p-8 rounded-lg max-lg:p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อผู้ใช้</FormLabel>
                  <FormControl>
                    <Input placeholder="ชื่อผู้ใช้" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>อีเมล</FormLabel>
                  <FormControl>
                    <Input placeholder="อีเมล" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>เบอร์โทร</FormLabel>
                  <FormControl>
                    <Input placeholder="เบอร์โทร" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>รหัสผ่าน</FormLabel>
                  <FormControl>
                    <Input placeholder="รหัสผ่าน" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userRole"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>ตำแหน่ง</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={EUserRole.User} />
                        </FormControl>
                        <FormLabel className="font-normal">ผู้ใช้งานทั่วไป</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={EUserRole.Superuser} />
                        </FormControl>
                        <FormLabel className="font-normal">เจ้าของหอพัก</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={EUserRole.Admin} />
                        </FormControl>
                        <FormLabel className="font-normal">ผู้ดูแลระบบ</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center pt-16">
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

export default ManageUserByIdSection
