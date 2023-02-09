import React, { useState, useEffect } from 'react'
import style from './index.module.less'
// 组建
import { Header } from '@/components/Home/Header'
import { Collapse } from 'antd-mobile'
import httpObj from '@/request';
import { sleep } from './../../utils/demos-util'
import dayjs from 'dayjs'
import { message } from 'antd'
import { Statistics } from '@/components/Statistics/Statistics';

interface IState{
  result: any
}

export default function Home() {
  const [data, setData] = useState<IState>({ result: null })
  const [finished, setFinished] = useState(false)
  const [startMont, setStartMont] = useState(1)
  const [endMont, setEndMont] = useState(1)
  // 时间
  const nowDate = new Date();
  const MonthNum = [];
  const MonthCapital = ['大写月份', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']

  for(let i = startMont; i <= endMont; i++) {
    MonthNum.push(i)
    // 排序
    MonthNum.sort((x :number, y: number) => y-x )
  }

  useEffect(() => {
    // 初始不进行月份数据请求
    // RetrieveData()
    loadData()
    // 修改月份
    setEndMont(nowDate.getMonth() + 1)
  }, [])

  // 请求数据
  const RetrieveData = (item: any) => {
    // 查询年数据 需要传入参数年
    httpObj.get(`/MonthlyInquiryBill/${dayjs().year()}&${item}`).then((response) => {
      setData(response)
    }).catch((error) => {
      throw error
    })
  }

  const loadData = async () => {
    await sleep(1500)
    setFinished(true)
  }

  const theadTitle = (
    <thead>
      <tr> 
        <th style={{width: '10%'}}>分类</th>
        <th style={{width: '15%'}}>金额</th>
        <th style={{width: '16%'}}>支出 | 收入</th>
        <th style={{width: '17%'}}>时间</th>
        <th style={{width: '19%'}}>备注</th>
        <th style={{width: '14%'}}>操作</th>
      </tr>
    </thead>
  )

  const DynamicContent = (
    finished ? (
      <tbody>
        {data && Array.isArray(data.result) && data.result.map((item: any) => (
          <tr key={item.id} data-key={item.key}>
            <td>{item.category}</td>
            <td>{item.money}</td>
            {/* // 收入0 支出1 */}
            <td>{item.genre === 1 ? '支出' : '收入' }</td>
            <td>{dayjs.unix(item.time).format('YYYY-MM-DD HH:mm:ss')}</td>
            <td>{item.comment}</td>
            <td>修改 | <a data-key={item.id} onClick={(e) => {
              const cutover = confirm('确定删除吗?')
              
              if (!cutover) return
              
              httpObj.get(`/deleteAll/${item.time}&${item.genre}`).then((response) => {
                message.open({
                  type: 'success',
                  duration: 1,
                  content: '删除成功',
                })
                RetrieveData(item.month)
              }).catch(error => { throw error })
            }}>删除</a></td>
          </tr>
        ))}
      </tbody>
    ) : ''
  )

  return (
    <>
      <Statistics />
      {/* 总支出收入日期 */}
      {/* <Header /> */}
      <div className={style.Home}>
        <Collapse accordion>
          {/* <Collapse accordion> */}
          {MonthNum.map(item => (
            <Collapse.Panel
              key={`${item}`}
              data-item={`${item}月账单合集`}
              title={`${nowDate.getFullYear()}年 ${MonthCapital[item]}月账单`}
              onClick={()=>{
                RetrieveData(item)
              }}>
              <table>
                {theadTitle}
                {DynamicContent}
              </table>
            </Collapse.Panel>
          ))};
        </Collapse>
      </div>
    </>
  )
}
