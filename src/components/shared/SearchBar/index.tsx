/* eslint-disable react-hooks/exhaustive-deps */
'use client'
// Lib
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useMediaQuery } from '@uidotdev/usehooks'

// Images
import { IoSearch } from 'react-icons/io5'

// Include in project
import { TDorm } from '@/lib/type'
import CardDormSearch from '../CardDormSearch'
import searchSchema from '@/schemas/searchSchema'

type Props = {
  dorms?: TDorm[]
}

const SearchBar: React.FC<Props> = ({ dorms }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isDesktop = dynamic(() => useMediaQuery('(min-width: 768px)'), { ssr: false })

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searching: '',
    },
  })

  const [filteredDorms, setFilteredDorms] = useState<TDorm[]>(dorms || [])

  useEffect(() => {
    const searchTerm = form.getValues().searching.toLowerCase()
    const filtered =
      dorms?.filter((dorm) => {
        const lowerCaseDorm = {
          name: dorm.name.toLowerCase(),
          priceStart: dorm.priceStart.toString().toLowerCase(),
          distance: dorm.distance.toString().toLowerCase(),
        }
        return (
          lowerCaseDorm.name.includes(searchTerm) ||
          lowerCaseDorm.priceStart.includes(searchTerm) ||
          lowerCaseDorm.distance.includes(searchTerm)
        )
      }) || []
    setFilteredDorms(filtered)
  }, [form.getValues().searching, dorms])

  if (isDesktop) {
    return (
      <div className="w-full max-w-[432px] relative">
        <Form {...form}>
          <FormField
            control={form.control}
            name="searching"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-background rounded-full w-full"
                    placeholder="ค้นหาหอพัก..."
                    icon={<IoSearch className="text-background text-2xl max-md:text-foreground" />}
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
        {form.getValues().searching.length > 0 ? (
          <div className="p-2 bg-background rounded-lg absolute mt-2 w-full shadow z-20 ">
            <div className="overflow-auto h-full max-h-80 space-y-2 p-1 rounded-lg">
              {filteredDorms?.length > 0 ? (
                filteredDorms?.map((dorm) => (
                  <CardDormSearch
                    key={dorm?.id}
                    id={dorm?.id}
                    name={dorm?.name}
                    priceStart={dorm?.priceStart}
                    priceEnd={dorm?.priceEnd}
                    distance={dorm?.distance}
                    thumbnail={dorm?.thumbnail?.[0]}
                  />
                ))
              ) : (
                <div>
                  <p className="text-center">ไม่พบข้อมูลหอพัก...</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button size={'icon'} className="bg-transparent transition-colors hover:text-gray-300 shadow-none">
            <IoSearch className="text-2xl" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex items-center gap-4">
          <DialogTitle asChild>
            <div className="w-full pt-4">
              <Form {...form}>
                <FormField
                  control={form.control}
                  name="searching"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="bg-background rounded-full w-full"
                          placeholder="ค้นหาหอพัก..."
                          icon={<IoSearch className="text-background text-2xl max-md:text-foreground" />}
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Form>
            </div>
          </DialogTitle>
          <DialogDescription className="text-foreground" asChild>
            <div className="w-full">
              {form.getValues().searching.length > 0 ? (
                <div className="bg-background rounded-lg w-full z-20 ">
                  <div className="overflow-auto h-full max-h-80 space-y-2 p-1 rounded-lg">
                    {filteredDorms?.length > 0 ? (
                      filteredDorms?.map((dorm) => (
                        <CardDormSearch
                          key={dorm?.id}
                          id={dorm?.id}
                          name={dorm?.name}
                          priceStart={dorm?.priceStart}
                          priceEnd={dorm?.priceEnd}
                          distance={dorm?.distance}
                          thumbnail={dorm?.thumbnail?.[0]}
                        />
                      ))
                    ) : (
                      <div>
                        <p className="text-center">ไม่พบข้อมูลหอพัก...</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default SearchBar
