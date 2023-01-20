import React from 'react'
import { TabBars } from '@/components/TabBar/TabBars'
import { Outlet } from 'react-router-dom'
import { BackgroundLayer } from '@/components/BackgroundLayer/backgroundLayer'

export default function Index() {
  return (
    <>
      {/* <BackgroundLayer /> */}
      <div className='content'>
        <Outlet />
      </div>
      <TabBars />
    </>
  )
}
