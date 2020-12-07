const formatTime = date =>{
  const year=date.getFullYear()
  const month=date.getMonth()+1
  const day =date.getDate()
  const hour=date.getHours()
  const minute=date.getMinutes()
  const second=date.getSeconds()

  return [year,month,day].map(formatNumber).join('/')+' '+[hour,minute,second].map(formatNumber).join(':')
}

const formatDate=date=>{
  const year =date.getFullYear()
  const month=date.getMonth()+1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber=n=>{
  n=n.toString()
  return n[1]?n:'0'+n
}

const formatTimeForHome = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()

  return [year].map(formatNumber).join('年') + '年' + [month].map(formatNumber).join('月') + '月' + [day].map(formatNumber).join('日') +'日' + ' '+[hour, minute].map(formatNumber).join(':')
}

module.exports = {
  formatTime: formatTime,
  formatDate:formatDate,
  formatTimeForHome: formatTimeForHome
}