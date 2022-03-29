import { WebSocketServer, WebSocket } from 'ws'
import ejs from 'ejs'
import { getAllTodos } from './db.mjs'

/** @type {Set<WebSocket>} */
const connections = new Set()

export const createWebSocketServer = (server) => {
    const wss = new WebSocketServer({ server })

    wss.on('connection', function connection(ws) {
        console.log('new connection')
        connections.add(ws)

        ws.on('message', function message(data) {
          console.log('received: %s', data);
        });
      
        //ws.send('something');

        ws.on('close', function () {
          connections.delete(ws)
        })
    });
}

export const sendTodosToAllConnections = async () => {
  const todos = await getAllTodos()
  const html = await ejs.renderFile('views/todos.ejs', { todos })

  connections.forEach((x) => {
    const message = {
      type: 'todos',
      html
    }
    
    x.send(JSON.stringify(message))
  })
}