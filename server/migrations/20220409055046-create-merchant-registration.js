'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('merchant_registrations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            temp_record: {
                allowNull: true,
                type: Sequelize.STRING
            },
            term_condition: {
                allowNull: true,
                type: Sequelize.STRING
            },
            data_privacy: {
                allowNull: true,
                type: Sequelize.STRING
            },
            merchant_type: {
                allowNull: true,
                type: Sequelize.STRING
            },
            first_name: {
                allowNull: true,
                type: Sequelize.STRING
            },
            last_name: {
                allowNull: true,
                type: Sequelize.STRING
            },
            mobile: {
                allowNull: true,
                type: Sequelize.STRING
            },
            business_name: {
                allowNull: true,
                type: Sequelize.STRING
            },
            nature_of_business: {
                allowNull: true,
                type: Sequelize.STRING
            },
            home_street_number: {
                allowNull: true,
                type: Sequelize.STRING
            },
            street_name: {
                allowNull: true,
                type: Sequelize.STRING
            },
            barangay: {
                allowNull: true,
                type: Sequelize.STRING
            },
            city: {
                allowNull: true,
                type: Sequelize.STRING
            },
            postal_code: {
                allowNull: true,
                type: Sequelize.STRING
            },
            province: {
                allowNull: true,
                type: Sequelize.STRING
            },
            region: {
                allowNull: true,
                type: Sequelize.STRING
            },
            business_mobile: {
                allowNull: true,
                type: Sequelize.STRING
            },
            business_email: {
                allowNull: true,
                type: Sequelize.STRING
            },
            business_first_name: {
                allowNull: true,
                type: Sequelize.STRING
            },
            business_last_name: {
                allowNull: true,
                type: Sequelize.STRING
            },
            business_address: {
                allowNull: true,
                type: Sequelize.STRING
            },
            citizenship: {
                allowNull: true,
                type: Sequelize.STRING
            },
            id_type: {
                allowNull: true,
                type: Sequelize.STRING
            },
            photo_of_id: {
                allowNull: true,
                type: Sequelize.STRING
            },
            business_document: {
                allowNull: true,
                type: Sequelize.STRING
            },
            password: {
                allowNull: true,
                type: Sequelize.STRING
            },
            settlement_method: {
                allowNull: true,
                type: Sequelize.STRING
            },
            settlement_ewallet_name: {
                allowNull: true,
                type: Sequelize.STRING
            },
            settlement_ewallet_account_name: {
                allowNull: true,
                type: Sequelize.STRING
            },
            settlement_ewallet_mobile_no: {
                allowNull: true,
                type: Sequelize.STRING
            },
            settlement_bank_name: {
                allowNull: true,
                type: Sequelize.STRING
            },
            settlement_bank_location: {
                allowNull: true,
                type: Sequelize.STRING
            },
            settlement_bank_account_name: {
                allowNull: true,
                type: Sequelize.STRING
            },
            settlement_bank_account_no: {
                allowNull: true,
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },



        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('merchant_registrations');
    }
};