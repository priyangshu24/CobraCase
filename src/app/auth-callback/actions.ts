'use server'

import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export const getAuthStatus = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user?.id || !user.email) {
    throw new Error('Invalid user data')
  }

  console.log('Retrieved user:', user)

  const existingUser = await db.user.findFirst({
    where: { id: user.id },
  })

  if (!existingUser) {
    const newUser = await db.user.create({
      data: {
        id: user.id,
        email: user.email,
      },
    })
    console.log('Created new user:', newUser)
  } else {
    console.log('User already exists:', existingUser)
  }

  return { success: true }
}