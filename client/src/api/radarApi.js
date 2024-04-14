import Radar from "radar-sdk-js";

class RadarApi {
    static autoComplete(query, user) {
        return Radar.autocomplete({
            query: query,
            near: {
                longitude: user.longitude,
                latitude: user.latitude,
            },
            limit: 10,
        });
    }
}

export default RadarApi;