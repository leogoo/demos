const express = require('express');

const app = express();

// SSE路由
app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  // // 立即将设置的首部发送至客户端，而不必等待完整的响应体准备就绪
  res.flushHeaders();

  // 模拟定期发送更新给客户端的事件数据
  const intervalId = setInterval(() => {
    res.write(`event: message\n`);
    res.write(`data: Server time: ${new Date().toLocaleTimeString()}\n\n`);
  }, 1000);

  // 当客户端断开连接时，清除定时器
  req.on('close', () => {
    clearInterval(intervalId);
  });
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
})