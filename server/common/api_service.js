const axios = require('axios');

let defaultHeaders = {
        'Content-Type': 'application/json'
}
    
module.exports = {
        // Default Response
        post(url = "", httpParams = {}, customHeaders = null){
                return axios.post(
                url, //url
                JSON.stringify(httpParams), //data
                {
                        headers: customHeaders != null ? customHeaders : defaultHeaders,
                })
                .then((response) => {
                        return response;
                }).catch((err) => {
                        return err;
                });
        },

        get(url, httpParams, customHeaders = null){
                return axios.get(
                url, //url
                {
                        headers: customHeaders != null ? customHeaders : defaultHeaders,
                        params: httpParams //data
                })
                .then((response) => {
                        return response;
                }).catch((err) => {
                        return err;
                });
        }
}