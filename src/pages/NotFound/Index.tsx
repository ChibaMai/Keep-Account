import React from 'react'
import { Route, Link } from 'react-router-dom'
import style from './index.module.less'

export default function NotFound() {
  return (
    <div className={style.NotFound}>
      <div className={style.panelMain}>
        {/* 404 内容 */}
        <div className={`${style.panelInverted} ${style.panelMainInner}`}>
          <div className={style.panelMainContent}>
            <Link to={'/'} title="返回首页">
              <img src="/src/assets/images/few.jpg" alt="home" />
            </Link>
            <h1>404 Not Found</h1>
            <hr className={style.panelCoverDivider}/>
            <div>对不起，您要找的页面被小萌丢失了，(＞人＜；)</div>
            <hr className={`${style.panelCoverDivider} ${style.panelCoverDividerSecondary}`}/>
            <div>欢迎来到我的个人世界!</div>
          </div>
        </div>
        {/* 背景图片 颜色 */}
        <div className={`${style.panelCoverOverlay} ${style.coverSlate}`}></div>
      </div>
    </div>
  )
}
