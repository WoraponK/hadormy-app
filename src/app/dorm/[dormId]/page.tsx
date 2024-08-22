/* eslint-disable react-hooks/exhaustive-deps */
'use client'

// Lib
import React, { useEffect, useState } from 'react'

// Include in project
import { DormSection } from '@/containers/dorm-page'
import { TDorm } from '@/lib/type'
import { DormLoadingSection } from '@/containers/dorm-page'
import { useAuth } from '@/context/authContext'

import { getDormById } from '@/collections/dormsCollection'
import { getRooms } from '@/collections/roomsCollection'
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
    const fetchRooms = async () => {
      try {
        const data = await getRooms(params.dormId)
        setRoomsData(data)
      } catch (error) {
        console.error(error)
      }
    }

    const fetchRatings = async () => {
      try {
        const data = await getRatings(params.dormId)
        setRatingsData(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchDormById()
    fetchRooms()
    fetchRatings()
  }, [])

  const formattedData: TDorm = {
    ...(dormData as TDorm),
    rooms: roomsData,
    rating: ratingsData,
  }

  return (
    <div className="container mx-auto min-h-screen">
      {dormLoading || loading ? <DormLoadingSection /> : <DormSection dataDorm={formattedData} />}
    </div>
  )
}

export default Dorm
