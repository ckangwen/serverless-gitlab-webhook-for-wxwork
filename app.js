const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const hookHandlers = require('./features')
const { sendMessage } = require("./libs/wxwork")
const { GITLAB_EVENT_TOKEN } = require("./config")


const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// Routes
app.get(`/`, (req, res) => {
  console.log(req, res)
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/gitlab-webhook', async (req, res) => {
  const sendError = (msg) => {
    res.setHeader("Content-Type", "text/plain;charset=utf-8");
    res.status(500).end(msg);
  };

  const sendSuccess = msg => {
    res.setHeader("Content-Type", "text/plain;charset=utf-8");
    res.status(200).end(msg);
  }

  const gitlabToken = req.headers['X-Gitlab-Token'] || req.headers['x-gitlab-token'] || ""

  if (gitlabToken.indexOf(GITLAB_EVENT_TOKEN) < 0) {
    return sendError(`token invalid ${gitlabToken}}`);
  }

  const data = req.body
  if (!data) {
    return sendError("response is empty");
  }

  const eventType = data.object_kind

  const handler = hookHandlers[eventType];
  try {
    const result = await handler(data);
    if (result.content) {
      const sendResult = await sendMessage(result.content);
      sendSuccess(JSON.stringify(sendResult))
    } else {
      sendSuccess(result.content || "")
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : e;
    sendError(msg);
  }
});

// Error handler
app.use(function(err, req, res, next) {
  console.error(err)
  res.status(500).send('Internal Serverless Error')
})

app.listen(9000, () => {
  console.log(`Server start on http://localhost:9000`);
})
