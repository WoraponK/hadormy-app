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
import { db, storage } from '@/lib/firebase'
import { addDoc, collection, doc, getDoc, Timestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/navigation'

// Include in project
import manageDormSchema from '@/schemas/manageDormSchema'
import { EDormType, TDorm, TUser } from '@/lib/type'
import { BackButton } from '@/components/shared'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { updateUser } from '@/collections/usersCollection'
import { addRoomsByAmount } from '@/collections/roomsCollection'

const CreateDormSection: React.FC = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof manageDormSchema>>({
    resolver: zodResolver(manageDormSchema),
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
      dormType: EDormType.All,
      roomAmount: 1,
      phoneContact: '',
      images: [],
      description: '',
    },
  })

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      form.setValue('images', Array.from(files))
    }
  }

  const onSubmit = async (values: z.infer<typeof manageDormSchema>) => {
    try {
      const auth = getAuth()
      const user = auth.currentUser

      if (!user) {
        throw new Error('User not authenticated')
      }

      const userDocRef = doc(db, 'users', user.uid)
      const userDocSnapshot = await getDoc(userDocRef)

      if (!userDocSnapshot.exists()) {
        throw new Error('Use data not found')
      }

      const userData = userDocSnapshot.data()

      const newDorm = {
        name: values.name,
        creator_name: userData.name,
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
        type: values.dormType,
        phone_number: values.phoneContact,
        description: values.description,
        owner: userDocRef,
        images: [] as string[],
        timestamp: Timestamp.now(),
        updated_at: Timestamp.now(),
        is_activated: false,
      }

      const fileList = values.images

      if (fileList && fileList.length > 0) {
        for (const file of fileList) {
          const storageRef = ref(storage, `dorms/${user.uid}/${file.name}`)

          try {
            await uploadBytes(storageRef, file)
            const downloadURL = await getDownloadURL(storageRef)
            newDorm.images.push(downloadURL) // Store each download URL in the images array
          } catch (error) {
            console.error('Error uploading file:', error)
          }
        }
      }

      const dormRef = await addDoc(collection(db, 'dorms'), newDorm)
      const dataUser = {
        owner_dorm: doc(db, 'dorms', dormRef.id),
      }
      await addRoomsByAmount(dormRef.id, values.roomAmount, values.priceStart)
      await updateUser(user.uid, dataUser as TUser)
      router.push(`/owner/manage-dorm/${dormRef.id}/room`)
    } catch (error) {
      console.error('Error submitted create dorm:', error)
    }
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
                          <Input
                            type="number"
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
                            type="number"
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
                    <FormLabel>
                      ค่าไฟ
                      <span className="text-gray-400 font-normal">(บาท/หน่วย)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="ค่าไฟ"
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
                name="billWater"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      ค่าน้ำ
                      <span className="text-gray-400 font-normal">(บาท/หน่วย)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="ค่าน้ำ"
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
                name="billInternet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ค่าอินเทอร์เน็ต</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
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
                        type="number"
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
                        type="number"
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
                      <Input
                        type="number"
                        placeholder="จำนวนห้อง"
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
            <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem>
                  <FormLabel>
                    เพิ่มรูปหอพัก <span className="text-destructive">*</span>{' '}
                    <span className="text-gray-400 font-normal">
                      (ไฟล์นามสกุล .jpeg, .jpg, .png และขนาดไฟล์ไม่เกิน 5MB ต่อรูป)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={onImageChange} // Use the custom change handler
                      multiple
                    />
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
