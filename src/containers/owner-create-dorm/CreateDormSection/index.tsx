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
import manageDormSchema from '@/schemas/manageDormSchema'
import { EDormType } from '@/lib/type'
import { BackButton } from '@/components/shared'

const CreateDormSection: React.FC = () => {
  const form = useForm<z.infer<typeof manageDormSchema>>({
    resolver: zodResolver(manageDormSchema),
    defaultValues: {},
  })

  const imageRef = form.register('images')

  const onSubmit = (values: z.infer<typeof manageDormSchema>) => {
    console.log('🚀 ~ onSubmit ~ values:', values)
  }

  return (
    <div className="space-y-4">
      <h1>เพิ่มหอพัก</h1>
      <div className="bg-background p-8 rounded-lg max-lg:p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 grid grid-cols-1">
            {/* Inside Form --- Start */}

            <div className="grid grid-cols-2 gap-4 items-center max-md:grid-cols-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      ชื่อหอพัก <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="ชื่อหอพัก" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <h6>ราคา/เดือน</h6>
                <div className="grid grid-cols-2 gap-4 max-lg:gap-2">
                  <FormField
                    control={form.control}
                    name="priceStart"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          ราคาต่ำสุด <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="ราคาต่ำสุด" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priceEnd"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          ราคาสูงสุด <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="ราคาสูงสุด" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ที่อยู่ <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="ที่อยู่" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              <FormField
                control={form.control}
                name="billElectric"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ค่าไฟ</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="ค่าไฟ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="billWater"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ค่าน้ำ</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="ค่าน้ำ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="billWater"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ค่าอินเทอร์เน็ต</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="ค่าอินเทอร์เน็ต" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="billService"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ค่าบริการอื่น ๆ</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="ค่าบริการอื่น ๆ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="distance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      ระยะทางถึงหน้ามหาวิทยาลัย <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="ระยะทาง" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dormType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      ประเภทหอพัก <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="ประเภทหอพัก" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={EDormType.All}>หอพักรวม</SelectItem>
                        <SelectItem value={EDormType.Male}>หอพักชายล้วน</SelectItem>
                        <SelectItem value={EDormType.Female}>หอพักหญิงล้วน</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roomAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      จำนวนห้อง <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="จำนวนห้อง" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      เบอร์โทรติดต่อ <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="เบอร์โทรติดต่อ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem>
                  <FormLabel>
                    เพิ่มรูปหอพัก <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/png, image/jpeg, image/jpg" {...imageRef} multiple />
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
                    รายละเอียดหอพัก <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="รายละเอียดหอพัก" {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <BackButton />
              <Button variant="success" type="submit">
                บันทึก
              </Button>
            </div>
            
            {/* Inside Form --- End */}
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CreateDormSection
