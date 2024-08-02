// Lib
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

// Include in project
import createDormSchema from '@/schemas/createDormSchema'

const CreateDormSection: React.FC = () => {
  const form = useForm<z.infer<typeof createDormSchema>>({
    resolver: zodResolver(createDormSchema),
    defaultValues: {},
  })

  const onSubmit = (values: z.infer<typeof createDormSchema>) => {
    console.log('🚀 ~ onSubmit ~ values:', values)
  }

  return (
    <div>
      <h1>เพิ่มหอพัก</h1>
      <div></div>
    </div>
  )
}

export default CreateDormSection
