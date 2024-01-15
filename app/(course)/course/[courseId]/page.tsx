import React from 'react'

export default function CoursePage({ params } : { params: { courseId: string } }) {
  return (
    <div>CoursePage: {params.courseId}</div>
  )
}