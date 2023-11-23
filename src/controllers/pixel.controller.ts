import { isTrackable } from "../services/track.service";

export async function pixelController (fastify:any, options:any) {
  
  fastify.get('/:uuid/pixel', async function (req:any, reply:any) {

    const userIsTrackable:boolean|null = await isTrackable(req);
    if ( userIsTrackable ) {
      console.log("TRACK")
    }

    return reply.sendFile('1x1.png', { cacheControl: false }) // overriding the options disabling cache-control headers

  });



  fastify.get('/:uuid/pixel/:encodedUriPixelName', async function (req:any, reply:any) {

    const userIsTrackable:boolean|null = await isTrackable(req);

    if ( userIsTrackable && req.params.encodedUriPixelName ) {
      console.log("Notify user " + req.params.uuid + " about " + req.params.encodedUriPixelName, " get opened");
    }
    
    return reply.sendFile('1x1.png', { cacheControl: false }) // overriding the options disabling cache-control headers

  });
}