import React, { useState } from 'react'
import style from './index.module.less'
import { Select, Input, DatePicker, message, InputNumber } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { Button } from 'antd-mobile'
// 汉化 日期
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import httpObj from '@/request';

// 添加支出
export function AddSpending() {
  // 双向数据绑定 金额 分类 备注
  const [disabledInputValueClear, setDisabledInputValueClear] = useState(true)
  const [inputValueAmount, setInputValueAmount] = useState('')
  const [inputValueClassification, setInputValueClassification] = useState('🧻 日用')
  const [inputValueRemark, setInputRemark] = useState('')
  // 时间
  const date = new Date()
  const options = [];
  const data = ['🍚 吃饭', '🥤 零食', '👗 衣服', '📱 话费', '💻 数码', '🚗 交通', '🧻 日用', '💰 理财', '📖 学习', '💧 运动', '💊 生病', '🎁 礼物', '🔔 订阅']
  // 所以数据
  let AllSpendingData: any = {
    amount: inputValueAmount,
    classification: inputValueClassification,
    remark: inputValueRemark,
    time: '',
    month: '',
    year: '',
    genre: '1',
  }

  for (let i = 0; i < data.length; i++) {
    options.push({
      value: data[i],
      label: data[i],
    });
  }

  const onChange = {
    globalMessage: (type: any, duration: number, content: string, callback: any) => {
      message.open({
        type: type,
        duration: duration,
        content: content,
      }).then(callback)
    },
    Disable: (boolean: boolean) => {
      return setDisabledInputValueClear(boolean)
    },
    amount: (value: any) => {
      setInputValueAmount(value)
      onChange.Disable(false)
    },
    classification: (value: any) => {
      setInputValueClassification(value)
      onChange.Disable(false)
    },
    remark: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInputRemark(e.target.value)
      onChange.Disable(false)
    },
    time: (value: DatePickerProps['value'] | RangePickerProps['value'], dateString: any) => {
      AllSpendingData.time = dayjs(dateString).unix()
      AllSpendingData.year = dayjs().year()
      AllSpendingData.month = dayjs().month() + 1
      onChange.Disable(false)
    },
    submit: () => {
      for (const key in AllSpendingData) {
        if (!AllSpendingData[key]) {
          onChange.globalMessage('error', 0.9, `${key}不能为空`, () => {})
          return
        }
      }

      // /increase/addExpenditure?amount=100.00&month=1&year=2023&genre=1&classification=🍚%20吃饭&remark=今天吃火锅&time=1673313863047
      const url = `/increase/addExpenditure?amount=${AllSpendingData.amount}&month=${AllSpendingData.month}&year=${AllSpendingData.year}&genre=${AllSpendingData.genre}&classification=${AllSpendingData.classification}&remark=${AllSpendingData.remark}&time=${AllSpendingData.time}`

      httpObj.get(url).then(res => {
        if (res.status === 200) {
          onChange.Disable(true)
          onChange.globalMessage('success', 0.9, "添加成功", () => {
            onChange.clear()
          })
        }
      }).catch(error => {
        throw error
      })
    },
    clear: () => {
      setInputValueAmount('')
      setInputValueClassification('🧻 日用');
      setInputRemark('')
      onChange.globalMessage('success', 1.5, '数据清除成功', () => { })
    },
  }

  // 金额
  const inputAmount = (
    <>
      <span className={style.inputGroupSpan}>金额</span>
      <InputNumber
        type={'number'}
        step={'0.01'}
        size={'large'}
        placeholder="请输入金额"
        bordered={false}
        precision={2}
        value={inputValueAmount}
        style={{
          width: '100%'
        }}
        onChange={onChange.amount}
      />
    </>
  )
  // 分类
  const inputClassification = (
    <>
      <span className={style.inputGroupSpan}>分类</span>
      <Select
        size={'large'}
        placeholder="请选择分类 默认为空"
        style={{ width: '100%' }}
        options={options}
        value={inputValueClassification}
        bordered={false}
        onChange={onChange.classification}
      />
    </>
  )
  // 备注
  const inputRemark = (
    <>
      <span className={style.inputGroupSpan}>备注</span>
      <Input
        type='txt'
        placeholder='请输入支出信息'
        bordered={false}
        value={inputValueRemark}
        onChange={onChange.remark}
      />
    </>
  )
  // 时间
  const inputTime = (
    <>
      <span className={style.inputGroupSpan}>时间</span>
      <DatePicker
        allowClear={false}
        showTime
        format='YYYY-MM-DD HH:mm:ss'
        locale={locale}
        bordered={false}
        defaultValue={dayjs()}
        placeholder='请选择日期'
        size={'large'}
        style={{ width: '100%' }}
        onChange={onChange.time}
      />
    </>
  )
  // 提交
  const ExpenditureSubmission = (
    <div className={style.Button}>
      <Button
        block
        color='success'
        size='large'
        disabled={disabledInputValueClear}
        onClick={onChange.submit}
      >添加</Button>
      <Button
        block
        color='danger'
        size='large'
        disabled={disabledInputValueClear}
        style={{
          marginInlineStart: '20px',
          width: '40%',
        }}
        onClick={onChange.clear}
      >清除</Button>
    </div>
  )
  // 添加收入
  return (
    <div className={style.AddSpending}>
      <h1>添加支出</h1>
      <div className={style.inputNumber}>
        {inputAmount}
      </div>
      <div className={style.inputGroupClassify}>
        {inputClassification}
      </div>
      <div className={style.inputGroup}>
        {inputRemark}
      </div>
      <div className={style.inputGroupClassify}>
        {inputTime}
      </div>
      {ExpenditureSubmission}
    </div>
  )
}
