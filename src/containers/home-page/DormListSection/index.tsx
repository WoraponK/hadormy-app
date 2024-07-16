/* eslint-disable react-hooks/exhaustive-deps */
'use client'

// Lib
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import TooltipMain from '@/components/ui/tooltip-main'

// Images
import { FaListUl } from 'react-icons/fa6'
import { FaSortAmountDown, FaSortAmountDownAlt } from 'react-icons/fa'

// Include in project
import { CardDorm } from '@/components/shared'
import { ESort, TDorm } from '@/lib/type'
import { convertDormTypeToName, convertSortToName } from '@/lib/others'

type Props = {
  cardList: TDorm[]
}

type DormTypeSortProps = {
  dormType: string
  setDormType: React.Dispatch<React.SetStateAction<string>>
}
type GeneralSortProps = {
  minSort: boolean
  setMinSort: React.Dispatch<React.SetStateAction<boolean>>
  generalSort: string
  setGeneralSort: React.Dispatch<React.SetStateAction<string>>
}

const DormTypeSort: React.FC<DormTypeSortProps> = ({ dormType, setDormType }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className="space-x-2 w-fit">
          <FaListUl />
          <p className="text-gray-400">
            ประเภทหอพัก : <span className="text-foreground">{convertDormTypeToName(dormType)}</span>
          </p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={dormType} onValueChange={setDormType}>
          <DropdownMenuLabel>ประเภทหอพัก</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioItem value="ALL" className="cursor-pointer">
            หอพักรวม
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="MALE" className="cursor-pointer">
            หอพักชายล้วน
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="FEMALE" className="cursor-pointer">
            หอพักหญิงล้วน
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const GeneralSort: React.FC<GeneralSortProps> = ({ minSort, setMinSort, generalSort, setGeneralSort }) => {
  return (
    <div className="flex items-center gap-2">
      <Button size={'icon'} onClick={() => setMinSort(!minSort)}>
        {minSort ? (
          <TooltipMain name="เรียงจากน้อย-มาก">
            <FaSortAmountDownAlt />
          </TooltipMain>
        ) : (
          <TooltipMain name="เรียงจากมาก-น้อย">
            <FaSortAmountDown />
          </TooltipMain>
        )}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} className="space-x-2 p-0">
            <p className="text-gray-400">
              เรียงตาม : <span className="text-foreground">{convertSortToName(generalSort as ESort)}</span>
            </p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={generalSort} onValueChange={setGeneralSort}>
            <DropdownMenuLabel>เรียงตาม</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioItem value="TIME" className="cursor-pointer">
              เวลาประกาศ
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="PRICE" className="cursor-pointer">
              ราคา
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="DISTANCE" className="cursor-pointer">
              ระยะทาง
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

const DormListSection: React.FC<Props> = ({ cardList }) => {
  const [dormType, setDormType] = useState<string>('ALL')
  const [minSort, setMinSort] = useState<boolean>(false)
  const [generalSort, setGeneralSort] = useState<string>('TIME')

  const newCardList = cardList.filter((ele) => ele.type === dormType)

  newCardList.sort((a: TDorm, b: TDorm): any => {
    switch (generalSort) {
      case 'TIME':
        if (minSort) {
          return (new Date(a.timestamp) as any) - (new Date(b.timestamp) as any)
        } else {
          return (new Date(b.timestamp) as any) - (new Date(a.timestamp) as any)
        }
      case 'PRICE':
        if (minSort) {
          return a.priceStart - b.priceStart
        } else {
          return b.priceStart - a.priceStart
        }
      case 'DISTANCE':
        if (minSort) {
          return a.distance - b.distance
        } else {
          return b.distance - a.distance
        }
    }
  })

  return (
    <div className="space-y-2 max-lg:space-y-6">
      <div className="flex justify-between max-sm:flex-col max-sm:items-center gap-2">
        <DormTypeSort dormType={dormType} setDormType={setDormType} />
        <GeneralSort
          minSort={minSort}
          setMinSort={setMinSort}
          generalSort={generalSort}
          setGeneralSort={setGeneralSort}
        />
      </div>
      <div className="flex flex-col gap-4 max-lg:grid max-md:grid-cols-2 max-[548px]:grid-cols-1">
        {newCardList.map((card) => (
          <CardDorm
            key={card.id}
            id={card.id}
            name={card.name}
            address={card.address}
            distance={card.distance}
            priceStart={card.priceStart}
            priceEnd={card.priceEnd}
            timestamp={card.timestamp}
            thumbnail={card.thumbnail?.[0]}
          />
        ))}
      </div>
    </div>
  )
}

export default DormListSection
