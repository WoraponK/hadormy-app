/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { TRoom } from '@/lib/type'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'

import { convertNumberToString } from '@/lib/others'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { FaRegTrashCan } from 'react-icons/fa6'
import { TbEdit } from 'react-icons/tb'
import { FaUserAltSlash } from 'react-icons/fa'

// Collection
import { deleteRoom, updateRoom } from '@/collections/roomsCollection'
import { useToast } from '@/components/ui/use-toast'
import { getDormById } from '@/collections/dormsCollection'
import { getUserIdByDormId } from '@/collections/checkCollection'
import { getUserById } from '@/collections/usersCollection'
import { db, storage } from '@/lib/firebase'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { doc, Timestamp } from 'firebase/firestore'
import { addNotification } from '@/collections/notificationCollection'

export const columns = (dormId: string): ColumnDef<TRoom>[] => {
  const { toast } = useToast()

  const handleChangeStatus = async (userId: string | null, roomId: string, status: boolean) => {
    try {
      if (!userId) {
        await updateRoom(dormId, roomId, {
          isAvailable: !status,
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'ไม่สามารถปรับสถานะห้องขณะที่มีผู้เช่าอยู่',
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleKick = async (roomId: string, userId: string, roomName: string) => {
    try {
      const dormName = await getDormById(dormId).then((dorm) => dorm?.name)
      if (!dormName) return

      const ownerId = await getUserIdByDormId(dormId)
      if (!ownerId) return

      const storagePath = `dorms/${ownerId}/`
      const imagesRef = ref(storage, storagePath)

      const newNotification = {
        title: 'ถูกปลดจากรายชื่อผู้เช่า!',
        description: `${dormName} ห้อง ${roomName}`,
        is_seen: false,
        updateAt: Timestamp.now(),
        image: '',
        link: `/dorm/${dormId}`,
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

      await updateRoom(dormId, roomId, {
        isAvailable: true,
        user_ref: null,
        user_id: null,
        username: null,
      })

      const userData = await getUserById(userId)

      if (userData) {
        await addNotification(userId, newNotification)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdateRoom = async (roomId: string, updatedFields: Partial<TRoom>) => {
    try {
      await updateRoom(dormId, roomId, updatedFields)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (roomId: string, userId: string, roomName: string) => {
    try {
      const dormName = await getDormById(dormId).then((dorm) => dorm?.name)
      if (!dormName) return

      const ownerId = await getUserIdByDormId(dormId)
      if (!ownerId) return

 
      const storagePath = `dorms/${ownerId}/`
      const imagesRef = ref(storage, storagePath)

      const newNotification = {
        title: 'ห้องพักถูกลบ!',
        description: `${dormName} ห้อง ${roomName} ส่งผลให้คุณถูกปลดจากรายชื่อผู้เช่า`,
        is_seen: false,
        updateAt: Timestamp.now(),
        image: '',
        link: `/dorm/${dormId}`,
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

      await deleteRoom(dormId, roomId)

      const userData = await getUserById(userId)

      if (userData) {
        await addNotification(userId, newNotification)
      }
      
    } catch (error) {
      console.error(error)
    }
  }

  return [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-lg w-full"
        >
          ห้องพัก
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const [isEditing, setIsEditing] = useState(false)
        const [newName, setNewName] = useState<string>(row.getValue('name'))

        const handleNameChange = () => {
          handleUpdateRoom(row.original.id as string, { name: newName })
          setIsEditing(false)
        }

        return (
          <div className="flex justify-center">
            {isEditing ? (
              <Input
                value={newName}
                onChange={(e: any) => setNewName(e.target.value)}
                onBlur={handleNameChange}
                autoFocus
              />
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex space-x-1 group hover:cursor-pointer relative">
                    <p className="text-sm group-hover:underline ">{row.getValue('name')}</p>
                    <TbEdit className="hidden group-hover:block absolute right-[-20px] top-0" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuItem className="hover:cursor-pointer" onClick={() => setIsEditing(true)}>
                    แก้ไขชื่อห้องพัก
                    <DropdownMenuShortcut>
                      <TbEdit />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'price',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-lg w-full"
        >
          ราคา
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const [isEditing, setIsEditing] = useState(false)
        const [newPrice, setNewPrice] = useState<number>(row.getValue('price'))

        const handlePriceChange = () => {
          handleUpdateRoom(row.original.id as string, { price: parseFloat(newPrice.toString()) })
          setIsEditing(false)
        }

        return (
          <div className="flex justify-center">
            {isEditing ? (
              <Input
                value={newPrice}
                onChange={(e: any) => setNewPrice(e.target.value)}
                onBlur={handlePriceChange}
                autoFocus
              />
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex space-x-1 group hover:cursor-pointer relative">
                    <p className="text-sm group-hover:underline ">
                      {convertNumberToString(row.getValue('price'))} บาท/เดือน
                    </p>
                    <TbEdit className="hidden group-hover:block absolute right-[-20px] top-0" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuItem className="hover:cursor-pointer" onClick={() => setIsEditing(true)}>
                    แก้ไขราคา
                    <DropdownMenuShortcut>
                      <TbEdit />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'userName',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="text-lg w-full"
          >
            ชื่อผู้เช่า
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const roomId = row.original.id
        const roomName = row.original.name
        const userId = row.original.userID

        return (
          <div className="flex justify-center">
            {row.getValue('userName') ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex space-x-1 group hover:cursor-pointer relative">
                    <p className="text-sm group-hover:underline ">{row.getValue('userName')}</p>
                    <TbEdit className="hidden group-hover:block absolute right-[-20px] top-0" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuItem
                    className="hover:cursor-pointer text-destructive"
                    onClick={() => handleKick(roomId as string, userId as string, roomName)}
                  >
                    ลบรายชื่อนี้ออก
                    <DropdownMenuShortcut>
                      <FaUserAltSlash />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              '-'
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'isAvailable',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="text-lg w-full"
          >
            สถานะ
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const userId = row.original.userID
        const roomId = row.original.id

        return (
          <div className="text-center">
            <Switch
              onClick={() => handleChangeStatus(userId as string, roomId as string, row.getValue('isAvailable'))}
              checked={row.getValue('isAvailable')}
              className="shadow"
            />
            <p className="text-xs font-bold">
              {row.getValue('isAvailable') ? (
                <span className="text-success">ว่าง</span>
              ) : (
                <span className="text-destructive">ไม่ว่าง</span>
              )}
            </p>
          </div>
        )
      },
    },
    {
      id: 'delete',
      header: () => <div className="text-center text-destructive">ลบห้องพัก</div>,
      cell: ({ row }) => {
        const roomId = row.original.id
        const roomName = row.original.name
        const userId = row.original.userID

        return (
          <div className="flex justify-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon" className="text-lg text-center">
                  <FaRegTrashCan className="text-background" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="space-y-2">
                <AlertDialogHeader className="space-y-4">
                  <AlertDialogTitle asChild>
                    <div className="flex flex-col items-center gap-4 text-destructive">
                      <div className="border-2 border-destructive p-4 rounded-full">
                        <FaRegTrashCan className="text-4xl" />
                      </div>
                      <h3 className="text-center">ต้องการลบห้องพักนี้ใช่หรือไม่?</h3>
                    </div>
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    หากลบห้องพักนี้ไปแล้ว จะไม่สามารถกู้คืนได้อีก
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(roomId as string, userId as string, roomName)}>
                    ยืนยัน
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )
      },
    },
  ]
}
