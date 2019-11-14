const { list, add, del, change } = require('../data/menu')
const qs = require('querystring')

const sendError = (res, msg) => {
    let data = JSON.stringify({
        code: 400,
        msg: msg
    })
    res.end(data)
}

const sendSuccess = (res, result) => {
    let data = JSON.stringify({
        code: 200,
        data: result
    })
    res.end(data)
}

// 解析http post数据
const parseReceivedData = (req) => {
    return new Promise((resolve, reject) => {
      let data = ''
      req.setEncoding('utf8')
      req.on('data', (chunk) => {
        data += chunk
      })
      req.on('end', () => {
          params = qs.parse(data)
          resolve(params)
      })
      req.on('error', (e) => {
        reject(e)
      });
    })
}

module.exports = {
    async list(req, res) {
        try {
            let data = await list()
            sendSuccess(res, data)
        } catch (error) {
            sendError(res, error)
        }
    },
    async add(req, res) {
        try {
            let params = await parseReceivedData(req)
            let data = await add(params)
            sendSuccess(res, data)
        } catch (error) {
            sendError(res, error)
        }
    },
    async delete(req, res) {
        try {
            let params = await parseReceivedData(req)
            let data = await del(params)
            sendSuccess(res, data)
        } catch (error) {
            sendError(res, error)
        }
    },
    async change(req,res) {
        try {
            let params = await parseReceivedData(req)
            let data = await change(params)
            sendSuccess(res, data)
        } catch (error) {
            sendError(res, error)
        }
    }
}