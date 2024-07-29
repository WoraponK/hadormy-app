'use client'
// Lib
import React, { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

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
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searching: '',
    },
  })

  return (
    <div className="w-full max-w-[432px] relative">
      <Form {...form}>
        <form onChange={() => console.log(form.getValues().searching)} className="space-y-6">
          <FormField
            control={form.control}
            name="searching"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-background rounded-full w-full"
                    placeholder="ค้นหาหอพัก..."
                    icon={<IoSearch className="text-background text-2xl" />}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="p-2 space-y-2 bg-background rounded-lg absolute mt-2 w-full shadow z-20">
        {dorms ? (
          dorms?.map((dorm) => (
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
  )
}

export default SearchBar
