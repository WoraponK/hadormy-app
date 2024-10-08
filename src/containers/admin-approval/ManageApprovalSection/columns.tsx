import { ColumnDef } from '@tanstack/react-table'
import { TDormTable } from '@/lib/type'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
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
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Timestamp } from 'firebase/firestore'

import { formatPhoneNumber, convertDateFormat } from '@/lib/others'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { FaCheck, FaXmark } from 'react-icons/fa6'
import { TbExternalLink } from 'react-icons/tb'

import { updateDorm, deleteDorm } from '@/collections/dormsCollection'
import { addNotification } from '@/collections/notificationCollection'
import { getUserIdByDormId } from '@/collections/checkCollection'

const handleSubmit = async (id: string) => {
  try {
    const userId = await getUserIdByDormId(id)
    await updateDorm(id, { is_activated: true })
    await addNotification(userId as string, {
      title: 'หอพักได้รับการอนุมัติ!',
      is_seen: false,
      updateAt: Timestamp.now(),
      role: 'ADMIN',
    })
  } catch (error) {
    console.error(error)
  }
}

const handleCancel = async (id: string) => {
  try {
    const userId = await getUserIdByDormId(id)
    const userQuery = query(collection(db, 'users'), where('owner_dorm', '==', doc(db, 'dorms', id)))
    const userSnapshot = await getDocs(userQuery)

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0]
      const userRef = doc(db, 'users', userDoc.id)

      await updateDoc(userRef, {
        owner_dorm: null,
      })

      await addNotification(userId as string, {
        title: 'หอพักได้ถูกปฏิเสธการอนุมัติ!',
        is_seen: false,
        updateAt: Timestamp.now(),
        role: 'ADMIN',
      })

      await deleteDorm(id)
    }
  } catch (error) {
    console.error(error)
  }
}

export const columns: ColumnDef<TDormTable>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-lg w-full"
        >
          ชื่อหอพัก
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'createdBy',
    header: () => <div>ชื่อผู้สร้าง</div>,
    cell: ({ row }) => <div>{row.getValue('createdBy')}</div>,
  },
  {
    accessorKey: 'phoneNumber',
    header: () => <div>เบอร์โทร</div>,
    cell: ({ row }) => <div>{formatPhoneNumber(row.getValue('phoneNumber'))}</div>,
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
          แก้ไขล่าสุด
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-center">{convertDateFormat(row.getValue('updateAt'))}</div>,
  },
  {
    id: 'preview',
    header: () => <div className="text-center">รายละเอียด</div>,
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex justify-center">
          <Link href={`/dorm/${user.id}`} target="_blank">
            <span className="flex items-center justify-center space-x-2 text-foreground underline-offset-2 hover:underline">
              <span>รายละเอียดหอพัก</span>
              <TbExternalLink />
            </span>
          </Link>
        </div>
      )
    },
  },
  {
    id: 'submit',
    header: () => <div className="text-center text-success">ยอมรับ</div>,
    cell: ({ row }) => {
      const user = row.original
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
                    <h3 className="text-center">ต้องการอนุมัติหอพักนี้?</h3>
                  </div>
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                  หากอนุมัติไปแล้ว ระบบจะทำการแสดงหอพักนี้เป็นสาธารณะ
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleSubmit(`${user.id}`)}>ยืนยัน</AlertDialogAction>
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
      const user = row.original
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
              <AlertDialogFooter>
                <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleCancel(`${user.id}`)}>ยืนยัน</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )
    },
  },
]
