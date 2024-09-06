import { NextResponse } from 'next/server'
import { initAdmin } from '@/lib/firebaseAdmin'
import { deleteAnnouce } from '@/collections/announcementCollection'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await initAdmin()

    const deleteAfter = 30 * 60 * 1000 // 30 minutes in milliseconds

    setTimeout(async () => {
      try {
        await deleteAnnouce(params.id)
      } catch (error) {
        console.error(`Error deleting user ${params.id}:`, error)
      }
    }, deleteAfter)

    return NextResponse.json({ message: `User ${params.id} will be deleted after 30 minutes.` })
  } catch (error) {
    console.error('Error in DELETE method:', error)
    return NextResponse.json({ error: 'Error scheduling user deletion' }, { status: 500 })
  }
}
