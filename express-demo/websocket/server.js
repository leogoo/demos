const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const uuid = require('uuid');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clients = new Map();
wss.on('connection', (ws) => {
  const clientId = uuid.v4();
  // 将新连接的客户端加入映射关系
  clients.set(clientId, ws);

  ws.on('message', (message) => {
    console.log('Message received: ' + message);

    ws.send('message form server')
    // wss.clients.forEach((client) => {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(message);
    //   }
    // });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// 启动服务器
const port = 3000;
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});