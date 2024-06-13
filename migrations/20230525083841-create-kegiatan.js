"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE,
      },
      userRequestId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      imageId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Images",
          key: "id",
        },
      },
      groupId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Groups",
          key: "id",
        },
      },
      namaBarang: {
        type: Sequelize.STRING,
      },
      harga: {
        type: Sequelize.STRING,
      },
      jumlahOrder: {
        type: Sequelize.STRING,
      },
      keterangan: {
        type: Sequelize.STRING,
      },
      statusPengajuan: {
        type: Sequelize.STRING,
      },
      alasanReject: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
