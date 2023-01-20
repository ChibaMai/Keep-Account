import React, { useCallback, useEffect, useRef, useState } from 'react'
import style from './index.module.less'
import { Button, DatePicker, Popup } from 'antd-mobile'
import httpObj from '@/request';

export function Header() {
  const date = new Date();
  const [visibleType, setVisibleType] = useState(false)
  // 显示关闭按钮
  //当前选择的类型key
  const [currentKey, setCurrentKey] = useState(100)
  //当前选中类型文字
  const [currentTypeText, setCurrentTypeText] = useState<string>('全部类型')
  //点击选中类型时
  const handleActiveItem = (e: React.MouseEvent<HTMLDivElement>) => {
    // 设置当前选中的类型key
    setCurrentKey(Number(e.currentTarget.dataset.key))
    //设置当前选中类型文字
    setCurrentTypeText(e.currentTarget.innerText)
  }
  // 时间选择器
  const [visibleDate, setVisibleDate] = useState(false)
  // 当前选中的日期
  const [pickerValue, setPickerValue] = useState<string | null>(`${date.getFullYear()}年`)
  // 获取年总额
  const [incomeMoney, setIncomeMoney] = useState(0)
  const [expenditureMoney, setExpenditureMoney] = useState(0)
  
  // 获取年总额
  useEffect(() => {
    httpObj.get(`/AnnualStatistics/${date.getFullYear()}`).then((response) => {
      setIncomeMoney(response.sumOfIncome)
      setExpenditureMoney(response.sumOfExpenses)
    }).catch(error => {
      throw error
    })
  }, [])

  // 支出收入类型 数据
  const menuList = [
    {
      key: 1,
      type: '支出',
      list: [
        { key: 1, title: '餐饮', },
        { key: 2, title: '服饰', },
        { key: 3, title: '出行', },
        { key: 4, title: '旅游', },
        { key: 5, title: '礼物', },
        { key: 6, title: '人情', },
      ],
    },
    {
      key: 2,
      type: '收入',
      list: [
        { key: 7, title: '工资', },
        { key: 8, title: '视频', },
      ],
    }
  ]

  // 收入支出渲染 IncomeAnd  ExpensesRendering
  const IncomeAndExpensesRendering = (
    <div className={style.TotalRevenue}>
      {/* 收入 */}
      <div className={style.income}>
        <span className={style.subText}>{pickerValue}收入: </span>
        <span className={style.money}>￥{incomeMoney}</span>
      </div>
      {/* 支出 */}
      <div className={style.expenditure}>
        <span className={style.subText}>{pickerValue}支出: </span>
        <span className={style.money}>￥{expenditureMoney}</span>
      </div>
    </div>
  )

  // 类型选择 TypeSelection
  const TypeSelection = (
    <Popup
      visible={visibleType}
      showCloseButton
      bodyStyle={{
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
      }}
      onMaskClick={() => {
        setVisibleType(false)
      }}
      onClose={() => {
        setVisibleType(false)
      }}>
      <div className={style.TypeSelection}>
        <div className={style.PopTitle}>请选择类型</div>
        <div className={style.PopContent}>
          <div className={style.AllType}>
            <Button
              fill="solid"
              size='mini'
              color='primary'
              onClick={() => {
                setCurrentTypeText('全部类型')
              }}
            >全部类型</Button>
          </div>
          {/* 支出 */}
          {menuList.map(item => (
            <div className={style.ExpenditureContent} key={item.key}>
              <h3>{item.type}</h3>
              <div className={style.ExpenditureList}>
                {item.list.map(itemList => (
                  <div
                    className={`${style.ListItem} ${currentKey === itemList.key ? style.ActiveCurrent : ''}`}
                    key={itemList.key}
                    data-key={itemList.key}
                    onClick={handleActiveItem}
                  >{itemList.title}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Popup>
  )

  return (
    // 总支出收入日期
    <div className={style.header}>
      {/* 总收入 */}
      {IncomeAndExpensesRendering}
      {/* 选择 */}
      <div className={style.choose}>
        <Button
          fill='solid'
          color='success'
          size='middle'
          onClick={() => {
            setVisibleType(true)
          }}
        >{currentTypeText}</Button>
        {/* 类型选择 */}
        {TypeSelection}
        {/*  */}
        {/* 日期 */}
        <Button
          fill='solid'
          color='success'
          size='middle'
          onClick={() => {
            setVisibleDate(true)
          }}
        >{pickerValue}</Button>
        <DatePicker
          precision='year'
          mouseWheel={true}
          visible={visibleDate}
          onClose={() => {
            setVisibleDate(false)
          }}
          onConfirm={val => {
            setPickerValue(`${val.getFullYear()}年`)
          }}
        />
      </div>
    </div>
  )
}
