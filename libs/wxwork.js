const axios = require('axios');
const { wxWorkKey } = require('../config')

async function sendMessage(content = '', mentionList = [], mentionMobiles = []) {
  const result = await axios.post(`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${wxWorkKey}`, {
    msgtype: "markdown",
    markdown: {
      content,
      mentioned_list: mentionList,
      mentioned_mobile_list: mentionMobiles
    }
  })

  return result.data
}

exports.sendMessage = sendMessage
