const { Order, User, Image, Group } = require("../models");
const { NotFoundError } = require("../errors");

module.exports = {
  createOrder: async (req, res) => {
    const {
      userRequestId,
      namaBarang,
      harga,
      jumlahOrder,
      groupId,
      keterangan,
    } = req.body;

    const createOrder = await Order.create({
      date: new Date(),
      userRequestId,
      namaBarang,
      harga,
      jumlahOrder,
      groupId,
      keterangan,
    });

    return createOrder;
  },

  getAllOrder: async (req, res) => {
    const result = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "id"],
        },
      ],
    });

    return result;
  },

  getOneOrder: async (req, res) => {
    const { id } = req.params;

    const result = await Order.findOne({
      where: { id },
      include: [
        {
          model: User,
          attribubtes: ["name", "id"],
        },
        {
          model: Image,
          attribubtes: ["name", "id"],
        },
        {
          model: Group,
          attribubtes: ["name", "id"],
        },
      ],
    });

    if (!result) throw new NotFoundError(`Tidak ada Order dengan id :  ${id}`);

    return result;
  },

  updateOrder: async (req, res) => {
    const { id } = req.params;

    const { imageId } = req.body;

    const check = await Order.findOne({ where: { id } });

    if (!check) throw new NotFoundError(`Tidak ada Order dengan id :  ${id}`);

    const result = await Order.update({ imageId }, { where: { id } });

    return result;
  },

  deleteOrder: async (req, res) => {
    const { id } = req.params;

    const result = await Order.destroy({
      where: { id },
    });

    if (!result) throw new NotFoundError(`Tidak ada Order dengan id :  ${id}`);

    return result;
  },

  RejectedOrder: async (req, res) => {
    const { id } = req.params;
    const { statusPengajuan, alasanReject } = req.body;

    const updateStatusPengajuan = alasanReject ? "Reject" : statusPengajuan;

    const result = await Order.update(
      {
        statusPengajuan: updateStatusPengajuan,
        alasanReject,
      },
      {
        where: { id },
      }
    );

    return result;
  },

  ApproveOrder: async (req, res) => {
    const { id } = req.params;

    const result = await Order.update(
      {
        statusPengajuan: "Approve",
      },
      {
        where: { id },
      }
    );

    return result;
  },

  CountAllApprove: async (req, res) => {
    const CountAllApprove = await Order.count({
      where: {
        statusPengajuan: "Approve",
      },
    });

    return CountAllApprove;
  },

  CountAllReject: async (req, res) => {
    const CountAllReject = await Order.count({
      where: {
        statusPengajuan: "Reject",
      },
    });

    return CountAllReject;
  },
};
