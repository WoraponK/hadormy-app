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
import Link from 'next/link'

import { formatPhoneNumber, convertDateFormat } from '@/lib/others'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { FaCheck, FaXmark } from 'react-icons/fa6'

export const columns: ColumnDef<TRoomApproveTable>[] = [
  {
    accessorKey: 'name',
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
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'phoneNumber',
    header: () => <div>เบอร์โทร</div>,
    cell: ({ row }) => <div>{formatPhoneNumber(row.getValue('phoneNumber'))}</div>,
  },
  {
    accessorKey: 'room',
    header: () => <div>ห้อง</div>,
    cell: ({ row }) => <div>{row.getValue('room')}</div>,
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
    cell: () => {
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
              <AlertDialogFooter>
                <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                <AlertDialogAction onClick={() => console.log('ยืนยันลบบัญชีผู้ใช้!')}>ยืนยัน</AlertDialogAction>
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
    cell: () => {
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
                <AlertDialogAction onClick={() => console.log('ยืนยันลบบัญชีผู้ใช้!')}>ยืนยัน</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )
    },
  },
]
