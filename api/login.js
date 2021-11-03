const jwt = require('jsonwebtoken')
const uuid = require('uuid')
let seccret = 'jwttoken' 
module.exports = {
  token(name) {
    let payload = {
      id: uuid.v4(),
      name: name,
      power: name === '15102029183' ? '超级管理员' : '一级管理员'
    }
    let token = jwt.sign(payload, seccret, {
      expiresIn: '1h',
      issuer: 'cxw'
    })
    let userInfo = null
    jwt.verify(token, seccret, (error, decoded) => {
      if (error) {
        console.log(error)
        return error
      }
      console.log('校验', decoded)
      userInfo = decoded
    })
    return {token, userInfo}
  },
  validToken (token) {
    let userInfo = null
    jwt.verify(token, seccret, (error, decoded) => {
      if (error) {
        console.log(error)
        return error
      }
      console.log('校验', decoded)
      userInfo = decoded
    })
    return userInfo
  }
  
}
// token()
// export function token () {

// console.log(token)


// }