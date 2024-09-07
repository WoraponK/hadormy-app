'use client'

// Lib
import React, { useEffect, useState } from 'react'
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Timestamp } from 'firebase/firestore'
import { useToast } from '@/components/ui/use-toast'

// Images
import IconMegaphoneWhiteSVG from '@/images/common/icon-megaphone-white.svg'
import IconMegaphonePrimarySVG from '@/images/common/icon-megaphone-primary.svg'
import announceSchema from '@/schemas/announceSchema'
import { HiSpeakerphone } from 'react-icons/hi'

// Include in project
import { addAnnouce } from '@/collections/announcementCollection'
import { TCardAnnounce, TDorm, TNotification, TUserRole } from '@/lib/type'
import { storage } from '@/lib/firebase'
import { getDownloadURL, ref, uploadBytes, listAll, list } from 'firebase/storage'
import { useAuth } from '@/context/authContext'
import { getUserById } from '@/collections/usersCollection'
import { getDormIdByUserId, getUserIdByDormId } from '@/collections/checkCollection'
import { getDormById } from '@/collections/dormsCollection'
import { addNotificationForMembership } from '@/collections/notificationCollection'

const ModalAnnounce: React.FC = () => {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [dormData, setDormData] = useState<TDorm | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) return
        const dormId = await getDormIdByUserId(user?.uid)
        const dormData = await getDormById(dormId as string)
        setDormData(dormData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [user])

  const form = useForm<z.infer<typeof announceSchema>>({
    resolver: zodResolver(announceSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      image: undefined,
    },
  })

  const onSubmit = async (values: z.infer<typeof announceSchema>) => {
    if (user) {
      try {
        const userById = await getUserById(user?.uid)
        const newAnnouncement: TCardAnnounce = {
          title: values.title,
          description: values.description,
          thumbnail: '',
          author: userById?.name as string,
          role: userById?.role as TUserRole,
          user_id: userById?.id as string,
          timestamp: Timestamp.now(),
        }

        const fileList = values.image
        if (fileList && fileList.length > 0) {
          const file = fileList[0] // Get the first file
          const storageRef = ref(storage, `announcements/${user.uid}/${file.name}`)

          try {
            await uploadBytes(storageRef, file)
            const downloadURL = await getDownloadURL(storageRef)
            newAnnouncement.thumbnail = downloadURL
          } catch (error) {
            console.error('Error uploading file:', error)
          }
        } else {
          const storagePath = `dorms/${user.uid}/`
          const imagesRef = ref(storage, storagePath)

          try {
            const imageList = await listAll(imagesRef)
            if (imageList.items.length > 0) {
              const firstImageRef = imageList.items[0]
              const firstImageURL = await getDownloadURL(firstImageRef)
              newAnnouncement.thumbnail = firstImageURL
            } else {
              console.warn('No images found in storage.')
            }
          } catch (error) {
            console.error(error)
          }
        }

        try {
          await addAnnouce(newAnnouncement)

          if (!dormData) return

          const ownerId = await getUserIdByDormId(dormData.id as string)

          if (!ownerId) return

          const storagePath = `dorms/${ownerId}/`
          const imagesRef = ref(storage, storagePath)

          const newNotification = {
            title: `ประกาศจาก ${dormData.name}`,
            description: `${values.title} - ${values.description}`,
            is_seen: false,
            updateAt: Timestamp.now(),
            image: '',
            link: `/dorm/${dormData.id}`,
          }

          try {
            const imageList = await listAll(imagesRef)
            if (imageList.items.length > 0) {
              const firstImageRef = imageList.items[0]
              const firstImageURL = await getDownloadURL(firstImageRef)
              newNotification.image = firstImageURL
            } else {
              console.warn('No images found in storage.')
            }
          } catch (error) {
            console.error('Error retrieving images:', error)
          }

          await addNotificationForMembership(dormData?.id as string, newNotification)

          toast({
            icon: <HiSpeakerphone className="text-primary" />,
            title: 'สร้างประกาศของคุณสำเร็จ!',
          })

          setIsOpen(false)
        } catch (error) {
          console.error('Error adding announcement:', error)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div>
          <Button size="lg" className="space-x-2" onClick={() => setIsOpen(true)}>
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
              <Image
                src={IconMegaphonePrimarySVG}
                alt="IconMegaphoneBlackSVG"
                className="w-auto h-auto aspect-square"
              />
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
                      <Input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={(e) => {
                          field.onChange(e.target.files) // Pass the FileList to form state
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={!form.formState.isValid}>
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
