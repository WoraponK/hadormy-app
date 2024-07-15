import { ColumnDef } from '@tanstack/react-table'
import { TUserTable } from '@/lib/type'
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
import { FaRegTrashCan } from 'react-icons/fa6'
import { CgWebsite } from 'react-icons/cg'

export const columns: ColumnDef<TUserTable>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-lg w-full"
        >
          ชื่อ
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'phoneNumber',
    header: () => <div className="text-center">เบอร์โทร</div>,
    cell: ({ row }) => <div>{formatPhoneNumber(row.getValue('phoneNumber'))}</div>,
  },
  {
    accessorKey: 'email',
    header: () => <div className="text-center">อีเมล</div>,
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
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
    id: 'edit',
    header: () => <div className="text-center text-primary">จัดการบัญชี</div>,
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex justify-center">
          <Link href={`/admin/manage-user/${user.id}`}>
            <Button size="icon" className="text-lg text-center">
              <CgWebsite className="text-background" />
            </Button>
          </Link>
        </div>
      )
    },
  },
  {
    id: 'delete',
    header: () => <div className="text-center text-destructive">ลบบัญชี</div>,
    cell: () => {
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
                    <h3>ต้องการลบบัญชีผู้ใช้นี้ใช่หรือไม่?</h3>
                  </div>
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                  หากลบบัญชีผู้ใช้นี้ไปแล้ว จะไม่สามารถกู้คืนได้อีก
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
