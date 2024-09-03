import React, { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

// Images
import { IoCheckmarkCircle } from 'react-icons/io5'

// Include in project
import { BackButton } from '@/components/shared'
import manageUserScheme from '@/schemas/manageUserScheme'
import { EUserRole } from '@/lib/type'
import { TUser } from '@/lib/type'
import { getUserById, updateUser } from '@/collections/usersCollection'
import { Timestamp } from 'firebase/firestore'
import { addNotification } from '@/collections/notificationCollection'
import { convertRoleToName } from '@/lib/others'

type Props = {
  userId: string
}

const ManageUserByIdSection: React.FC<Props> = ({ userId }) => {
  const router = useRouter()
  const { toast } = useToast()
  const [userData, setUserData] = useState<TUser>()
  const form = useForm<z.infer<typeof manageUserScheme>>({
    resolver: zodResolver(manageUserScheme),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      phoneNumber: '',
      userRole: '' as EUserRole,
    },
  })

  // State to track if the form is dirty
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserById(userId)
        if (!user) return
        setUserData(user)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUser()
  }, [userId])

  useEffect(() => {
    if (userData) {
      form.reset({
        email: userData.email,
        name: userData.name,
        password: userData.password,
        phoneNumber: userData.phone,
        userRole: userData.role as EUserRole,
      })
      setIsDirty(false)
    }
  }, [userData, form])

  const currentValues = form.watch()

  useEffect(() => {
    if (userData) {
      const isSame =
        currentValues.email === userData.email &&
        currentValues.name === userData.name &&
        currentValues.password === userData.password &&
        currentValues.phoneNumber === userData.phone &&
        currentValues.userRole === userData.role

      setIsDirty(!isSame)
    }
  }, [currentValues, userData])

  const onSubmit = async (values: z.infer<typeof manageUserScheme>) => {
    try {
      await updateUser(userId, {
        name: values.name,
        role: values.userRole,
      }).then(() => {
        toast({
          variant: 'success',
          icon: <IoCheckmarkCircle className="text-forground" />,
          title: 'เปลี่ยนข้อมูลผู้ใช้สำเร็จ!',
        })
      })

      await addNotification(userId as string, {
        title: `คุณเป็น ${convertRoleToName(values.userRole as EUserRole)} แล้ว!`,
        description: 'โดยผู้ดูแลระบบ',
        is_seen: false,
        updateAt: Timestamp.now(),
        role: 'ADMIN',
      })

      router.back()
    } catch (error) {
      console.error
    }
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
                    <Input placeholder="เบอร์โทร" {...field} disabled />
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
                    <Input placeholder="รหัสผ่าน" {...field} disabled />
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
                  <FormLabel>บทบาท</FormLabel>
                  <FormControl>
                    <RadioGroup value={field.value} onValueChange={field.onChange} className="flex space-x-4">
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
              <Button variant="success" type="submit" disabled={!isDirty}>
                {' '}
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
