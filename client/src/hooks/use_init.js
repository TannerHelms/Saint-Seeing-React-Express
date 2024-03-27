import { useDispatch } from "react-redux";

import useApi from "./use_api";
import { useHistory } from "react-router";

const useInit = () => {
    const navigate = useHistory();
    const dispatch = useDispatch();
    const api = useApi();
    return { dispatch, api, navigate };
}

export default useInit;