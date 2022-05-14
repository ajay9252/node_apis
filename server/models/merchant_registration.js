'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class merchant_registration extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    merchant_registration.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        temp_record: DataTypes.STRING,
        term_condition: DataTypes.STRING,
        data_privacy: DataTypes.STRING,
        lat: DataTypes.STRING,
        long: DataTypes.STRING,
        merchant_type: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        mobile: DataTypes.STRING,
        business_name: DataTypes.STRING,
        nature_of_business: DataTypes.STRING,
        home_street_number: DataTypes.STRING,
        street_name: DataTypes.STRING,
        barangay: DataTypes.STRING,
        city: DataTypes.STRING,
        postal_code: DataTypes.STRING,
        province: DataTypes.STRING,
        region: DataTypes.STRING,
        business_mobile: DataTypes.STRING,
        business_email: DataTypes.STRING,
        business_first_name: DataTypes.STRING,
        business_last_name: DataTypes.STRING,
        business_address: DataTypes.STRING,
        citizenship: DataTypes.STRING,
        id_type: DataTypes.STRING,
        photo_of_id: {
            type: DataTypes.STRING,
            get() {
                return image_path + this.getDataValue('photo_of_id')
            }
        },
        business_document: {
            type: DataTypes.STRING,
            get() {
                return image_path + this.getDataValue('business_document')
            }
        },
        password: DataTypes.STRING,
        settlement_method: DataTypes.STRING,
        settlement_ewallet_name: DataTypes.STRING,
        settlement_ewallet_account_name: DataTypes.STRING,
        settlement_ewallet_mobile_no: DataTypes.STRING,
        settlement_bank_name: DataTypes.STRING,
        settlement_bank_location: DataTypes.STRING,
        settlement_bank_account_name: DataTypes.STRING,
        settlement_bank_account_no: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'merchant_registration',
    });
    return merchant_registration;
};