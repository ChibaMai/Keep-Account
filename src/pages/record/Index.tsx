import React, { useRef, useState } from 'react'
import { Tabs, Swiper } from 'antd-mobile'
import style from './index.module.less'
import { SwiperRef } from 'antd-mobile/es/components/swiper'
import { AddSpending } from './AddSpending'
import { AddIncome } from './AddIncome'

export default function Record() {
  const swiperRef = useRef<SwiperRef>(null)
  // 标签开关 首次 (n)
  const [activeIndex, setActiveIndex] = useState(0)

  const tabItems = [
    { key: 'fruits', title: '支出' },
    { key: 'animals', title: '收入' },
  ]

  return (
    <div className={style.Record}>
      <Tabs
        activeKey={tabItems[activeIndex].key}
        onChange={key => {
          const index = tabItems.findIndex(item => item.key === key)
          setActiveIndex(index)
          swiperRef.current?.swipeTo(index)
        }}>
        {tabItems.map(item => (
          <Tabs.Tab title={item.title} key={item.key} />
        ))}
      </Tabs>
      <Swiper
        direction='horizontal'
        indicator={() => null}
        allowTouchMove={false}
        ref={swiperRef}
        defaultIndex={activeIndex}
        onIndexChange={index => {
          setActiveIndex(index)
        }}>
        <Swiper.Item className={style.content}>
          {/* 添加支出 */}
          <AddSpending />
        </Swiper.Item>
        <Swiper.Item className={style.content}>
          {/* 添加收入 */}
          <AddIncome />
        </Swiper.Item>
      </Swiper>
    </div>
  )
}
