"use client"
import Show_snap from '@/component/show_snap'
import React from 'react'
import { useParams } from 'next/navigation'
function page() {
  const params = useParams()
  return (
    <><Show_snap url={params.id}/>
    </>
  )
}

export default page