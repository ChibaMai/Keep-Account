import React, { useEffect, useState } from 'react'
import style from './index.module.less'
import { Avatar, Switch } from 'antd-mobile'
import classnames from 'classnames'

export default function User() {
  // 个性签名
  const [signature, SetSignature] = useState('')
  // 昵称
  const [nickName, setNickName] = useState('则茶')
  // 是否自定义昵称开关
  const [nickNameSwitch, setNickNameSwitch] = useState(false)
  const [themeChecked, setThemeChecked] = useState(false)

  const AvatarImages = [
    '/src/assets/avatar/IMG_1561.JPG',
    '/src/assets/avatar/IMG_2012.JPG',
    '/src/assets/avatar/NTIzMjkwMTM1NDk3NjM0NjQ4NF8xNjM3MzQ4Mjg5NDgz_22.jpg',
  ]

  useEffect(() => {
    // 个性签名  ☘️个性签名没有
    const temporaryPersonalSignature = localStorage.getItem('personalSignature')

    if (temporaryPersonalSignature) {
      SetSignature(temporaryPersonalSignature)
    } else {
      // 为空则执行这个
      localStorage.setItem('personalSignature', signature)
    }
  }, [])

  const darkMode = (val: any, id: number) => {
    if (id !== 1) return 

    // 获取 data-prefers-color-scheme 值
    const theme = document.documentElement.getAttribute('data-prefers-color-scheme')

    if (theme === 'light') {
      document.documentElement.setAttribute('data-prefers-color-scheme', 'dark')
      setThemeChecked(true)
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-prefers-color-scheme', 'light')
      setThemeChecked(false)
      localStorage.setItem('theme', 'light')
    }
  }

  const dark = (val: any, id: number) => {
    console.log(id);
  }

  const listOfSettings = [
    { id: 1, title: "主题切换", checked: false, switch: dark },
    { id: 2, title: "主题切换2", checked: false, switch: dark },
    { id: 3, title: "主题切换3", checked: false, switch: dark },
  ]

  // 账户
  const Account = (
    <div className={style.Account}>
      <Avatar src={AvatarImages[0]} style={{ '--size': '76px' }} />
      <div className={style.UserInfo}>
        <div className={style.name}>{nickName}</div>
        <div className={style.Signature}>
          <div
            style={{ display: 'none' }}
            title={signature}
            className={style.SpaceInput}
          >
            {signature}
          </div>
          <input
            type="text"
            id="h-sign"
            placeholder='☘️ 编辑个性签名 ☘️'
            className={style.SpaceInput}
            // title={signature}
            maxLength={60}
            defaultValue={signature}
            onBlur={val => {
              SetSignature(val.target.value)
              localStorage.setItem('personalSignature', val.target.value)
            }}
          />
        </div>
      </div>
    </div>
  )

  // 修改昵称
  const ChangeUsername = (
    <div className={style.SettingsItem}>
      <div>昵称修改</div>
      <div>
        <input
          type="text"
          id="nickName"
          // style.nickName, style.SpaceInput
          className={classnames(style.nickName)}
          placeholder="请输入新的昵称"
          defaultValue={nickName}
          maxLength={10}
          disabled={!nickNameSwitch}
          onChange={val => {
            if (!val.target.value) {
              setNickName('则茶')
              return
            }
            setNickName(val.target.value)
          }}
          onBlur={val => {
            if (!val.target.value) {
              val.target.defaultValue = val.target.value = nickName
            }
          }}
        />
      </div>
      <Switch
        style={{
          '--checked-color': '#248a3c',
          '--height': '30px',
          '--width': '60px',
        }}
        defaultChecked={nickNameSwitch}
        onChange={val => {
          if (val) {
            setNickNameSwitch(true)
            return
          }
          setNickNameSwitch(false)
        }}
      />
    </div>
  )

  // settings 系统设置
  const Settings = (
    <div className={style.Settings}>
      {/* 修改昵称 */}
      {ChangeUsername}
      {/*  */}
      {listOfSettings.map((item) => (
        <div className={style.SettingsItem} key={item.id} data-id={item.id}>
          <div data-title={item.title}>{item.title}</div>
          <div data-id={item.id} data-switch={item.checked}>
            <Switch
              style={{
                '--checked-color': '#248a3c',
                '--height': '30px',
                '--width': '60px',
              }}
              // checked={item.checked}
              onChange={val => { item.switch(val, item.id) }}
            />
          </div>
        </div>
      ))}
      <div className={style.SettingsItem} >
        <div>item.title</div>
        <div>switch</div>
      </div>
    </div>
  )

  return (
    <div className={style.User}>
      {/* 头像 */}
      {Account}
      {/* 系统设置 */}
      {Settings}
    </div>
  )
}
