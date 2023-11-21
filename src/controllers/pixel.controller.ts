import { isTrackable } from "../services/track.service";

export async function pixelController (fastify:any, options:any) {
  
  fastify.get('/:uuid/pixel', async function (req:any, reply:any) {

    const userIsTrackable:boolean|null = await isTrackable(req);
    if ( userIsTrackable ) {
      console.log("TRACK")
    }

    return reply.sendFile('1x1.png', { cacheControl: false }) // overriding the options disabling cache-control headers

  });
}