'use client'

// Lib
import React, { useEffect, useState } from 'react'
import NotFound from '@/app/not-found'

// Include in project
import { DormSection } from '@/containers/dorm-page'
import { TDorm } from '@/lib/type'
import { DormLoadingSection } from '@/containers/dorm-page'
import { useAuth } from '@/context/authContext'

import { getDormById } from '@/collections/dormsCollection'
import { getRooms, subscribeToRooms } from '@/collections/roomsCollection'
import { getRatings } from '@/collections/ratingsCollection'

const Dorm = ({ params }: { params: { dormId: string } }) => {
  const { loading } = useAuth()

  const [dormData, setDormData] = useState<TDorm | null>()
  const [roomsData, setRoomsData] = useState<any>()
  const [ratingsData, setRatingsData] = useState<any>()
  const [dormLoading, setDormLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchDormById = async () => {
      try {
        setDormLoading(true)
        const data = await getDormById(params.dormId)
        document.title = `${data?.name} - HaDormy`
        setDormData(data)
      } catch (error) {
        console.error(error)
      } finally {
        setDormLoading(false)
      }
    }

    const unsubscribeRooms = subscribeToRooms(params.dormId, (rooms) => {
      try {
        const data = rooms
        data.sort((a: any, b: any) => a.name.localeCompare(b.name))
        data.sort((a: any, b: any) => a.price - b.price)
        data.sort((a: any, b: any) => b.isAvailable - a.isAvailable)
        setRoomsData(data)
      } catch (error) {
        console.error(error)
      }
    })

    const unsubscribeRatings = getRatings(params.dormId, (ratings) => {
      try {
        setRatingsData(ratings)
      } catch (error) {
        console.error(error)
      }
    })

    fetchDormById()

    return () => {
      unsubscribeRooms()
      unsubscribeRatings()
    }
  }, [params.dormId])

  const formattedData: TDorm = {
    ...(dormData as TDorm),
    rooms: roomsData,
    rating: ratingsData,
  }

  if (dormData === null) {
    return <NotFound />
  }

  return (
    <div className="container mx-auto min-h-screen">
      {dormLoading || loading ? (
        <DormLoadingSection />
      ) : (
        <DormSection dormId={params.dormId} dataDorm={formattedData} />
      )}
    </div>
  )
}

export default Dorm
