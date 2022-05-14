const Merchant = require('../models').merchant;

module.exports = {


    async checkValidation(value, key, validation_type, value_length) {
        if (validation_type == "db_valid_email") {
            if (!value) {
                var obj = { result: false, msg: "Please enter " + key }
                return obj;
            } else if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(value) == false) {
                var obj = { result: false, msg: "Please enter valid email format for " + key }
                return obj;
            } else {
                let data = await Merchant.findOne({
                        where: { email: value }
                    })
                    .then(admin_users => {
                        if (admin_users == null) {
                            return obj = { result: true }
                        } else {
                            return obj = { result: false, msg: "Email is already in use. Please try another " }
                        }
                    });

                return data;
            }
        }



        if (validation_type == "required") {
            if (!value) {
                var obj = { result: false, msg: "Please select " + key }
                return obj;
            } else {
                var obj = { result: true, }
                return obj;
            }
        }


        if (validation_type == "alphanum") {
            if (!value) {
                var obj = { result: false, msg: "Please enter " + key }
                return obj;
            } else if ((/^[a-z A-Z 0-9]+$/).test(value) == false) {
                var obj = { result: false, msg: "Please enter valid value for " + key }
                return obj;
            } else {
                var obj = { result: true, }
                return obj;
            }
        }

        if (validation_type == "string_symbol") {
            if (!value) {
                var obj = { result: false, msg: "Please enter " + key }
                return obj;
            } else if ((/^[a-z A-Z ., ! @ # ?]+$/).test(value) == false) {
                var obj = { result: false, msg: "Please enter string format for " + key }
                return obj;
            } else {
                var obj = { result: true, }
                return obj;
            }
        }


        if (validation_type == "string") {
            if (!value) {
                var obj = { result: false, msg: "Please enter " + key }
                return obj;
            } else if ((/^[a-z A-Z]+$/).test(value) == false) {
                var obj = { result: false, msg: "Please enter string format for " + key }
                return obj;
            } else {
                if (value_length) {
                    if (value.toString().length >= value_length) {
                        var obj = { result: false, msg: "lenght should be " + value_length + "characters for " + key }
                        return obj;
                    } else {
                        var obj = { result: true, }
                        return obj;
                    }
                } else {
                    var obj = { result: true, }
                    return obj;
                }
            }
        }

        if (validation_type == "int") {
            if (!value) {
                var obj = { result: false, msg: "Please enter " + key }
                return obj;
            } else if ((/^[0-9]+$/).test(value) == false) {
                var obj = { result: false, msg: "Please enter numeric format for " + key }
                return obj;
            } else {
                if (value_length) {
                    if (value.toString().length != value_length) {
                        var obj = { result: false, msg: "lenght should be " + value_length + " for " + key }
                        return obj;
                    } else {
                        var obj = { result: true, }
                        return obj;
                    }
                } else {
                    var obj = { result: true, }
                    return obj;
                }
            }
        }

        if (validation_type == "email") {
            if (!value) {
                var obj = { result: false, msg: "Please enter " + key }
                return obj;
            } else if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(value) == false) {
                var obj = { result: false, msg: "Please enter valid " + key }
                return obj;
            } else {
                var obj = { result: true, }
                return obj;
            }
        }


        if (validation_type == "mobile") {
            // console.log("dev", value.substring(0, 3));
            // console.log("dev", value.substring(3, 13));
            if (!value) {
                var obj = { result: false, msg: "Please enter " + key }
                return obj;
            } else {
                var mob = value.substring(0, 3);
                var mob_start = value.substring(3, 4);
                if (value.toString().length != 13) {
                    var obj = { result: false, msg: "Lenght should be 13 for " + key }
                    return obj;
                } else if (mob != "+63") {
                    var obj = { result: false, msg: "Please enter valid country code for" + key }
                    return obj;
                } else if ((mob_start != "8") && (mob_start != "9")) {
                    var obj = { result: false, msg: key + " should starts with either 8 or 9" }
                    return obj;
                } else if ((/^[0-9]+$/).test(value.substring(3, 13)) == false) {
                    var obj = { result: false, msg: "Please enter numeric format for " + key }
                    return obj;
                } else {
                    var obj = { result: true, }
                    return obj;
                }
            }
        }


        if (validation_type == "password") {
            var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            if (!value) {
                var obj = { result: false, msg: "Please input your " + key }
                return obj;
            } else if (strongRegex.test(value) == false) {
                var obj = { result: false, msg: key + " should contain atleast one number,one uppercase,one lowercase,one special character & length should be 8" }
                return obj;
            } else {
                var obj = { result: true, }
                return obj;
            }
        }

        if (validation_type == "image_upload") {
            // console.log("dev-value===>", value);
            // value = value[0];
            // console.log("dev-value===>", value.mimetype);
            if (!value) {
                var obj = { result: false, msg: "Please enter " + key }
                return obj;
            } else if ((value.mimetype != "image/png") && (value.mimetype != "image/jpg") && (value.mimetype != "image/jpeg") && (value.mimetype != "image/PNG") && (value.mimetype != "image/JPG") && (value.mimetype != "image/JPEG")) {
                var obj = { result: false, msg: "Please select an image file for  " + key }
                return obj;
            } else if (value.size > 6 * 1024 * 1024) {
                var obj = { result: false, msg: "Please selected an image size should be less then 6MB " }
                return obj;
            } else {
                var obj = { result: true, }
                return obj;
            }
        }




    },


};