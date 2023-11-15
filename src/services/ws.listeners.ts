export const wsError = (err: Error) => {
    console.log('ws error', err);
}

export const wsMsg = (msg:any) => {
    console.log("WS msg", msg.toString());
}