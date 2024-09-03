'use client'
// Lib
import React from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Images
import { IoSearch } from 'react-icons/io5'

// Include in project
import { TDormTable } from '@/lib/type'
import { columns } from './columns'
import { Input } from '@/components/ui/input'

type Props = {
  data: TDormTable[]
}

const ManageApprovalSection: React.FC<Props> = ({ data }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div>
      <div className="bg-background rounded-md p-8 shadow-md space-y-8">
        <div className="flex justify-between items-center gap-4 max-md:flex-col max-md:items-start">
          <Input
            icon={<IoSearch />}
            placeholder="ค้นหาชื่อหอพัก..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
            className="max-w-sm border border-border"
          />
          <p>รายการทั้งหมด: {data.length}</p>
        </div>
        <div className="flex items-center gap-2 justify-end max-md:flex-col">
          <span>
            หน้า {table.getState().pagination.pageIndex + 1} จาก {table.getPageCount()}
          </span>
          <div className="flex items-center gap-2">
            <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              ย้อนกลับ
            </Button>
            <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              ถัดไป
            </Button>
          </div>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select page size" />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 40, 50, data.length].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()} className="hover:cursor-pointer">
                  {pageSize !== data.length ? `แสดง ${pageSize} รายการ` : 'แสดงทั้งหมด'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Table className="space-y-4">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-lg text-gray-500 font-semibold">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  ไม่พบข้อมูลการขออนุมัติ...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ManageApprovalSection
