export async function pixelController (fastify:any, options:any) {
    // fastify.get('/', async (request:any, reply:any) => {
    //   return { hello: 'world' }
    // });

    fastify.get('/pixel', function (req:any, reply:any) {
      if ( req.query ) {
        console.log("pixel id: ", req.query);
      }
      console.log(req);
      reply.sendFile('1x1.png', { cacheControl: false }) // overriding the options disabling cache-control headers
    });
}