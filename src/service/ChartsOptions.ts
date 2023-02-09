// Charts 柱状 折线图 月总结
const ChartsOptions = {
  color: ['#3ba272', '#fe0066', '#f8a35b', '#eeaaee'],
  color1: ['#4962FC', '#4B7CF3', '#dd3ee5', '#12e78c', '#fe8104', '#01C2F9', '#F4CB29', '#FD9E06'],

  grid: {
    left: '3%',
    right: '4%',
    bottom: '12%',
    containLabel: true
  },

  tooltip: {
    trigger: 'axis',
    borderWidth: 0,
    backgroundColor: 'rgba(111, 111, 111, .65)',
    textStyle: {
      color: '#fff',
    },
    axisPointer: {
      type: 'shadow',
    },
  },

  legend: {
    bottom: 15,
    x: 'center',
    itemGap: 35,
    itemWidth: 40,
    data: ['收入', '支出', '月收入', '月支出'],
    selected: {
      '月收入': false,
      '月支出': false
    }
  },

  barLabel: {
    show: true,
    rotate: 270,
    formatter: '{c} {a}',
    fontSize: 12,
  },

  lineLabel: {
    show: true,
    position: 'top',
    itemStyle: {
      fontSize: 20
    }
  },
}

export default ChartsOptions
