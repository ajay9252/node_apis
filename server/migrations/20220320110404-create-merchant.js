'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('merchants', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            first_name: {
                type: Sequelize.STRING
            },
            last_name: {
                type: Sequelize.STRING
            },
            merchant_name: {
                type: Sequelize.STRING
            },
            merchant_code: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            address_id: {
                type: Sequelize.INTEGER
            },
            profile_id: {
                type: Sequelize.INTEGER
            },
            business_id: {
                type: Sequelize.INTEGER
            },
            convenience_setting: {
                type: Sequelize.STRING
            },
            active: {
                type: Sequelize.BOOLEAN
            },
            approved_by: {
                type: Sequelize.STRING
            },
            approved_at: {
                type: Sequelize.DATE,
                timestamps: true,
                underscored: true
            },
            remember_token: {
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
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            createdBY: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            updatedBY: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            deletedBY: {
                allowNull: true,
                type: Sequelize.INTEGER
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('merchants');
    }
};