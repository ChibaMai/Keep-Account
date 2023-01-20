import { TabBar } from 'antd-mobile'
import { Route, useNavigate } from 'react-router-dom'
import style from './tabBars.module.less'
import { BillOutline, PieOutline, UserOutline, AddSquareOutline } from 'antd-mobile-icons'
import { useState } from 'react'

export function TabBars() {
  const tabs = [
    {
      key: 'home',
      title: '账单',
      icon: <BillOutline />,
    },
    {
      key: 'count',
      title: '统计',
      icon: <PieOutline />,
    },
    {
      key: 'record',
      title: '记录',
      icon: <AddSquareOutline />,
    },
    {
      key: 'user',
      title: '我的',
      icon: <UserOutline />,
    },
  ]

  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState('home')
  const setRouteActive = (value: string) => {
    setActiveKey(value)
    //路由跳转
    navigate(value)
  }

  // 渲染组建路由
  return (
    <div className={style.TabBars}>
      <TabBar
        activeKey={activeKey}
        safeArea
        onChange={value => setRouteActive(value)}
      >
        {tabs.map(item => (
          <TabBar.Item
            key={item.key}
            icon={item.icon}
            title={item.title}
          />
        ))}
      </TabBar>
    </div>
  )
}
