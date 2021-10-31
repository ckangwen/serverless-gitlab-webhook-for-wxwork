const {
  pipe,
  text,
  link,
  quote
} = require('../libs/markdown');

function onPush(data = {}) {
  const {
    user_name,
    object_kind,
    repository,
    commits = []
  } = data

  if (object_kind !== "push") return
  if (!repository.name) {
    return
  }

  const repoName = repository.name
  const repoUrl = repository.git_http_url
  const commitMessages = commits.map(t => {
    return quote(t.message)
  }).join("\n")

  const content = pipe(
    text(`${user_name} 向 ${link(repoName, repoUrl)} 推送了${commits.length}条内容`),
    text("提交记录:"),
    commitMessages,
  )

  return {
    content,
    message: "Push"
  }
}

module.exports = onPush
