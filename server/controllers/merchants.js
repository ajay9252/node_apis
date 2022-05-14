const Merchant = require('../models').merchant;
const rh = require('../common').responseHandler;

module.exports = {

    const: checkValidation = (value, key, validation_type) => {
        if (validation_type == "string") {
            if (!value) {
                var obj = { result: false, msg: "Please enter " + key }
                return obj;
            } else if ((/^[a-zA-Z()]+$/).test(value) == false) {
                var obj = { result: false, msg: "Please enter string format of " + key }
                return obj;
            } else {
                var obj = { result: true, }
                return obj;
            }
        }

        if (validation_type == "int") {
            if (!value) {
                var obj = { result: false, msg: "Please enter " + key }
                return obj;
            } else if ((/^[0-9()]+$/).test(value) == false) {
                var obj = { result: false, msg: "Please enter numeric format of " + key }
                return obj;
            } else {
                var obj = { result: true, }
                return obj;
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

    },


    add_merchant(req, res) {

        var first_name = checkValidation(req.body.first_name, "First Name", "string");
        var last_name = checkValidation(req.body.last_name, "Last Name", "string");
        var address_id = checkValidation(req.body.address_id, "Address Id", "int");
        var business_id = checkValidation(req.body.business_id, "Business Id", "int");
        var profile_id = checkValidation(req.body.profile_id, "Profile Id", "int");
        var approved_by = checkValidation(req.body.approved_by, "Approved By", "int");
        var email = checkValidation(req.body.email, "E-Mail", "email");

        if (first_name.result == false) {
            return res.json({
                success: false,
                data: null,
                message: first_name.msg
            });
        } else if (last_name.result == false) {
            return res.json({
                success: false,
                data: null,
                message: last_name.msg
            });
        } else if (!req.body.merchant_name) {
            return res.json({
                success: false,
                data: null,
                message: "Please enter Merchant Code."
            });
        } else if (!req.body.merchant_code) {
            return res.json({
                success: false,
                data: null,
                message: "Please enter Merchant Name."
            });
        } else if (email.result == false) {
            return res.json({
                success: false,
                data: null,
                message: email.msg
            });
        } else if (!req.body.password) {
            return res.json({
                success: false,
                data: null,
                message: "Please enter Password."
            });
        } else if (address_id.result == false) {
            return res.json({
                success: false,
                data: null,
                message: address_id.msg
            });
        } else if (business_id.result == false) {
            return res.json({
                success: false,
                data: null,
                message: business_id.msg
            });
        } else if (profile_id.result == false) {
            return res.json({
                success: false,
                data: null,
                message: profile_id.msg
            });
        } else if (approved_by.result == false) {
            return res.json({
                success: false,
                data: null,
                message: approved_by.msg
            });
        } else {
            Merchant
                .create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    merchant_name: req.body.merchant_name,
                    merchant_code: req.body.merchant_code,
                    email: req.body.email,
                    password: req.body.password,
                    address_id: req.body.address_id,
                    business_id: req.body.business_id,
                    profile_id: req.body.profile_id,
                    approved_by: req.body.approved_by,
                    approved_at: req.body.approved_at,
                    convenience_setting: req.body.convenience_setting,
                    active: 1,
                })
                .then((note) => res.status(201).send({
                    success: true,
                    data: note,
                    message: "Data Saved Successfully"
                }))
                .catch((error) => {
                    res.status(400).send({
                        success: false,
                        data: null,
                        message: error
                    });
                });
        }
    },


    get_merchant(req, res) {
        return Merchant
            .findAll({
                where: { deletedAt: null },
                order: [
                    ['createdAt', 'DESC'],
                ],
            })
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

    get_merchant_by_id(req, res) {
        return Merchant
            .findByPk(req.params.id)
            .then((type) => {
                if (!type) {
                    return res.status(404).send({
                        success: false,
                        data: null,
                        message: 'Merchant Not Found',
                    });
                }
                return res.status(200).send({
                    success: true,
                    data: type,
                    message: "Data Fetched"
                });
            })
            .catch((error) => {
                res.status(400).send({
                    success: false,
                    data: null,
                    message: error
                });
            });
    },

    update_merchant(req, res) {
        return Merchant
            .findByPk(req.params.id)
            .then(type => {
                if (!type) {
                    return res.status(404).send({
                        success: false,
                        data: null,
                        message: 'Merchant Not Found',
                    });
                }
                return type
                    .update({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        merchant_name: req.body.merchant_name,
                        merchant_code: req.body.merchant_code,
                        email: req.body.email,
                        address_id: req.body.address_id,
                        business_id: req.body.business_id,
                        profile_id: req.body.profile_id,
                        convenience_setting: req.body.convenience_setting,
                        active: 1,
                    })
                    .then(() => res.status(200).send({
                        success: true,
                        data: type,
                        message: "Data Updated Successfully"
                    }))
                    .catch((error) => {
                        res.status(400).send({
                            success: false,
                            data: null,
                            message: error
                        });
                    });
            })
            .catch((error) => {
                res.status(400).send({
                    success: false,
                    data: null,
                    message: error
                });
            });
    },

    delete_merchant(req, res) {
        return Merchant
            .findByPk(req.params.id)
            .then(type => {
                if (!type) {
                    return res.status(404).send({
                        success: false,
                        data: null,
                        message: 'Merchant Not Found',
                    });
                }
                return type
                    .update({
                        deletedAt: Date.now(),
                    })
                    .then(() => res.status(200).send({
                        success: true,
                        data: type,
                        message: "Data Deleted Successfully"
                    }))
                    .catch((error) => {
                        res.status(400).send({
                            success: false,
                            data: null,
                            message: error
                        });
                    });
            })
            .catch((error) => {
                res.status(400).send({
                    success: false,
                    data: null,
                    message: error
                });
            });
    },






};