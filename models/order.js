"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "userRequestId",
      });
      Order.belongsTo(models.Image, {
        foreignKey: "imageId",
      });
      Order.belongsTo(models.Group, {
        foreignKey: "groupId",
      });
    }
  }

  Order.init(
    {
      date: {
        type: Date,
      },
      userRequestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User request ID is required",
          },
          notEmpty: {
            msg: "User request ID cannot be empty",
          },
        },
      },
      imageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      namaBarang: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Nama barang is required",
          },
          notEmpty: {
            msg: "Nama barang cannot be empty",
          },
        },
      },
      harga: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Harga is required",
          },
          notEmpty: {
            msg: "Harga cannot be empty",
          },
        },
      },
      jumlahOrder: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Jumlah order is required",
          },
          notEmpty: {
            msg: "Jumlah order cannot be empty",
          },
        },
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "group is required",
          },
          notEmpty: {
            msg: "group cannot be empty",
          },
        },
      },
      keterangan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Keterangan is required",
          },
          notEmpty: {
            msg: "Keterangan cannot be empty",
          },
        },
      },
      statusPengajuan: {
        type: DataTypes.STRING,
        values: ["Pending", "Approve", "Reject"],
        defaultValue: "Pending",
      },
      alasanReject: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );

  return Order;
};
