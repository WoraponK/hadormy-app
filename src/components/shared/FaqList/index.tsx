// Lib
import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

// Images
import { FaRegCircleQuestion } from 'react-icons/fa6'

// Include in project
import { FaqData } from '@/assets/faq'

const FaqList: React.FC = () => {
  return (
    <div className="w-full space-y-2 bg-background shadow-md p-8 max-sm:px-4 rounded-3xl">
      <div className="flex justify-center items-center text-primary space-x-2">
        <FaRegCircleQuestion className="text-xl" />
        <h3>คำถามที่พบบ่อย</h3>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {FaqData.map((ele, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{ele.title}</AccordionTrigger>
            <AccordionContent>{ele.description}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default FaqList
