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

    static async getDistance(place1, place2) {
        const distance = await Radar.distance({
            origin: {
                latitude: place1.latitude,
                longitude: place1.longitude
            },
            destination: {
                latitude: place2.latitude,
                longitude: place2.longitude
            },
            modes: ['car'],
            units: 'imperial'
        });
        const route = distance.routes?.car?.distance?.text ? distance.routes.car : distance.routes.geodesic;
        return route ? { value: route.distance.value, text: route.distance.text } : null;
    }
}

export default RadarApi;