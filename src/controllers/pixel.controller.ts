type ExtensionMessage = {
  uuid: string;
  encodedUriPixelName: string;
  createdAtTime: number;
};


let messageList:ExtensionMessage[] = [];

export async function pixelController (fastify:any, options:any) {
  
  // http://localhost:3000/uuid/pixel/kkk // not same 
  // http://localhost:3000/uuid/pixel/kkk?u=uuid // same 

  fastify.get('/:uuid/pixel/:encodedUriPixelName', async function (req:any, reply:any) {

    try {
      const { uuid, encodedUriPixelName } = req.params;
      const { u } = req.query;
      if ( u === uuid ) {
        console.log("Same user request received code : ", u);
      } else {
        console.log(`Not same user request, must send notify to uuid (u) : ${uuid} => ${decodeURIComponent(encodedUriPixelName)}`);

        // TODO save to redis for ttl 14j ? to keep history

        messageList.unshift({
          uuid,
          encodedUriPixelName,
          createdAtTime: new Date().getTime()
        });

      }
      return reply.sendFile('1x1.png', { cacheControl: false }) // overriding the options disabling cache-control headers
    } catch ( e ) {
      console.log("Can't track");
      return reply.sendFile('1x1.png', { cacheControl: false }) // overriding the options disabling cache-control headers
    }


  });

  // Consume and return all list, client must check if he find his uuid in the list for notification
  fastify.get('/subscribe', (request:any, reply:any) => {

    console.log("Current list size", messageList.length);

      // Set the necessary headers for SSE
      reply.raw.writeHead(200, {
        'Access-Control-Allow-Origin': '*', // Assurez-vous que cet en-tête est présent
        'Content-Type': 'text/event-stream',
          'Connection': 'keep-alive',
          'Cache-Control': 'no-cache'
      });

      const sendEvent = (data:any) => {
          reply.raw.write(`data: ${JSON.stringify(data)}\n\n`);
      };

      const interval = setInterval(() => {
        console.log("Send data ", messageList)
        
          sendEvent({
            "trackedList": messageList
          });

          messageList = [];
      }, 15000);

      request.raw.on('close', () => {
          clearInterval(interval);
      });

    

});



}