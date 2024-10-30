import Book from '@/components/Home/Book'
import BooksDashboard from '@/components/Home/BooksDashboard'
import HomeNavbar from '@/components/Home/homeNavbar'
import React from 'react'


function page() {
  return (
    <>
    <HomeNavbar/>
    {/* <Book/> */}
    <BooksDashboard/>
    </>
  )
}

export default page