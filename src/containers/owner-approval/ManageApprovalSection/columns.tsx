import { ColumnDef } from '@tanstack/react-table'
import { TRoomApproveTable } from '@/lib/type'
import { Button } from '@/components/ui/button'
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

import { formatPhoneNumber, convertDateFormat } from '@/lib/others'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { FaCheck, FaXmark } from 'react-icons/fa6'

// Collection
import { db, storage } from '@/lib/firebase'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import { deleteRoomBooking, getRoomBookings } from '@/collections/roomBookingCollection'
import { addNotification } from '@/collections/notificationCollection'
import { getDormById } from '@/collections/dormsCollection'
import { getUserIdByDormId } from '@/collections/checkCollection'
import { doc, Timestamp } from 'firebase/firestore'
import { updateRoom } from '@/collections/roomsCollection'
import { getUserById } from '@/collections/usersCollection'

const handleDecline = async (dormId: string, roomBookingId: string, userId: string, roomName: string) => {
  try {
    const dormName = await getDormById(dormId).then((dorm) => dorm?.name)
    if (!dormName) return

    const ownerId = await getUserIdByDormId(dormId)
    if (!ownerId) return

    const storagePath = `dorms/${ownerId}/`
    const imagesRef = ref(storage, storagePath)

    const newNotification = {
      title: 'ถูกปฏิเสธการจองห้องพัก!',
      description: `${dormName} ห้อง ${roomName}`,
      is_seen: false,
      updateAt: Timestamp.now(),
      image: '',
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

    await addNotification(userId, newNotification)
    await deleteRoomBooking(dormId, roomBookingId)
  } catch (error) {
    console.error('Error declining room booking:', error)
  }
}

const handleSubmit = async (
  dormId: string,
  approvedRoomBookingId: string,
  userId: string,
  roomId: string,
  roomName: string,
) => {
  try {
    const dormName = await getDormById(dormId).then((dorm) => dorm?.name)
    if (!dormName) return

    const ownerId = await getUserIdByDormId(dormId)
    if (!ownerId) return

    const userData = await getUserById(userId)
    if (!userData) return

    const storagePath = `dorms/${ownerId}/`
    const imagesRef = ref(storage, storagePath)

    const newNotification = {
      title: 'การจองห้องพักได้รับการอนุมัติ!',
      description: `${dormName} ห้อง ${roomName}`,
      is_seen: false,
      updateAt: Timestamp.now(),
      image: '',
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

    await addNotification(userId, newNotification)
    await updateRoom(dormId, roomId, {
      isAvailable: false,
      user_ref: doc(db, 'users', userId),
      user_id: userId as string,
      username: userData.name as string,
    })
    await deleteRoomBooking(dormId, approvedRoomBookingId)

    const roomBookings = await getRoomBookings(dormId)
    if (!roomBookings) return

    for (const booking of roomBookings) {
      if (booking.room_id === roomId && booking.id !== approvedRoomBookingId) {
        await handleDecline(dormId, booking.id, booking.user_id, roomName)
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export const columns: ColumnDef<TRoomApproveTable>[] = [
  {
    accessorKey: 'username',
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
    cell: ({ row }) => <div>{row.getValue('username')}</div>,
  },
  {
    accessorKey: 'phoneNumber',
    header: () => <div>เบอร์โทร</div>,
    cell: ({ row }) => <div>{formatPhoneNumber(row.getValue('phoneNumber'))}</div>,
  },
  {
    accessorKey: 'room',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-lg w-full"
        >
          ห้อง
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-center">{row.getValue('room')}</div>,
  },
  {
    accessorKey: 'updateAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-lg w-full"
        >
          เวลาส่ง
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-center">{convertDateFormat(row.getValue('updateAt'))}</div>,
  },
  {
    id: 'submit',
    header: () => <div className="text-center text-success">ยอมรับ</div>,
    cell: ({ row }) => {
      const dormId = row.original.dormId
      const roomBookingId = row.original.id
      const userId = row.original.userId
      const roomId = row.original.roomId
      const roomName = row.original.room

      return (
        <div className="flex justify-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="success" size="icon" className="text-lg text-center">
                <FaCheck className="text-background" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="space-y-2">
              <AlertDialogHeader className="space-y-4">
                <AlertDialogTitle asChild>
                  <div className="flex flex-col items-center gap-4 text-success">
                    <div className="border-2 border-success p-4 rounded-full">
                      <FaCheck className="text-4xl" />
                    </div>
                    <h3 className="text-center">ต้องการอนุมัติผู้เช่าหอพักนี้?</h3>
                  </div>
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription className="text-center">
                ระบบจะทำการปฏิเสธการจอง ที่มีห้องพักเดียวกันโดยอัตโนมัติ
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    handleSubmit(
                      dormId as string,
                      roomBookingId as string,
                      userId as string,
                      roomId as string,
                      roomName,
                    )
                  }
                >
                  ยืนยัน
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )
    },
  },
  {
    id: 'decline',
    header: () => <div className="text-center text-destructive">ปฏิเสธ</div>,
    cell: ({ row }) => {
      const dormId = row.original.dormId
      const roomBookingId = row.original.id
      const userId = row.original.userId
      const roomName = row.original.room

      return (
        <div className="flex justify-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon" className="text-lg text-center">
                <FaXmark className="text-background" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="space-y-2">
              <AlertDialogHeader className="space-y-4">
                <AlertDialogTitle asChild>
                  <div className="flex flex-col items-center gap-4 text-destructive">
                    <div className="border-2 border-destructive p-4 rounded-full">
                      <FaXmark className="text-4xl" />
                    </div>
                    <h3 className="text-center">ต้องปฏิเสธการอนุัติหอพักนี้?</h3>
                  </div>
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                  หากปฏิเสธไปแล้ว จะไม่สามารถกลับมาได้
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogDescription className="text-center"></AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDecline(dormId as string, roomBookingId as string, userId as string, roomName)}
                >
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
