/* eslint-disable react-hooks/exhaustive-deps */
'use client'
// Lib
import React, { useCallback, useEffect, useState } from 'react'
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
import debounce from 'lodash.debounce'
import { collection, query, where, getDocs, limit } from 'firebase/firestore'

// Images
import { IoSearch } from 'react-icons/io5'

// Include in project
import { TDorm } from '@/lib/type'
import CardDormSearch from '../CardDormSearch'
import searchSchema from '@/schemas/searchSchema'
import { db } from '@/lib/firebase'

const SearchBar: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false)
  const [results, setResults] = useState<TDorm[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth
      if (windowWidth >= 1024) {
        setIsDesktop(true)
      } else {
        setIsDesktop(false)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
  }, [])

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searching: '',
    },
  })

  const performSearch = async (data: z.infer<typeof searchSchema>) => {
    try {
      setLoading(true)
      const postsRef = collection(db, 'dorms')
      let q
      if (data.searching.trim() === '') {
        q = query(postsRef, limit(20))
      } else {
        q = query(postsRef, where('name', '>=', data.searching), where('name', '<=', data.searching + '\uf8ff'))
      }
      const querySnapshot = await getDocs(q)

      const searchResults = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        thumbnail: doc.data().images,
        ...doc.data(),
      })) as TDorm[]

      const filteredResult = searchResults.filter((ele) => ele.is_activated === true)
      setResults(filteredResult)
    } catch (error) {
      console.error('Error during search:', error)
    } finally {
      setLoading(false)
    }
  }

  const debouncedSearch = useCallback(debounce(form.handleSubmit(performSearch), 300), [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue('searching', e.target.value, { shouldValidate: true })
    debouncedSearch()
  }

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
                    icon={<IoSearch className="text-background text-2xl max-lg:text-foreground" />}
                    {...field}
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
        {form.getValues().searching.length > 0 ? (
          <div className="p-2 bg-background rounded-lg absolute mt-2 w-full shadow z-20 ">
            {loading ? (
              <div className="py-4">
                <p className="text-center">กำลังค้นหาหอพัก...</p>
              </div>
            ) : (
              <div className="overflow-auto h-full max-h-80 space-y-2 p-1 rounded-lg">
                {results?.length > 0 ? (
                  results?.map((dorm) => (
                    <CardDormSearch
                      key={dorm?.id}
                      id={dorm?.id}
                      name={dorm?.name}
                      priceStart={dorm?.priceStart}
                      priceEnd={dorm?.priceEnd}
                      distance={dorm?.distance}
                      images={dorm.thumbnail?.[0]}
                    />
                  ))
                ) : (
                  <div>
                    <p className="text-center">ไม่พบข้อมูลหอพัก...</p>
                  </div>
                )}
              </div>
            )}
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
                          icon={<IoSearch className="text-background text-2xl max-lg:text-foreground" />}
                          {...field}
                          autoComplete="off"
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Form>
            </div>
          </DialogTitle>
          {form.getValues().searching.length > 0 && (
            <DialogDescription className="text-foreground" asChild>
              <div className="w-full">
                <div className="bg-background rounded-lg w-full z-20 ">
                  {loading ? (
                    <div className="py-4">
                      <p className="text-center">กำลังค้นหาหอพัก...</p>
                    </div>
                  ) : (
                    <div className="overflow-auto h-full max-h-80 space-y-2 p-1 rounded-lg">
                      {results?.length > 0 ? (
                        results?.map((dorm) => (
                          <CardDormSearch
                            key={dorm?.id}
                            id={dorm?.id}
                            name={dorm?.name}
                            priceStart={dorm?.priceStart}
                            priceEnd={dorm?.priceEnd}
                            distance={dorm?.distance}
                            images={dorm.thumbnail?.[0]}
                          />
                        ))
                      ) : (
                        <div>
                          <p className="text-center">ไม่พบข้อมูลหอพัก...</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </DialogDescription>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default SearchBar
