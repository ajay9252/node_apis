const MerchantRegistration = require('../models').merchant_registration;
const Merchant = require('../models').merchant;

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/data/uploads/');
    },
    filename: function(req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    },
});
var upload = multer({ storage: storage }).single('photo_of_id,business_document');

const ValidationController = require("./validation");
module.exports = {

    //Step by step reg merchant
    async merchant_registration(req, res) {
        var reqdata = req.body;

        if (!reqdata.temp_id) {
            if (reqdata.page == "1") {
                if ((!reqdata.term_condition) || (reqdata.term_condition == "0")) {
                    return res.json({
                        success: false,
                        data: null,
                        message: "Term & Condition should be selected"
                    });
                } else if ((!reqdata.data_privacy) || (reqdata.data_privacy == "0")) {
                    return res.json({
                        success: false,
                        data: null,
                        message: "Data Privacy should be selected"
                    });
                } else if((!reqdata.lat) || (reqdata.lat == "0") && (!reqdata.lng) || (reqdata.lng == "0") ) {
                    return res.json({
                        success: false,
                        data: null,
                        message: "Location required"
                    });
                } else {
                    MerchantRegistration
                        .create({
                            term_condition: reqdata.term_condition,
                            data_privacy: reqdata.data_privacy,
                            lat: reqdata.lat,
                            long: reqdata.lng,
                        })
                        .then((data_set) => res.status(201).send({
                            success: true,
                            data: data_set,
                            message: "Level 1 Complete"
                        }));
                }
            }
        } else {


            if (reqdata.page == "2") {
                var merchant_type = await ValidationController.checkValidation(reqdata.merchant_type, "Merchant Type", "required");
                if (merchant_type.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: merchant_type.msg
                    });
                } else {
                    return MerchantRegistration
                        .findByPk(reqdata.temp_id)
                        .then(data_set => {
                            return data_set
                                .update({
                                    merchant_type: reqdata.merchant_type,
                                })
                                .then(() => res.status(200).send({
                                    success: true,
                                    data: data_set,
                                    message: "Level 2 Complete"
                                }));
                        });
                }
            }


            if (reqdata.page == "3") {

                var business_name_var = await ValidationController.checkValidation(reqdata.business_name, "Business Name", "string", "50");
                var nature_of_business_var = await ValidationController.checkValidation(reqdata.nature_of_business, "Nature Of Business", "string");
                var home_street_number_var = await ValidationController.checkValidation(reqdata.home_street_number, "Home/street Number", "alphanum");
                var street_name_var = await ValidationController.checkValidation(reqdata.street_name, "Street Name", "string");
                var region_var = await ValidationController.checkValidation(reqdata.region, "Region", "string");
                var province_var = await ValidationController.checkValidation(reqdata.province, "Province", "string");
                var city_var = await ValidationController.checkValidation(reqdata.city, "City", "string");
                var barangay_var = await ValidationController.checkValidation(reqdata.barangay, "Barangay", "string");
                var business_mobile_var = await ValidationController.checkValidation(reqdata.business_mobile, "Business Mobile", "mobile");

                if (business_name_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: business_name_var.msg
                    });
                } else if (nature_of_business_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: nature_of_business_var.msg
                    });
                } else if (home_street_number_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: home_street_number_var.msg
                    });
                } else if (street_name_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: street_name_var.msg
                    });
                } else if (region_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: region_var.msg
                    });
                } else if (province_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: province_var.msg
                    });
                } else if (city_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: city_var.msg
                    });
                } else if (barangay_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: barangay_var.msg
                    });
                } else if (business_mobile_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: business_mobile_var.msg
                    });
                } else {
                    return MerchantRegistration
                        .findByPk(reqdata.temp_id)
                        .then(data_set => {
                            return data_set
                                .update({
                                    business_name: reqdata.business_name,
                                    nature_of_business: reqdata.nature_of_business,
                                    home_street_number: reqdata.home_street_number,
                                    street_name: reqdata.street_name,
                                    region: reqdata.region,
                                    province: reqdata.province,
                                    city: reqdata.city,
                                    barangay: reqdata.barangay,
                                    business_mobile: reqdata.business_mobile,
                                })
                                .then(() => res.status(200).send({
                                    success: true,
                                    data: data_set,
                                    message: "Level 3 Complete"
                                }));
                        });
                }
            }


            if (reqdata.page == "4") {
                var business_document_var = await ValidationController.checkValidation(req.file, "Business Document", "image_upload");
                if (business_document_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: business_document_var.msg
                    });
                } else {
                    upload(req, res, function(err) {
                        if (err) {
                            console.log(err);
                            return res.end("Error uploading file.");
                        } else {
                            reqdata.business_document = req.file.filename;
                            return MerchantRegistration
                                .findByPk(reqdata.temp_id)
                                .then(data_set => {
                                    return data_set
                                        .update({
                                            business_document: reqdata.business_document,
                                        })
                                        .then(() => res.status(200).send({
                                            success: true,
                                            data: data_set,
                                            message: "Level 4 Complete"
                                        }));
                                });

                        }

                    });
                }
            }


            if (reqdata.page == "5") {
                var user_type_var = await ValidationController.checkValidation(reqdata.user_type, "User Type", "required");
                var first_name_var = await ValidationController.checkValidation(reqdata.first_name, "First name", "string");
                var last_name_var = await ValidationController.checkValidation(reqdata.last_name, "Last Name", "string");
                var mobile_var = await ValidationController.checkValidation(reqdata.mobile, "Mobile", "mobile");
                var citizenship_var = await ValidationController.checkValidation(reqdata.citizenship, "Citizenship", "string");
                var email_var = await ValidationController.checkValidation(reqdata.email, "Email", "email");
                var confirm_email_var = await ValidationController.checkValidation(reqdata.confirm_email, "Email", "email");
                var password_var = await ValidationController.checkValidation(reqdata.password, "Password", "password");
                var confirm_password_var = await ValidationController.checkValidation(reqdata.confirm_password, "Confirm Password", "password");
                var settlement_method_var = await ValidationController.checkValidation(reqdata.settlement_method, "Settlement Method", "required");


                if (user_type_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: user_type_var.msg
                    });
                } else if ((reqdata.user_type != "Owner") && (reqdata.user_type != "Representative")) {
                    return res.json({
                        success: false,
                        data: null,
                        message: "User type should be either Owner or Representative"
                    });
                } else if (first_name_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: first_name_var.msg
                    });
                } else if (last_name_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: last_name_var.msg
                    });
                } else if (citizenship_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: citizenship_var.msg
                    });
                } else if (mobile_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: mobile_var.msg
                    });
                } else if (email_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: email_var.msg
                    });
                } else if (confirm_email_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: confirm_email_var.msg
                    });
                } else if (reqdata.email.toString() != reqdata.confirm_email.toString()) {
                    return res.json({
                        success: false,
                        data: null,
                        message: "Confirm Email did not match. Please make sure that your confirm email matches your email."
                    });
                } else if (password_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: password_var.msg
                    });
                } else if (confirm_password_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: confirm_password_var.msg
                    });
                } else if (reqdata.password.toString() != reqdata.confirm_password.toString()) {
                    return res.json({
                        success: false,
                        data: null,
                        message: "Confirm Password did not match. Please make sure that your confirm password matches your password."
                    });
                } else if (settlement_method_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: settlement_method_var.msg
                    });
                } else {
                    if (reqdata.settlement_method == "ewallet") {
                        var ewallet_name_var = await ValidationController.checkValidation(reqdata.settlement_ewallet_name, "Wallet Name", "required");
                        var ewallet_account_name_var = await ValidationController.checkValidation(reqdata.settlement_ewallet_account_name, "Account Name", "string");
                        var ewallet_mobile_no_var = await ValidationController.checkValidation(reqdata.settlement_ewallet_mobile_no, "Mobile No", "mobile");
                        var email_unique = await ValidationController.checkValidation(reqdata.email, "Email", "db_valid_email");
                        if (ewallet_name_var.result == false) {
                            return res.json({
                                success: false,
                                data: null,
                                message: ewallet_name_var.msg
                            });
                        }
                        if (ewallet_account_name_var.result == false) {
                            return res.json({
                                success: false,
                                data: null,
                                message: ewallet_account_name_var.msg
                            });
                        }
                        if (ewallet_mobile_no_var.result == false) {
                            return res.json({
                                success: false,
                                data: null,
                                message: ewallet_mobile_no_var.msg
                            });
                        }


                        return MerchantRegistration
                            .findByPk(reqdata.temp_id)
                            .then(async data_set => {
                                if (email_unique.result == true) {
                                    Merchant
                                        .create({
                                            first_name: req.body.first_name,
                                            last_name: req.body.last_name,
                                            // merchant_name: req.body.merchant_name,
                                            // merchant_code: req.body.merchant_code,
                                            email: req.body.email,
                                            password: req.body.password,
                                            // address_id: req.body.address_id,
                                            // business_id: req.body.business_id,
                                            // profile_id: req.body.profile_id,
                                            // approved_by: req.body.approved_by,
                                            // approved_at: req.body.approved_at,
                                            // convenience_setting: req.body.convenience_setting,
                                            active: 1,
                                            status: "review"
                                        })
                                        .then()
                                        .catch((error) => {
                                            res.status(400).send({
                                                success: false,
                                                data: null,
                                                message: error
                                            });
                                        });
                                }

                                return data_set
                                    .update({
                                        user_type: reqdata.user_type,
                                        first_name: reqdata.first_name,
                                        last_name: reqdata.last_name,
                                        mobile: reqdata.mobile,
                                        citizenship: reqdata.citizenship,
                                        business_email: reqdata.email,
                                        password: reqdata.password,
                                        settlement_method: reqdata.settlement_method,
                                        settlement_ewallet_name: reqdata.settlement_ewallet_name,
                                        settlement_ewallet_account_name: reqdata.settlement_ewallet_account_name,
                                        settlement_ewallet_mobile_no: reqdata.settlement_ewallet_mobile_no,
                                    })
                                    .then(() => res.status(200).send({
                                        success: true,
                                        data: data_set,
                                        message: "Level 5 Complete"
                                    }));


                            });
                    }

                    if (reqdata.settlement_method == "bank") {
                        var bank_name_var = await ValidationController.checkValidation(reqdata.settlement_bank_name, "Bank Name", "string");
                        var bank_location_var = await ValidationController.checkValidation(reqdata.settlement_bank_location, "Bank Location", "string");
                        var bank_account_name_var = await ValidationController.checkValidation(reqdata.settlement_bank_account_name, "Account Name", "string");
                        var bank_account_no_var = await ValidationController.checkValidation(reqdata.settlement_bank_account_no, "Account No", "int");
                        var email_unique = await ValidationController.checkValidation(reqdata.email, "Email", "db_valid_email");

                        if (bank_name_var.result == false) {
                            return res.json({
                                success: false,
                                data: null,
                                message: bank_name_var.msg
                            });
                        }
                        if (bank_location_var.result == false) {
                            return res.json({
                                success: false,
                                data: null,
                                message: bank_location_var.msg
                            });
                        }
                        if (bank_account_name_var.result == false) {
                            return res.json({
                                success: false,
                                data: null,
                                message: bank_account_name_var.msg
                            });
                        }
                        if (bank_account_no_var.result == false) {
                            return res.json({
                                success: false,
                                data: null,
                                message: bank_account_no_var.msg
                            });
                        }
                        return MerchantRegistration
                            .findByPk(reqdata.temp_id)
                            .then(data_set => {
                                if (email_unique.result == true) {
                                    Merchant
                                        .create({
                                            first_name: req.body.first_name,
                                            last_name: req.body.last_name,
                                            // merchant_name: req.body.merchant_name,
                                            // merchant_code: req.body.merchant_code,
                                            email: req.body.email,
                                            password: req.body.password,
                                            // address_id: req.body.address_id,
                                            // business_id: req.body.business_id,
                                            // profile_id: req.body.profile_id,
                                            // approved_by: req.body.approved_by,
                                            // approved_at: req.body.approved_at,
                                            // convenience_setting: req.body.convenience_setting,
                                            active: 1,
                                            status: "review"
                                        })
                                        .then()
                                        .catch((error) => {
                                            res.status(400).send({
                                                success: false,
                                                data: null,
                                                message: error
                                            });
                                        });
                                }

                                return data_set
                                    .update({
                                        user_type: reqdata.user_type,
                                        first_name: reqdata.first_name,
                                        last_name: reqdata.last_name,
                                        mobile: reqdata.mobile,
                                        citizenship: reqdata.citizenship,
                                        business_email: reqdata.email,
                                        password: reqdata.password,
                                        settlement_method: reqdata.settlement_method,
                                        settlement_bank_name: reqdata.settlement_bank_name,
                                        settlement_bank_location: reqdata.settlement_bank_location,
                                        settlement_bank_account_name: reqdata.settlement_bank_account_name,
                                        settlement_bank_account_no: reqdata.settlement_bank_account_no,
                                    })
                                    .then(() => res.status(200).send({
                                        success: true,
                                        data: data_set,
                                        message: "Level 5 Complete"
                                    }));
                            });

                    }
                }
            }


        }



    },

    get_all_registration(req, res) {
        return MerchantRegistration
            .findAll()
            .then(async result => {
                if (result.length == 0) {
                    res.status(200).send({
                        success: true,
                        data: null,
                        message: "No Data Found"
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        data: result,
                        message: "Data Fetched"
                    })
                }
            })
            .catch((error) => {
                res.status(400).send({
                    success: false,
                    data: null,
                    message: error
                });
            });
    },


    get_single_registration(req, res) {
        return MerchantRegistration
            .findByPk(req.params.id)
            .then((result) => {
                if (!result) {
                    return res.status(404).send({
                        success: false,
                        data: null,
                        message: 'Registered Merchant Not Found',
                    });
                }
                return res.status(200).send({
                    success: true,
                    data: result,
                    message: 'Merchant Registered fetched'
                });
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    },


    /*=======================================================================================================*/

    update_registration(req, res) {
        var reqdata = req.body;
        // console.log("req", reqdata)
        return MerchantRegistration
            .findByPk(req.params.id)
            .then(async result => {
                if (!result) {
                    return res.status(404).send({
                        success: false,
                        data: null,
                        message: 'Registered Merchant Not Found',
                    });
                }
                var merchant_type = await ValidationController.checkValidation(reqdata.merchant_type, "Merchant Type", "required");
                var business_name_var = await ValidationController.checkValidation(reqdata.business_name, "Business Name", "string", "50");
                var nature_of_business_var = await ValidationController.checkValidation(reqdata.nature_of_business, "Nature Of Business", "string");
                var home_street_number_var = await ValidationController.checkValidation(reqdata.home_street_number, "Home/street Number", "alphanum");
                var street_name_var = await ValidationController.checkValidation(reqdata.street_name, "Street Name", "string");
                var region_var = await ValidationController.checkValidation(reqdata.region, "Region", "string");
                var province_var = await ValidationController.checkValidation(reqdata.province, "Province", "string");
                var city_var = await ValidationController.checkValidation(reqdata.city, "City", "string");
                var barangay_var = await ValidationController.checkValidation(reqdata.barangay, "Barangay", "string");
                var business_mobile_var = await ValidationController.checkValidation(reqdata.business_mobile, "Business Mobile", "mobile");
                var business_document_var = await ValidationController.checkValidation(req.file, "Business Document", "image_upload");
                var user_type_var = await ValidationController.checkValidation(reqdata.user_type, "User Type", "required");
                var first_name_var = await ValidationController.checkValidation(reqdata.first_name, "First name", "string");
                var last_name_var = await ValidationController.checkValidation(reqdata.last_name, "Last Name", "string");
                var mobile_var = await ValidationController.checkValidation(reqdata.mobile, "Mobile", "mobile");
                var citizenship_var = await ValidationController.checkValidation(reqdata.citizenship, "Citizenship", "string");
                var email_var = await ValidationController.checkValidation(reqdata.email, "Email", "email");
                var settlement_method_var = await ValidationController.checkValidation(reqdata.settlement_method, "Settlement Method", "required");
                var status_var = await ValidationController.checkValidation(reqdata.status, "Status", "required");
                if (merchant_type.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: merchant_type.msg
                    });
                } else if (business_name_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: business_name_var.msg
                    });
                } else if (nature_of_business_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: nature_of_business_var.msg
                    });
                } else if (home_street_number_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: home_street_number_var.msg
                    });
                } else if (street_name_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: street_name_var.msg
                    });
                } else if (region_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: region_var.msg
                    });
                } else if (province_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: province_var.msg
                    });
                } else if (city_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: city_var.msg
                    });
                } else if (barangay_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: barangay_var.msg
                    });
                } else if (business_mobile_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: business_mobile_var.msg
                    });
                } else if (business_document_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: business_document_var.msg
                    });
                } else if (user_type_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: user_type_var.msg
                    });
                } else if ((reqdata.user_type != "Owner") && (reqdata.user_type != "Representative")) {
                    return res.json({
                        success: false,
                        data: null,
                        message: "User type should be either Owner or Representative"
                    });
                } else if (first_name_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: first_name_var.msg
                    });
                } else if (last_name_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: last_name_var.msg
                    });
                } else if (citizenship_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: citizenship_var.msg
                    });
                } else if (mobile_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: mobile_var.msg
                    });
                } else if (email_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: email_var.msg
                    });
                } else if (settlement_method_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: settlement_method_var.msg
                    });
                } else if (status_var.result == false) {
                    return res.json({
                        success: false,
                        data: null,
                        message: status_var.msg
                    });
                } else if ((reqdata.status != "Review") && (reqdata.status != "Completion") && (reqdata.status != "Approval") && (reqdata.status != "Approved") && (reqdata.status != "Rejected")) {
                    return res.json({
                        success: false,
                        data: null,
                        message: "Status should be Review, Completion, Approval, Approved, Rejected"
                    });
                } else {
                    if (reqdata.settlement_method == "ewallet") {
                        var ewallet_name_var = await ValidationController.checkValidation(reqdata.settlement_ewallet_name, "Wallet Name", "required");
                        var ewallet_account_name_var = await ValidationController.checkValidation(reqdata.settlement_ewallet_account_name, "Account Name", "string");
                        var ewallet_mobile_no_var = await ValidationController.checkValidation(reqdata.settlement_ewallet_mobile_no, "Mobile No", "mobile");
                        if (ewallet_name_var.result == false) {
                            return res.json({
                                success: false,
                                data: null,
                                message: ewallet_name_var.msg
                            });
                        }
                        if (ewallet_account_name_var.result == false) {
                            return res.json({
                                success: false,
                                data: null,
                                message: ewallet_account_name_var.msg
                            });
                        }
                        if (ewallet_mobile_no_var.result == false) {
                            return res.json({
                                success: false,
                                data: null,
                                message: ewallet_mobile_no_var.msg
                            });
                        }

                    }

                    if (reqdata.settlement_method == "bank") {
                        var bank_name_var = await ValidationController.checkValidation(reqdata.settlement_bank_name, "Bank Name", "string");
                        var bank_location_var = await ValidationController.checkValidation(reqdata.settlement_bank_location, "Bank Location", "string");
                        var bank_account_name_var = await ValidationController.checkValidation(reqdata.settlement_bank_account_name, "Account Name", "string");
                        var bank_account_no_var = await ValidationController.checkValidation(reqdata.settlement_bank_account_no, "Account No", "int");
                        if (bank_name_var.result == false) {
                            return res.json({
                                success: false,
                                data: null,
                                message: bank_name_var.msg
                            });
                        }
                        if (bank_location_var.result == false) {
                            return res.json({
                                success: false,
                                data: null,
                                message: bank_location_var.msg
                            });
                        }
                        if (bank_account_name_var.result == false) {
                            return res.json({
                                success: false,
                                data: null,
                                message: bank_account_name_var.msg
                            });
                        }
                        if (bank_account_no_var.result == false) {
                            return res.json({
                                success: false,
                                data: null,
                                message: bank_account_no_var.msg
                            });
                        }

                    }




                    return MerchantRegistration
                        .findByPk(req.params.id)
                        .then(data_set => {
                            var dev_data = req.body;

                            Merchant.findOne({
                                    where: { email: dev_data.email }
                                })
                                .then(async merchant_data => {
                                    merchant_data
                                        .update({
                                            status: reqdata.status,
                                        })
                                        .then(() => console.log("status updated"));
                                })
                                .catch((error) => res.status(400).send(error));

                            upload(req, res, function(err) {
                                if (err) {
                                    console.log(err);
                                    return res.end("Error uploading file.");
                                } else {
                                    reqdata.business_document = req.file.filename;
                                    return data_set
                                        .update({
                                            merchant_type: reqdata.merchant_type,
                                            business_name: reqdata.business_name,
                                            nature_of_business: reqdata.nature_of_business,
                                            home_street_number: reqdata.home_street_number,
                                            street_name: reqdata.street_name,
                                            region: reqdata.region,
                                            province: reqdata.province,
                                            city: reqdata.city,
                                            barangay: reqdata.barangay,
                                            business_mobile: reqdata.business_mobile,
                                            business_document: reqdata.business_document,
                                            user_type: reqdata.user_type,
                                            first_name: reqdata.first_name,
                                            last_name: reqdata.last_name,
                                            mobile: reqdata.mobile,
                                            citizenship: reqdata.citizenship,
                                            business_email: reqdata.email,
                                            settlement_method: reqdata.settlement_method,
                                            settlement_ewallet_name: reqdata.settlement_ewallet_name,
                                            settlement_ewallet_account_name: reqdata.settlement_ewallet_account_name,
                                            settlement_ewallet_mobile_no: reqdata.settlement_ewallet_mobile_no,
                                            settlement_bank_name: reqdata.settlement_bank_name,
                                            settlement_bank_location: reqdata.settlement_bank_location,
                                            settlement_bank_account_name: reqdata.settlement_bank_account_name,
                                            settlement_bank_account_no: reqdata.settlement_bank_account_no,
                                        })
                                        .then(() => res.status(200).send({
                                            success: true,
                                            data: dev_data,
                                            message: "Registration Updated Successfully"
                                        }))
                                        .catch((error) => {
                                            res.status(400).send({
                                                success: false,
                                                data: null,
                                                message: error
                                            });
                                        });
                                }

                            });
                        });

                }

            })
            .catch((error) => res.status(400).send(error));
    },


};