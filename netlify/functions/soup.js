const quotes = [
  "每一次努力，都是幸运的伏笔 ✨",
  "生活不是等待风暴过去，而是学会在雨中跳舞 🌧️",
  "种一棵树最好的时间是十年前，其次是现在 🌳",
  "你今天的努力，是未来幸运的伏笔 💪",
  "不要因为没有掌声就放弃梦想 🎯",
  "人生没有白走的路，每一步都算数 👣",
  "当你觉得晚了的时候，恰恰是最早的时候 ⏰",
  "成功不是终点，失败也不是末日，勇气才是永恒 🦁",
  "生活就像骑自行车，要保持平衡就得往前走 🚲",
  "再小的努力，乘以365都很明显 📈",
  "当你开始做自己喜欢的事情，整个世界都会为你让路 🌟",
  "没有人能定义你的未来，除了你自己 🎨",
  "有时候，你需要闭上眼睛，才能看见更美的风景 🌅",
  "梦想不会发光，发光的是追梦的你 💫",
  "最好的时间就是现在，最好的地方就是这里 🏠"
]

exports.handler = async () => {
  // 随机选一句
  const randomIndex = Math.floor(Math.random() * quotes.length)
  const randomQuote = quotes[randomIndex]
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      message: randomQuote
    })
  }
}