import { useDispatch } from "react-redux";

import useApi from "./use_api";

const useInit = () => {

    const dispatch = useDispatch();
    const api = useApi();
    return { dispatch, api };
}

export default useInit;