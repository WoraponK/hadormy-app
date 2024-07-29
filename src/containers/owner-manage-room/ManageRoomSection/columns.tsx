/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { ColumnDef } from '@tanstack/react-table'
import { TRoom } from '@/lib/type'
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

import { convertNumberToString } from '@/lib/others'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { FaRegTrashCan } from 'react-icons/fa6'
import { CgWebsite } from 'react-icons/cg'

import { usePathname } from 'next/navigation'

export const columns: ColumnDef<TRoom>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-lg w-full"
        >
          ห้องพัก
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-center">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-lg w-full"
        >
          ราคา
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-center">{convertNumberToString(row.getValue('price'))} บาท/เดือน</div>,
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
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue('isAvailable') ? (
          <p className="font-semibold text-success">ว่าง</p>
        ) : (
          <p className="font-semibold text-destructive">ไม่ว่าง</p>
        )}
      </div>
    ),
  },
  {
    id: 'edit',
    header: () => <div className="text-center text-primary">แก้ไขรายละเอียดห้องพัก</div>,
    cell: ({ row }) => {
      const room = row.original
      return (
        <div className="flex justify-center">
          <Link href={`${usePathname()}/${room.id}`}>
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
    header: () => <div className="text-center text-destructive">ลบห้องพัก</div>,
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
                    <h3 className="text-center">ต้องการลบห้องพักนี้ใช่หรือไม่?</h3>
                  </div>
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                  หากลบห้องพักนี้ไปแล้ว จะไม่สามารถกู้คืนได้อีก
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                <AlertDialogAction onClick={() => console.log('ยืนยันลบห้องพัก!')}>ยืนยัน</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )
    },
  },
]
