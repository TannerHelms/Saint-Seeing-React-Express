import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import RadarApi from "../api/radarApi";

const useSignUp = () => {

    const signup = async ({ data, backgroundImage, profileImage }) => {
        const fd = new FormData();
        for (const key in data) {
            if (key == "rules") {
                data[key].forEach((rule, index) => {
                    fd.append(key, rule);
                });
            } else if (key == "city") {
                const { addresses: place } = await RadarApi.autoComplete(data[key], {
                    longitude: -111.8338,
                    latitude: 41.73698,
                })
                const latitude = place[0].latitude;
                const longitude = place[0].longitude;
                fd.append("city", data[key]);
                fd.append("latitude", latitude);
                fd.append("longitude", longitude);
            } else {
                fd.append(key, data[key]);
            }
        }
        fd.append("background", backgroundImage, backgroundImage.name);
        fd.append("profile", profileImage, profileImage.name);

        return axios.post(import.meta.env.VITE_SERVER_URL + "/users", fd, {
            headers: {
                'content-type': 'multipart/form-data'
            },
        })
    }

    const signupMutation = useMutation({
        queryKey: ["user"],
        mutationFn: signup,
    });

    return { signup: signupMutation };
}

export default useSignUp;