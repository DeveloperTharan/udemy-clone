import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Udemy for Learning",
  description: "Udemy Course provider for your learning needs and goals",
};

export default function MainLayout({ children } : { children: React.ReactNode }) {
  return (
    <div className='w-full h-full min-h-full'>{children}</div>
  )
}