import axios from "axios";
import getConfig from 'next/config'

const cancelTokens = {}

// const {
//     serverRuntimeConfig: { basePath }
// } = getConfig();

const basePath = 'http://localhost:5000'

console.log(basePath)

const handleResponse = (response) => {
    const responseData = response.data

    if (responseData) {
        if (responseData.success)
            return responseData.data

        return responseData.error
    }

    return response
}

export function handleError(error){
    if(axios.isCancel(error)){
        const cancelMessage = ["OPERATION_CANCELLED"];
        throw cancelMessage;
    }
    else{
        throw error.response.data.errors
    }
}

export const cancelRequest = endpoint => {
    if(typeof cancelTokens[endpoint] !== typeof undefined){
        cancelTokens[endpoint].cancel("OPERATION_CANCELLED")
        delete cancelTokens[endpoint]
    }
}

export const getRequest = (endpoint, params, cancelPrevious = true) => {
    if(
        cancelPrevious && 
        typeof cancelTokens[endpoint] !== typeof undefined &&
        typeof window !== 'undefined'
    ){
        cancelTokens[endpoint].cancel("OPERATION_CANCELLED")
        delete cancelTokens[endpoint]
    }
    cancelTokens[endpoint] = axios.CancelToken.source();

    let url = `/api/${endpoint}`

    if(basePath){
        url = `${basePath}${url}`
    }

    return axios({
        method: 'get',
        cancelToken: cancelTokens[endpoint].token,
        url,
        params
    })
    .then(handleResponse)
    .catch(handleError)
}

export const postRequest = (endpoint, data, cancelPrevious = true) => {
    if(
        cancelPrevious && 
        typeof cancelTokens[endpoint]!== typeof undefined &&
        typeof window!== 'undefined'
    ){
        cancelTokens[endpoint].cancel("OPERATION_CANCELLED")
        delete cancelTokens[endpoint]
    }
    cancelTokens[endpoint] = axios.CancelToken.source();

    let url = `/${endpoint}`
    if(basePath){
        url = `${basePath}${url}`
    }

    return axios({
        method: 'post',
        cancelToken: cancelTokens[endpoint].token,
        url,
        data
    })
    .then(handleResponse)
    .catch(handleError)
}