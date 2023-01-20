import React from 'react'
import style from './backgroundLayer.module.less'

export function BackgroundLayer() {
  return (
    <div className={`bg ${style.BackgroundLayer}`}>
      <div className={`${style.panelCoverOverlay} ${style.coverSlate}`}></div>
    </div>
  )
}