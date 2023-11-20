import 'dotenv/config'

import { WebSocketServer } from 'ws';
import Fastify from 'fastify'

import { pixelController } from './controllers/pixel.controller';
import { wsError, wsMsg } from './services/ws.listeners';
import path from 'path';


const API_PORT=process.env.API_PORT || 3000;
const WS_PORT=process.env.WS_PORT || 8888;


/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true
})

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/', // optional: default '/'
  // constraints: { host: 'example.com' } // optional: default {}
})

fastify.register(pixelController);


fastify.listen({ port: API_PORT as number }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  
  const wss = new WebSocketServer({ port: WS_PORT as number });
  wss.on('connection', ws => {
    console.log("new WS connection");   

    ws.on('error', wsError);
  
    ws.on('message', wsMsg);
  
    // ws.send('something');
  });

  console.log(`Server is now listening on ${address} and WS on ${WS_PORT}`)


});