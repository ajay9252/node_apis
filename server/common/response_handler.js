
module.exports = {
        // Default Response
        defaultRes(data = null, message = "", success = false){
                return { 
                        data, 
                        message,
                        success 
                }
        },

        validateReqQuery(requiredParams, req){
                let errorMsg = "";
                let defaultError = "Unable to process due to missing required paramaters : ";
                requiredParams.forEach((key,value) => {
                        if(req.query[key] == undefined){
                                errorMsg = errorMsg != "" ? errorMsg + ", " + key : errorMsg + " " + key;
                        }  
                })

                errorMsg = errorMsg != "" ? defaultError + errorMsg : "";

                return errorMsg;
        }
}