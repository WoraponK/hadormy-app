'use client'

// Lib
import React, { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

// Include in project
import { convertNumberToString } from '@/lib/others'
import { addRoom } from '@/collections/roomsCollection'
import { IoCheckmarkCircle } from 'react-icons/io5'

type Props = {
  dormId: string
  priceStart: number
  priceEnd: number
}

const ModalCreateRoom: React.FC<Props> = ({ dormId, priceStart, priceEnd }) => {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)

  const manageRoomSchema = z.object({
    name: z.string().min(2, { message: 'ชื่อหอพักต้องมีอย่างน้อย 2 ตัวอักษร' }),
    price: z
      .number({ invalid_type_error: 'กรุณากรอกราคาต่ำสุด' })
      .min(priceStart, {
        message: `ราคาต่ำสุด ${convertNumberToString(priceStart)} บาท (ตามที่ตั้งค่าไว้ในรายละเอียดหอพัก)`,
      })
      .max(priceEnd, {
        message: `ราคาสูงสุด ${convertNumberToString(priceEnd)} บาท (ตามที่ตั้งค่าไว้ในรายละเอียดหอพัก)`,
      }),
  })

  const form = useForm<z.infer<typeof manageRoomSchema>>({
    resolver: zodResolver(manageRoomSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      price: 0,
    },
  })

  useEffect(() => {
    if (priceStart && priceEnd) {
      form.reset({
        name: '',
        price: priceStart,
      })
    }
  }, [form, priceStart])

  const onSubmit = async (values: z.infer<typeof manageRoomSchema>) => {
    try {
      await addRoom(dormId, {
        name: values.name as string,
        price: values.price,
        isAvailable: true,
      }).then(() =>
        toast({
          variant: 'success',
          icon: <IoCheckmarkCircle className="text-forground" />,
          title: 'สร้างห้องพักสำเร็จ',
        }),
      )

      setIsOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div>
          <Button className="space-x-2" onClick={() => setIsOpen(true)}>
            เพิ่มห้องพัก
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle asChild>
            <div className="flex gap-2">
              <h2 className="text-primary">เพิ่มห้องพัก</h2>
            </div>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="max-md:max-h-[250px] overflow-auto px-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 grid grid-cols-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชื่อห้องพัก / หมายเลขห้องพัก</FormLabel>
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
                      <Input
                        type="number"
                        placeholder="ราคา"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant="success" type="submit" disabled={!form.formState.isValid}>
                บันทึก
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ModalCreateRoom
