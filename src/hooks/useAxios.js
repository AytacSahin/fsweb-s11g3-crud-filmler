// import { toast } from "react-toastify";
import { axiosWithAuth } from "./api";
import { useState } from "react";

export const REQ_TYPES = Object.freeze({
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",
});

const useAxios = (initialValue = []) => {

    const [data, setData] = useState(initialValue);
    
    const doRequest = ({
        endpoint,
        reqType,
        payload,
    }) => {
        return axiosWithAuth()[reqType](endpoint, payload)
            .then((res) => {
                setData(res.data);
                // setError(null);
                return res.data;
            })
            .catch((err) => {
                // setError(err);
                setData(initialValue);
                // toast.error(err.message);
                throw err;
            })
        //   .finally(() => setLoading(false));
    };

    return [doRequest, data];
};

export default useAxios;
