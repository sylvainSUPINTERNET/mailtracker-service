export const isTrackable = async (request:any): Promise<boolean|null> => {
    return new Promise( (resolve, _reject) => {
        try {
            const { uuid } = request.params;
            if ( request.query.u ) {
                if ( uuid === request.query.u ) {
                    // same user / pixel do nothing
                    return resolve(false);
                } else {
                    // different user / pixel
                    return resolve(true);
                }
            }

        } catch ( e) {
            console.log("Error user pixel tracking : ", e);
            return resolve(null);
        }

    });

}