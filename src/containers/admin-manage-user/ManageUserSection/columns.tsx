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

import { formatPhoneNumber, convertDateFormat, convertRoleToName } from '@/lib/others'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { FaRegTrashCan } from 'react-icons/fa6'
import { CgWebsite } from 'react-icons/cg'

import { deleteUser } from '@/collections/usersCollection'

const handleDelete = async (userId: string) => {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete user')
    }

    await deleteUser(userId)
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}

export const columns: ColumnDef<TUserTable>[] = [
  {
    accessorKey: 'role',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-lg w-full"
        >
          บทบาท
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-center">{convertRoleToName(row.getValue('role'))}</div>,
  },
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
    accessorKey: 'created_at',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-lg w-full"
        >
          สร้างเมื่อ
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-center">{convertDateFormat(row.getValue('created_at'))}</div>,
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
    cell: ({ row }) => {
      const user = row.original

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
                    <h3 className="text-center">ต้องการลบบัญชีผู้ใช้นี้ใช่หรือไม่?</h3>
                  </div>
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                  หากลบบัญชีผู้ใช้นี้ไปแล้ว จะไม่สามารถกู้คืนได้อีก
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(user.id as string)}>ยืนยัน</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )
    },
  },
]
