const Mock = require('mockjs')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({
  extended: false
})) 
const fs = require('fs')
const path = require('path')
const cors = require('cors');
app.use(cors());
const dayjs = require('dayjs')
const {
  token,
  validToken
} = require('./login')
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });
let users = [{
  tellEmail: '15102029183',
  pass: 'Aa123456'
},
{
  tellEmail: '501987849@qq.com',
  pass: 'Aa123456'
},
{
  tellEmail: 'admin',
  pass: 'admin'
}]
app.post('/user/login', (request, response) => {
  let obj = JSON.parse(Object.keys(request.body)[0])
  let flag = users.some(item => {
    return item.tellEmail === obj.tellEmail && item.pass === obj.pass
  })
  // 如果账号密码对，返回一个token
  // 检查有没有token
  console.log(request.headers)
  console.log(request.headers.token)
  console.log(request.body)
  if (flag) {
    if ('token' in request.headers && request.headers.token !== 'undefined') {
      validToken(request.headers.token)
      console.log(11)
      response.send({token: request.headers.token, name: obj.tellEmail})
    } else {
      console.log(123)
      let jwt = token(obj.tellEmail)
      console.log('是我', jwt)
      // let newObj = {
      //   token: token1,
      //   userInfo: validToken(token1)
      // }
      response.send(jwt)
    }
    // token(obj.tellEmail)

    // if()
  } else {
    response.send(false)
  }
  console.log(obj)
})
let subjectArr = [
  'Python编程（第2版） : 从入门到实践',
  '编码 : 隐匿在计算机软硬件背后的语言',
  '黑客与画家 : 硅谷创业之父Paul Graham文集',
  '程序员修炼之道（第2版） : 通向务实的最高境界',
  '代码整洁之道',
  '计算机程序的构造和解释(原书第2版)',
  '网络是怎样连接的',
  '计算机程序的构造和解释(原书第2版)',
  '重构 : 改善既有代码的设计',
  '程序员的自我修养 : 链接、装载与库',
  '退稿图书馆',
  '长安未远',
  '数星星的夜',
  '《年华是无效信》',
  '《长相思》',
  '《倾世皇妃》',
  '《人生若只如初见》',
  '《最后一只猫》',
  '《盛开的青春》',
  '《草样年华》',
  '《欢喜城》',
  '《私.时间的玫瑰》',
  '《畅销的秘密》',
  '《比时间更短 比爱情更长》',
  '《深海夜未眠》',
  '《南极姑娘》',
  '《夏梦狂诗曲》',
  '《我与世界只差一个你》',
  '《我的黑色小礼服》',
  '《配婚令》',
  '《你和梦想必须一起活下去》',
  '《格格不入》',
  '《时间的女儿》',
  '《跪求一腔热血》',
  '《四月间事》',
  '《跪求一腔热血》',
  '《陪安东尼度过漫长岁月》',
  '《无梦之境》',
  '《灵魂舞会之征服女王心》',
  '《暖暖》',
  '《许你来生》',
  '《晨昏》',
  '《深夜食堂》',
  '《东霓》',
  '《全世界只有我看得见你》',
  '《少女病》',
  '《站住！我们恋爱吧》',
  '《双生》', ,
  '《当时明月在》',
  '《爱在蔓延中》',
  '《壁花小姐奇遇记》',
  '《乱凡间》',
  '《追爱症候群》',
  '《传诵之风》',
  '《四重音》',
  '《微微一笑很倾城》',
  '《又颜传》',
  '《十夜纪》',
  '《鲸鱼女孩 池塘男孩》',
  '《锦葵》',
  '《射日》',
  '《寻爱天使》',
  '《她的城》',
  '《杉杉来吃》',
  '《爱情是个懒东西》',
  '《阁楼上的青春》',
  '《电波女与青春男》',
  '《诠释爱》',
  '《剩者为王》',
  '《奇诺之旅》',
  '《任凭这空虚沸腾》',
  '《护花铃》',
  '《听雪楼》',
  '《这一天,给你的歌》',
  '《最美遇见你》',
  '《岁月是朵两生花》',
  '《谁的等待.恰逢花开》',
  '《蔷薇之名》',
  '《沉香雪》',
  '《我不喜欢这世界:我只喜欢你》',
  '《长痛长爱》',
  '《只想和你好好的》',
  '《芍药客栈》',
  '《宫花红》',
  '《属于我们最好的时光》',
  '《为了你.我愿意热爱整个世界》',
  '《将门嫡女之定乾坤》',
  '《大地之灯》',
  '《四幕戏》',
  '《愿你迷路到我身旁》',
  '《这些都是你给我的爱》',
  '《世界很大.我只爱你》',
  '《佳期如梦》',
  '《楚楚很动人》',
  '《租来的房子》',
  '《灵魂舞会之谜爱四百年》',
  '《我站在桥上看风景》',
  '《千面天使》',
  '《捕萤集》',
  '《除了爱,我们什么都不会》',
  '《如失如来》',
  '《蚀心者》',
  '《良辰讵可待》',
  '《匪我思存》',
  '《护花玲》',
  '《不辞冰雪为卿热》',
  '《花火》',
  '《醉绯红》',
  '《陌上云暮迟迟归》',
]
let authorArr = [
  '俞甲子',
  '石凡',
  '潘爱民',
  'Randal E.Bryant',
  'Éva Tardos',
  'Paul E.Mckenney',
  '史蒂夫·迈克康奈尔',
  'Martin Fowler',
  '韩磊',
  'David Thomas',
  '人笑眼无珠',
  '深夜老流氓',
  '肆歌',
  '悦千帆',
  '石鋭',
  '西风渐',
  '九黎猫',
  '薯条盒子',
  '木拓',
  '夜幕无常',
  '林若惜',
  '凤无',
  '一念堕轮',
  '枫叶秋魂',
  '星辰允浩',
  '木艮方',
  '汤木舟',
  '忤臬',
  '尖椒毛豆',
  '冰冷指尖',
  '炎諾歆',
  '雪紫婷嫣',
  '沫沫紫烟',
  '木木大大',
  '锡城萧大',
  '慧米',
  '友友他姓刘',
  '嗜血小精灵',
  '戎诗人',
  '苍怨',
  '魑魅魍魉',
  '华轩',
  '落笔重拾',
  '老师不老',
  '坠落星涯',
  '心三毛',
  '孤月空明',
  '小花花',
  '流窜做客',
  '月色雪色',
  '真隆道',
  '紫色苍鹭',
  '尘絮',
  '哎呀哎呀哎呀',
  '紫色激情',
  '伍卡史魄',
  '落焱',
  '爱幻想的天空',
  '荒月先生',
  '海神之子',
  '终南嗨',
  '末世孤策',
  '癫人李不语',
  '云踪漫步',
  '杏辰',
  '知诃',
  '蛋糕牛奶面包',
  '十善人',
  '大窝头',
  '志在培风',
  '江南竹笋',
  '亿万少女的梦',
  '悠羽幽',
  '冯强不老',
  '杀意已决',
  'K2黑豹',
  '纤月闻劫',
  '天上掉的鱼',
  '梵鳟修',
  '默一',
  '左鬼右怪',
  '誠非凡',
  '钻石大神',
  '霁风皓月',
  '望如松',
  '十三笔R',
  '你听吾道',
  'SHR心澜',
  '舞青阳',
  '吃了猫的老鼠',
  '梦幻惜缘',
  '贪吃的汤勺',
  '李杠杆',
  '慎怀',
  '思乡梧桐',
  '星尘客',
  '谷雨',
  '笙歌泣',
  '欢盈',
  '听云煮雨',
  '战鼓书',
  '乱步',
  '我是吕三少',
  '空竹柚子',
  '魔僧妖姑',
  '春一木',
  '轩辕圣',
  '无名的赌侠',
  '不正羊',
  '彩笔的朋友',
  '轩酒',
  '病罪根源',
  '临娘',
  '孤独的人物',
  '萧灵溪',
  '憋不住',
  '王竹灵',
  '桌子椅子',
  '夜小丑',
  '想变异的穷人',
  '昆仑马大爷',
  '贪财好色',

]

let publisHouseArr = [
  '华北出版社',
  '华南出版社',
  '机械工业出版社',
  '人民邮电出版社',
  '电子工业出版社'
]
// let data = Mock.mock({
//   'subject|1': subjectArr,
//   'author|1': authorArr,
//   'publisHouse|1': publisHouseArr,
//   'type|1': ['期刊[J]', '专著[M]', '网上期刊[J/OL]'],
//   'barcode|1': /[0-9]{10}/,
//   'recommendNumber|1': /[0-9]{4}/,
//   'ourRatings|1': /[0-9]{3}/,
//   'recommendStatus|1': '待处理'
// })

function ramdom() {
  return 1000 + Math.floor((Math.random() * 10)) * 100
}

function repeatData1(len, status) {
  let arr = []
  for (let i = 0; i < len; i++) {
    arr.push(Mock.mock({
      'subject|1': subjectArr,
      'author|1': authorArr,
      'publisHouse|1': publisHouseArr,
      'type|1': ['期刊[J]', '专著[M]', '网上期刊[J/OL]'],
      'barcode|1': /[0-9]{10}/,
      'recommendNumber|1': /[0-9]{2}/,
      'ourRatings|1': /[0-9]{1}\.[0-9]{1}/,
      'recommendStatus|1': [status, '已处理']
    }))
  }
  return arr
}

function repeatData2(len, status) {
  let arr = []
  for (let i = 0; i < len; i++) {
    arr.push(Mock.mock({
      'subject|1': subjectArr,
      'author|1': authorArr,
      'publisHouse|1': publisHouseArr,
      'type|1': ['期刊[J]', '专著[M]', '网上期刊[J/OL]'],
      'barcode|1': /[0-9]{10}/,
      'recommendNumber|1': /[0-9]{2}/,
      'ourRatings|1': /[0-9]{1}\.[0-9]{1}/,
      'recommendStatus|1': [status, '已处理']
    }))
  }
  return arr
}

function repeatData3(len, status) {
  let arr = []
  for (let i = 0; i < len; i++) {
    arr.push(Mock.mock({
      'subject|1': subjectArr,
      'author|1': authorArr,
      'publisHouse|1': publisHouseArr,
      'type|1': ['期刊[J]', '专著[M]', '网上期刊[J/OL]'],
      'barcode|1': /[0-9]{10}/,
      'recommendNumber|1': /[0-9]{2}/,
      'ourRatings|1': /[0-9]{1}\.[0-9]{1}/,
      'recommendStatus|1': [status, '已处理']
    }))
  }
  return arr
}

function repeatData4(len, status) {
  let arr = []
  for (let i = 0; i < len; i++) {
    arr.push(Mock.mock({
      'subject|1': subjectArr,
      'author|1': authorArr,
      'publisHouse|1': publisHouseArr,
      'type|1': ['期刊[J]', '专著[M]', '网上期刊[J/OL]'],
      'barcode|1': /[0-9]{10}/,
      'recommendNumber|1': /[0-9]{2}/,
      'ourRatings|1': /[0-9]{1}\.[0-9]{1}/,
      'recommendStatus|1': status
    }))
  }
  return arr
}
let total = ramdom();






// let recommendSuccess = {
//   total: total - 1000,
//   data: repeatData(20, '已处理')
// }

let num = function () {
  return Math.floor((Math.random() * 10))
}

// console.log(JSON.stringify(recommend.data.length, null, 4))

for (let i = 0; i < total / 20; i++) {
  app.get(`/api/recommend&type=total&page=${i}`, (req, res) => {
    // console.log(req.path)
    if (/[0-9]+/.test(req.path)) {
      // console.log(11)
      let recommend = {
        total: total,
        data: repeatData1(total, '待处理')
      }
      res.send(recommend)
    }
  })
}
for (let i = 0; i < total / 20; i++) {
  app.get(`/api/recommend&type=reader&page=${i}`, (req, res) => {
    // console.log(req.path)
    if (/[0-9]+/.test(req.path)) {
      // console.log(11)
      let readerRecommend = {
        total: total * 0.4,
        data: repeatData2(total * 0.4, '待处理')
      }
      res.send(readerRecommend)
    }
  })
}
for (let i = 0; i < total / 20; i++) {
  app.get(`/api/recommend&type=pingtai&page=${i}`, (req, res) => {
    // console.log(req.path)
    if (/[0-9]+/.test(req.path)) {
      // console.log(11)
      let pingtaiRecommend = {
        total: total * 0.6,
        data: repeatData3(total * 0.6, '待处理')
      }
      res.send(pingtaiRecommend)
    }
  })
}
for (let i = 0; i < total / 20; i++) {
  app.get(`/api/recommend&type=success&page=${i}`, (req, res) => {
    // console.log(req.path)
    if (/[0-9]+/.test(req.path)) {
      // console.log(11)
      let recommendSuccess = {
        total: total * 0.3,
        data: repeatData4(total * 0.3, '已处理')
      }
      res.send(recommendSuccess)
    }
  })
}


// 图书采购
function tushucaigou(len, status) {
  let arr = []
  for (let i = 0; i < len; i++) {
    arr.push(Mock.mock({
      'subject|1': subjectArr,
      'author|1': authorArr,
      'publisHouse|1': publisHouseArr,
      'type|1': ['期刊[J]', '专著[M]', '网上期刊[J/OL]'],
      'barcode|1': /[0-9]{10}/,
      'recommendNumber|1': /[0-9]{2}/,
      'ourRatings|1': /[0-9]{1}\.[0-9]{1}/,
      'caigouzhuangtai|1': status,
      'price|1': /￥[0-9]{2}\.[0-9]{1}/
    }))
  }
  return arr
}

for (let i = 0; i < total / 20; i++) {
  app.get(`/api/recommend/caigou&type=total&page=${i}`, (req, res) => {
    // console.log(req.path)
    if (/[0-9]+/.test(req.path)) {
      // console.log(11)
      let recommendSuccess = {
        total: total,
        data: tushucaigou(total, ['待审核', '审核通过', '到库'])
      }
      res.send(recommendSuccess)
    }
  })
  app.get(`/api/recommend/caigou&type=daishenhe&page=${i}`, (req, res) => {
    // console.log(req.path)
    if (/[0-9]+/.test(req.path)) {
      // console.log(11)
      let recommendSuccess = {
        total: total * 0.4,
        data: tushucaigou(total * 0.4, '待审核')
      }
      res.send(recommendSuccess)
    }
  })
  app.get(`/api/recommend/caigou&type=shenhetongguo&page=${i}`, (req, res) => {
    // console.log(req.path)
    if (/[0-9]+/.test(req.path)) {
      // console.log(11)
      let recommendSuccess = {
        total: total * 0.6,
        data: tushucaigou(total * 0.6, '审核通过')
      }
      res.send(recommendSuccess)
    }
  })
  app.get(`/api/recommend/caigou&type=daoku&page=${i}`, (req, res) => {
    // console.log(req.path)
    if (/[0-9]+/.test(req.path)) {
      // console.log(11)
      let recommendSuccess = {
        total: total * 0.3,
        data: tushucaigou(total * 0.3, '到库')
      }
      res.send(recommendSuccess)
    }
  })
}

// 期刊
function qikan(len, status) {
  let arr = []
  for (let i = 0; i < len; i++) {
    arr.push(Mock.mock({
      'subject|1': subjectArr,
      'publisHouse|1': publisHouseArr,
      'type|1': ['社科类', '经济类', '文学类'],
      'barcode|1': /[0-9]{10}/,
      'dangqianqishu|1': /[0-9]{3}/,
      'dingyuezongqishu|1': /[0-9]{3}-[0-9]{3}/,
      'dingyuedaoqishijian|1': dayjs().format('YYYY-MM-DD'),
      'duzhepingjia|1': /[0-9]{2}/,
      'tuijianzhishu|1': /[0-9]{1}\.[0-9]{1}/,
      // 'recommendStatus|1': [status, '已处理']
    }))
  }
  return arr
}

app.get('/api/qikan', (req, res) => {
  const obj = {
    total: total,
    data: qikan(total, '---')
  }
  res.send(obj)
})
app.get('/api/qikan/jijiangdaoqi', (req, res) => {
  const obj = {
    total: total * 0.4,
    data: qikan(total * 0.4, '---')
  }
  res.send(obj)
})

// 借阅管理
function jieyueguanli(len, status) {
  let arr = []
  for (let i = 0; i < len; i++) {
    arr.push(Mock.mock({
      'subject|1': subjectArr,
      'author|1': authorArr,
      'publisHouse|1': publisHouseArr,
      'type|1': ['社科类', '经济类', '文学类'],
      'barcode|1': /[0-9]{10}/,
      'loanTime|1': dayjs().format('YYYY-MM-DD'),
      'loanReader|1': authorArr,
      'notifyStatus|1': ['已通知', '通知失败'],
      // 'recommendStatus|1': [status, '已处理']
    }))
  }
  return arr
}

app.get('/api/manage/jiechu', (req, res) => {
  const obj = {
    total: total,
    data: jieyueguanli(total, '---')
  }
  res.send(obj)
})
app.get('/api/manage/jiechu7', (req, res) => {
  const obj = {
    total: total * 0.5,
    data: jieyueguanli(total * 0.5, '---')
  }
  res.send(obj)
})
app.get('/api/manage/jiechu15', (req, res) => {
  const obj = {
    total: total * 0.6,
    data: jieyueguanli(total * 0.6, '---')
  }
  res.send(obj)
})

// 逾期
app.get('/api/manage/yuqi', (req, res) => {
  const obj = {
    total: total,
    data: jieyueguanli(total, '---')
  }
  res.send(obj)
})
app.get('/api/manage/yuqi7', (req, res) => {
  const obj = {
    total: total * 0.4,
    data: jieyueguanli(total * 0.4, '---')
  }
  res.send(obj)
})
app.get('/api/manage/yuqi30', (req, res) => {
  const obj = {
    total: total * 0.6,
    data: jieyueguanli(total * 0.6, '---')
  }
  res.send(obj)
})
app.get('/api/manage/diushi', (req, res) => {
  const obj = {
    total: total - total * 0.8,
    data: jieyueguanli(total - total * 0.8, '---')
  }
  res.send(obj)
})

// 预约图书
function yuyuetushu(len, status) {
  let arr = []
  for (let i = 0; i < len; i++) {
    arr.push(Mock.mock({
      'subject|1': subjectArr,
      'author|1': authorArr,
      'publisHouse|1': publisHouseArr,
      'type|1': ['社科类', '经济类', '文学类'],
      'barcode|1': /[0-9]{10}/,
      'precontractFetchTime|1': dayjs().format('YYYY-MM-DD'),
      'precontractReader|1': authorArr,
      'notifyStatus|1': ['已通知', '通知失败'],
      'fetchStatus|1': ['未取书', '已取书', '超时未取']
      // 'recommendStatus|1': [status, '已处理']
    }))
  }
  return arr
}

function diaoyongyuyue(path, fn, number1, number2) {
  app.get(path, (req, res) => {
    const obj = {
      total: number1,
      data: fn(number2, '---')
    }
    res.send(obj)
  })
}

diaoyongyuyue('/api/manage/yuyue', yuyuetushu, total, total)
diaoyongyuyue('/api/manage/yuyueyidaoguan', yuyuetushu, total, total / 0.3)
diaoyongyuyue('/api/manage/yuyueweidaoguan', yuyuetushu, total, total / 0.7)
diaoyongyuyue('/api/manage/yuyueruku', yuyuetushu, total, total / 0.5)

// 读者管理
function duzheguanli(len, status) {
  let arr = []
  for (let i = 0; i < len; i++) {
    arr.push(Mock.mock({
      'name|1': authorArr,
      'readerNumber|1': /[0-9]{8}/,
      'cardType|1': ['基本卡', '黄金VIP卡', '💎钻石VIP卡'],
      'cardStatus|1': ['有效', '无效'],
      'validity|1': dayjs().format('YYYY-MM-DD'),
      'borrow|1': /[0-9]{3,4}\/[0-9]{3,4}/,
    }))
  }
  return arr
}

function diaoyongduzheguanli(path, fn, number1, number2) {
  app.get(path, (req, res) => {
    const obj = {
      total: number1,
      data: fn(number2, '---')
    }
    res.send(obj)
  })
}

diaoyongduzheguanli('/api/duzhe', duzheguanli, total, total)
diaoyongduzheguanli('/api/youxiuduzhe', duzheguanli, total, total / 0.3)
diaoyongduzheguanli('/api/heibaimingdan', duzheguanli, total, total / 0.7)

app.use(express.static(path.resolve(__dirname, './dist')))

app.get('*', function(req, res) {
  
  const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
  res.send(html)
})
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});



app.listen(4000)
console.log('4000端口开启!')