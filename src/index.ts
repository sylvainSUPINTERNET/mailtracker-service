import 'dotenv/config'
import Fastify from 'fastify'

import { pixelController } from './controllers/pixel.controller';
import path from 'path';

import cors from '@fastify/cors'


const API_PORT=process.env.API_PORT || 3000;

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true
})


// TODO : secure it at some point !
// Access to resource at 'http://localhost:3000/subscribe' from origin 'chrome-extension://jflhboeonhledgchehppbdmjbdddogji' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
fastify.register(cors, {
  origin: (origin, cb) => {
    if (!origin || origin.startsWith('chrome-extension://')) {
      // Autoriser les requêtes sans origine (comme les applications mobiles, postman) ou depuis une extension Chrome
      cb(null, true);
    } else {
      // Bloquer toutes les autres origines
      cb(new Error('Not allowed by CORS'), false);
    }
  },
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Origin', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Date', 'X-Api-Version'],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
});

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
});