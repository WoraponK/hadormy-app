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
import { getUserRole } from '@/collections/userRoleCollection'
import { addDoc, collection } from 'firebase/firestore'

// Type / Enum
import { EUserRole } from '@/lib/type'

interface AuthContextType {
  user: User | null
  role: string | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOutUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const auth = getAuth(app)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      if (user) {
        const userRole = await getUserRole(user.uid)
        setRole(userRole)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [auth])

  const signUp = async (email: string, password: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await addDoc(collection(db, 'users'), {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        role: EUserRole.User
      })
    } catch (error) {
      console.error('Error signing up:', error)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  const signOutUser = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, role, loading, signUp, signIn, signOutUser }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
