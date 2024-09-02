// context/authContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from 'firebase/auth'
import { app, db } from '@/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { Timestamp } from 'firebase/firestore'
import { useToast } from '@/components/ui/use-toast'
import bcrypt from 'bcryptjs'

// Images
import { IoCheckmarkCircle } from 'react-icons/io5'
import { MdError } from 'react-icons/md'

// Type / Enum
import { EUserRole } from '@/lib/type'

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, name: string, phone: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOutUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const auth = getAuth(app)
  const { toast } = useToast()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [auth])

  const signUp = async (email: string, password: string, name: string, phone: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      const hashedPassword = await bcrypt.hash(password, 10)
      const userDocRef = doc(db, 'users', user.uid)

      await setDoc(userDocRef, {
        id: user.uid,
        name: name,
        password: hashedPassword,
        phone: phone,
        email: user.email,
        role: EUserRole.User,
        created_at: Timestamp.now(),
      })
        .then(() => {
          toast({
            variant: 'success',
            icon: <IoCheckmarkCircle className="text-forground" />,
            title: 'สมัครสมาชิกสำเร็จ',
            description: 'จะทำการเข้าสู่ระบบทันที...',
          })
        })
        .catch(() => {
          throw new Error('Error')
        })
    } catch (error) {
      console.error('สมัครสมาชิกไม่ถูกต้อง:', error)
      toast({
        variant: 'destructive',
        icon: <MdError className="text-background" />,
        title: 'สมัครสมาชิกไม่ถูกต้อง',
        description: `${error}`,
      })
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        toast({
          variant: 'success',
          icon: <IoCheckmarkCircle className="text-forground" />,
          title: 'เข้าสู่ระบบสำเร็จ',
        })
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        icon: <MdError className="text-background" />,
        title: 'เข้าสู่ระบบไม่สำเร็จ',
        description: `${error}`,
      })
    }
  }

  const signOutUser = async () => {
    try {
      await signOut(auth)
        .then(() => {
          toast({
            variant: 'success',
            icon: <IoCheckmarkCircle className="text-forground" />,
            title: 'ออกจากระบบสำเร็จ',
          })
        })
        .catch(() => {
          throw new Error('Error')
        })
    } catch (error) {
      console.error('ออกจากระบบไม่สำเร็จ:', error)
      toast({
        variant: 'destructive',
        icon: <MdError className="text-background" />,
        title: 'ออกจากระบบไม่สำเร็จ',
        description: `${error}`,
      })
    }
  }

  return <AuthContext.Provider value={{ user, loading, signUp, signIn, signOutUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
