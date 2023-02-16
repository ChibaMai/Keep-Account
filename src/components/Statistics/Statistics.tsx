import httpObj from '@/request'
import { NoticeBar } from 'antd-mobile'
import { useEffect, useState } from 'react'
import style from './index.module.less'

export function Statistics() {
  const [monthly, setMonthly] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  // 月支出收入展示数据
  const [responseIncome, setResponseIncome] = useState([])
  const [responseExpenditure, setResponseExpenditure] = useState([])
  const [calculate, setCalculate] = useState([])
  // 月收入支出统计 总和
  const [monthExpenses, setMonthExpenses] = useState(0)
  const [monthIncome, setMonthIncome] = useState(0)
  // 年支出收入统计 总和
  const [incomeMoney, setIncomeMoney] = useState(0)
  const [expenditureMoney, setExpenditureMoney] = useState(0)
  const date = new Date()

  useEffect(() => {
    init()
    RetrieveData()
    Month((date.getMonth()) + 1)
  }, [])

  // 月支出收入 详细展示
  const init = () => {
    let income: Array<any> = [],
      expenditure: Array<any> = [],
      arrayCalculate: any = [];
    
    httpObj.get(`/echartsMonth/2023`).then((response) => {
      const response_income = response.income
      const response_expenditure = response.expenditure
      setResponseIncome(response.income)
      setResponseExpenditure(response.expenditure)

      for (let i = 0; i < response_income.length; i++) {
        income.push(response_income[i])
        expenditure.push(response_expenditure[i])
      }

      for (let i = 0; i < income.length; i++) {
        let sum = eval(String(income[i] - expenditure[i]))
        arrayCalculate.push(sum)
        setCalculate(arrayCalculate)
      }
    }).catch(error => {
      throw error
    })
  }

  // 年账单统计
  const RetrieveData = () => {
    httpObj.get(`/AnnualStatistics/${date.getFullYear()}`).then((response) => {
      setIncomeMoney(response.sumOfIncome)
      setExpenditureMoney(response.sumOfExpenses)
    }).catch(error => {
      throw error
    })
  }

  // 本月支出收入多少 月收入统计
  const Month = (month: number) => {
    // 查询年数据 需要传入参数年
    httpObj.get(`/MonthlyInquiryBill/${date.getFullYear()}&${month}`).then((response) => {
      setMonthExpenses(response.Expenses || 0)
      setMonthIncome(response.Income || 0)
    }).catch((error) => {
      throw error
    })
  }

  const StatisticsContent = (
    <table className={style.StatisticsContent}>
      <thead>
        <tr>
          <th style={{ width: '22%' }}>统计</th>
          <th style={{ width: '26%' }}>{`本日 - [${date.getDate()}号]`}</th>
          <th style={{ width: '26%' }}>{`${date.getMonth() + 1}月花销总和`}</th>
          <th style={{ width: '26%' }}>{`${date.getFullYear()}年花销总和`}</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ backgroundColor: 'rgba(221,81,76,.115)', color: '#dd514c' }}>
          <td>收入</td>
          <td>0</td>
          <td data-money={monthIncome}>{monthIncome}</td>
          <td data-money={incomeMoney}>{incomeMoney}</td>
        </tr>
        <tr style={{ backgroundColor: 'rgba(94,185,94,.115)', color: '#5eb95e' }}>
          <td>支出</td>
          <td>0</td>
          <td data-money={monthExpenses}>{monthExpenses}</td>
          <td data-money={expenditureMoney}>{expenditureMoney}</td>
        </tr>
      </tbody>
    </table>
  )

  const MonthlyStatistics = (
    <table className={style.MonthlyStatistics}>
      <thead>
        <tr>
          <th style={{ width: '7.6923076923076925%' }}>月统计</th>
          {monthly.map(((item, index) => (
            <th style={{ width: `${100 / 13}%` }} key={index}>{`${item}月`}</th>
          )))}
        </tr>
      </thead>
      <tbody>
        <tr style={{ backgroundColor: 'rgba(221,81,76,.115)', color: '#dd514c' }}>
          <td>收入</td>
          {responseIncome.map(((item, index) => (
            <td key={index} data-money={item}>{item === '-' ? '0' : item}</td>
          )))}
        </tr>
        <tr style={{ backgroundColor: 'rgba(94,185,94,.115)', color: '#5eb95e' }}>
          <td>支出</td>
          {responseExpenditure.map(((item, index) => (
            <td key={index} data-money={item}>{item === '-' ? '0' : item}</td>
          )))}
        </tr>
        <tr style={{ backgroundColor: 'rgba(14,144,210,.115)', color: '#0b76ac' }}>
          <td>余额</td>
          {calculate.map(((item, index) => (
            <td key={index} data-money={index}>{String(item) === 'NaN' ? '0' : item}</td>
          )))}
        </tr>
      </tbody>
    </table>
  )

  return (
    <>
      {/* closeable */}
      <NoticeBar content={`demo, 欢迎使用${date.getFullYear()}年则茶记账!`} color='alert' />
      {StatisticsContent}
      <NoticeBar content='月账单统计!' color='info' />
      {MonthlyStatistics}
    </>
  )
}
