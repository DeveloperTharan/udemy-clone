import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function ChapterPage({ params } : { params: { courseId: string ,chapterId: string } }) {
  return (
    <div className="w-full h-auto min-h-screen flex flex-col gapy-y-2 mt-5">
      <Link
        href={`/course/${params.courseId}`}
        className="flex items-center text-sm hover:opacity-75 transition mb-6 ml-10"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>{params.chapterId}
    </div>
  )
}