import React from 'react'

export default function ChapterPage({ params } : { params: { chapterId: string } }) {
  return (
    <div>ChapterPage: {params.chapterId}</div>
  )
}