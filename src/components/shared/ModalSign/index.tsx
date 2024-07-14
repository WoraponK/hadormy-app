'use client'

// Lib
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'

// Images
import HadormyLogoSVG from '@/images/logos/hadormy-logo-full-dark.svg'

// Include in project
import loginSchema from '@/schemas/loginScheme'
import registerSchema from '@/schemas/registerSchema'
import { Checkbox } from '@/components/ui/checkbox'

const LoginTab: React.FC = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log('🚀 ~ onSubmit ~ values:', values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>อีเมล</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>รหัสผ่าน</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          เข้าสู่ระบบ
        </Button>
      </form>
    </Form>
  )
}
const RegisterTab: React.FC = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      privacy: false,
    },
  })

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log('🚀 ~ onSubmit ~ values:', values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                ชื่อ-นามสกุล <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                อีเมล <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  รหัสผ่าน <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  ยืนยันรหัสผ่าน <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Confirm Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                เบอร์โทรศัพท์ <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="privacy"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>
                  ยอมรับเงื่อนไข{' '}
                  <Link href={'/terms-of-use'} className="text-primary underline">
                    ข้อตกลงการใช้งาน
                  </Link>{' '}
                  และ{' '}
                  <Link href={'/privacy-policy'} className="text-primary underline">
                    นโยบายความเป็นส่วนตัว
                  </Link>{' '}
                  <span className="text-destructive">*</span>
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          สมัครสมาชิก
        </Button>
      </form>
    </Form>
  )
}

const ModalSign: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button size={'lg'}>
            <h5>เข้าสู่ระบบ</h5>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex items-center gap-4">
          <DialogTitle>
            <Image src={HadormyLogoSVG} alt="HadormyLogoSVG" />
          </DialogTitle>
          <DialogDescription className="text-foreground" asChild>
            <div>
              <h2>ยินดีต้อนรับสู่ HaDormy!</h2>
            </div>
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="login" className="w-full">
              เข้าสู่ระบบ
            </TabsTrigger>
            <TabsTrigger value="register" className="w-full">
              สมัครสมาชิก
            </TabsTrigger>
          </TabsList>
          <div className="pt-4 text-foreground">
            <TabsContent value="login">
              <LoginTab />
            </TabsContent>
            <TabsContent value="register">
              <RegisterTab />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default ModalSign
