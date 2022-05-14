'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Merchant extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Merchant.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        merchant_name: DataTypes.STRING,
        merchant_code: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        address_id: DataTypes.INTEGER, // for merchant address -> geolocation  // address table -> fields
        profile_id: DataTypes.INTEGER, // for merchant dashboard               // profile table -> fields profile settings 
        business_id: DataTypes.INTEGER, // for merchant business id            // business table -> fields business information (Including bank info)
        convenience_setting: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
        approved_by: DataTypes.STRING,
        approved_at: DataTypes.DATE,
        remember_token: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
        createdBY: DataTypes.INTEGER,
        updatedBY: DataTypes.INTEGER,
        deletedBY: DataTypes.INTEGER,
        status: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'merchant',
    });
    return Merchant;
};