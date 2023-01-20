import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import style from './index.module.less'
import httpObj from '@/request'
import ChartsOptions from '../../service/ChartsOptions'
import { Stepper } from 'antd-mobile'

// income expenditure
const Charts: React.FC = () => {
  const [yearSelection, setYearSelection] = React.useState(2023)
  // 收入 支出
  const [barLineIncome, setBarLineIncome] = useState([])
  const [barLineExpenditure, setBarLineExpenditure] = useState([])

  // 数据
  const series = [
    // 柱状
    { name: '收入', type: 'bar', label: ChartsOptions.barLabel, data: barLineIncome, },
    { name: '支出', type: 'bar', label: ChartsOptions.barLabel, data: barLineExpenditure, },
    // 折线
    { name: '月收入', type: 'line', label: ChartsOptions.lineLabel, smooth: true, data: barLineIncome, },
    { name: '月支出', type: "line", label: ChartsOptions.lineLabel, smooth: true, data: barLineExpenditure, },
  ]

  // 获取数据
  useEffect(() => {
    echartsMonth(yearSelection)
  }, [])

  const echartsMonth = (value:any) => {
    httpObj.get(`/echartsMonth/${value}`).then((response) => {
      setBarLineIncome(response.income)
      setBarLineExpenditure(response.expenditure)
      console.log(response);
      
    }).catch(error => {
      throw error
    })
  }

  const options = {
    color: ChartsOptions.color,
    title: {
      text: `${yearSelection}年收入支出金额汇总`,
      top: 10,
      x: 'center'
    },
    grid: ChartsOptions.grid,
    legend: ChartsOptions.legend,
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '8月', '10月', '11月', '12月'],
    },
    yAxis: {
      type: 'value',
      name: '元',
      position: 'left',
      alignTicks: true,
      axisLine: {
        show: true,
      },
    },
    tooltip: ChartsOptions.tooltip,
    series: series,
  }

  return (
    <>
      <div className={style.title}>
        <Stepper
          value={yearSelection}
          inputReadOnly
          min={2023} step={1}
          style={{ width: '15%' }}
          onChange={value => {
            setYearSelection(value)
            echartsMonth(value)
          }}
        />
      </div>
      <div data-title="柱状图">
        <ReactECharts
          className={style.Charts}
          option={options}
          theme={`${window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'}`}
        />
      </div>
      <div className={style.MonthHistogram}>
      </div>
    </>
  )
}

export default Charts
