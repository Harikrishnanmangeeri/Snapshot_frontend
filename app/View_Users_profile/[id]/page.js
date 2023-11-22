'use client'
import ShowUserprofile from '@/component/viewUsersProfile'
import { useParams } from 'next/navigation'
import React from 'react'

function page() {
  const params = useParams()
  console.log(params);
  return (
    <><ShowUserprofile userprofile={params.id}/></>
  )
}

export default page