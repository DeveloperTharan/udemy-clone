import React from 'react'

export default function CategoryPage({ params } : { params: { categoryId: string } }) {
  return (
    <div className='w-full h-auto min-h-screen'>CategoryPage: {params.categoryId}</div>
  )
}