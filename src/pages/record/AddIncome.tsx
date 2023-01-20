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

// 添加收入
export function AddIncome() {
  const [disabledInputValueClear, setDisabledInputValueClear] = useState(true)
  const [inputValueAmount, setInputValueAmount] = useState('')
  const [inputValueClassification, setInputValueClassification] = useState('⭕️ 其它')
  const [inputValueRemark, setInputValueRemark] = useState('')
  const [time, setTime] = useState('')
  // 时间
  const date = new Date()
  // 类别
  const newOptions = []
  const Options = ['🏫 工资', '👩‍🏫 上课', '💰 理财', '🎬 视频', '🧧 红包', '⭕️ 其它']
  // 所以数据
  let AllIncomeData: any = {
    amount: inputValueAmount,
    classification: inputValueClassification,
    remark: inputValueRemark,
    time: '',
    month: '',
    year: '',
    genre: '0',
  }

  for (let i = 0; i < Options.length; i++) {
    newOptions.push({
      value: Options[i],
      label: Options[i],
    });
  }

  // 事件
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
      setInputValueRemark(e.target.value)
      onChange.Disable(false)
    },
    time: (value: DatePickerProps['value'] | RangePickerProps['value'], dateString: any) => {
      AllIncomeData.time = dayjs(dateString).unix()
      AllIncomeData.year = dayjs().year()
      AllIncomeData.month = dayjs().month() + 1
      onChange.Disable(false)
    },
    submit: () => {
      for (const key in AllIncomeData) {
        if (!AllIncomeData[key]) {
          onChange.globalMessage('error', 0.9, `${key}不能为空`, () => {})
          return
        }
      }

      // /increase/addIncome?amount=100.00&month=1&year=2023&genre=1&classification=🍚%20吃饭&remark=今天吃火锅&time=1673313863047
      let url = `/increase/addIncome?amount=${AllIncomeData.amount}&month=${AllIncomeData.month}&year=${AllIncomeData.year}&genre=${AllIncomeData.genre}&classification=${AllIncomeData.classification}&remark=${AllIncomeData.remark}&time=${AllIncomeData.time}`

      httpObj.get(url).then(res => {
        console.log(AllIncomeData);
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
      setInputValueClassification('⭕️ 其它')
      setInputValueRemark('')
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
        style={{
          width: '100%'
        }}
        value={inputValueAmount}
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
        options={newOptions}
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
  const IncomeSubmission = (
    <div className={style.Button}>
      <Button
        block
        color='danger'
        size='large'
        style={{
          marginInlineEnd: '20px',
          width: '40%',
        }}
        onClick={onChange.clear}
        disabled={disabledInputValueClear}
      >清除</Button>
      <Button
        block
        color='success'
        size='large'
        disabled={disabledInputValueClear}
        onClick={onChange.submit}
      >添加</Button>
    </div>
  );

  return (
    <div className={style.AddIncome}>
      <h1>添加收入</h1>
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
      {IncomeSubmission}
    </div>
  )
}
