'use client'

// Lib
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { isEqual } from 'lodash'

// Images
import { CgWebsite } from 'react-icons/cg'
import { FiGrid } from 'react-icons/fi'
import { IoCheckmarkCircle } from 'react-icons/io5'

// Include in project
import editDormSchema from '@/schemas/editDormSchema'
import { TDorm } from '@/lib/type'
import { BackButton } from '@/components/shared'
import FirebaseImage from '@/components/common/FirebaseImage'
import { updateDorm } from '@/collections/dormsCollection'

type Props = {
  dormId: string
  dormData: TDorm | null
}

const ManageDormSection: React.FC<Props> = ({ dormId, dormData }) => {
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof editDormSchema>>({
    resolver: zodResolver(editDormSchema),
    defaultValues: {
      name: '',
      address: '',
      priceStart: 0,
      priceEnd: 0,
      billElectric: 0,
      billWater: 0,
      billInternet: 0,
      billService: 0,
      distance: 0,
      phoneContact: '',
      description: '',
    },
  })

  // State to track if the form is dirty
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    if (dormData) {
      form.reset({
        name: dormData.name || '',
        priceStart: dormData.priceStart,
        priceEnd: dormData.priceEnd,
        address: dormData.address || '',
        billElectric: dormData.bill.electric,
        billWater: dormData.bill.water,
        billInternet: dormData.bill.internet,
        billService: dormData.bill.service,
        distance: dormData.distance,
        phoneContact: dormData.phoneNumber || '',
        description: dormData.description || '',
      })
      setIsDirty(false)
    }
  }, [dormData, form])

  const currentValues = form.watch()

  useEffect(() => {
    if (dormData) {
      const isSame = isEqual(currentValues, {
        name: dormData.name,
        priceStart: dormData.priceStart,
        priceEnd: dormData.priceEnd,
        address: dormData.address,
        billElectric: dormData.bill.electric,
        billWater: dormData.bill.water,
        billInternet: dormData.bill.internet,
        billService: dormData.bill.service,
        distance: dormData.distance,
        phoneContact: dormData.phoneNumber,
        description: dormData.description,
      })

      setIsDirty(!isSame)
    }
  }, [currentValues, dormData])

  const onSubmit = async (values: z.infer<typeof editDormSchema>) => {
    try {
      await updateDorm(dormId, {
        name: values.name,
        address: values.address,
        priceStart: values.priceStart,
        priceEnd: values.priceEnd,
        bill: {
          electric: values.billElectric,
          water: values.billWater,
          internet: values.billInternet,
          service: values.billService,
        },
        distance: values.distance,
        phoneNumber: values.phoneContact,
        description: values.description,
      })

      toast({
        variant: 'success',
        icon: <IoCheckmarkCircle className="text-forground" />,
        title: 'แก้ไขข้อมูลหอพักสำเร็จ',
      })

      router.refresh()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="space-y-4">
      <h1>แก้ไขหอพัก</h1>
      <div className="flex justify-end space-x-2">
        <Link href={`/dorm/${dormId}`}>
          <Button variant="secondary" className="space-x-2">
            <CgWebsite />
            <span>ไปหน้าหอพัก</span>
          </Button>
        </Link>
        <Link href={`${usePathname()}/room`}>
          <Button className="space-x-2">
            <FiGrid />
            <span>จัดการห้องพัก</span>
          </Button>
        </Link>
      </div>
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
                          <Input
                            placeholder="ราคาต่ำสุด"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
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
                          <Input
                            placeholder="ราคาสูงสุด"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
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
                      <Input placeholder="ค่าไฟ" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
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
                      <Input placeholder="ค่าน้ำ" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="billInternet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ค่าอินเทอร์เน็ต</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ค่าอินเทอร์เน็ต"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
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
                      <Input
                        placeholder="ค่าบริการอื่น ๆ"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
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
                      <Input
                        placeholder="ระยะทาง"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
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
            <div className="py-2 space-y-2 w-full">
              <h4>รายการรูปภาพของคุณ</h4>
              <div className="overflow-auto ">
                <div className="flex w-fit space-x-2 pb-2">
                  {dormData?.thumbnail.map((image, index) => (
                    <div key={index} className="h-[100px] aspect-video rounded-lg overflow-hidden">
                      <FirebaseImage imagePath={image} className="w-full h-full object-cover object-center" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
              <Button variant="success" type="submit" disabled={!isDirty}>
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

export default ManageDormSection
