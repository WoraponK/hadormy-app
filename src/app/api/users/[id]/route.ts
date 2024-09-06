import { NextResponse } from 'next/server'
import { initAdmin, deleteUserById } from '@/lib/firebaseAdmin'
import { getUserById } from '@/collections/usersCollection'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await initAdmin()

    const user = await getUserById(params.id)

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    await deleteUserById(params.id)

    return NextResponse.json({ message: 'User deleted' })
  } catch (error) {
    console.error('Error in DELETE method:', error)
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 })
  }
}
