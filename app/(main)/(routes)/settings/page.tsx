import React from 'react'
import { Settings } from './_components/settings'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
  const { userId } = auth();

  if(!userId) redirect('/main')

  const userData = await db.user.findUnique({
    where: { userId },
  })

  return (
    <div className='w-full h-auto min-h-screen px-20 lg:px-32 py-10'>
        <Settings initialData={userData} />
    </div>
  )
}