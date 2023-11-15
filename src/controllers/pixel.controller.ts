export async function pixelController (fastify:any, options:any) {
    fastify.get('/', async (request:any, reply:any) => {
      return { hello: 'world' }
    })
}