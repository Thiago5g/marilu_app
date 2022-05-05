const Budget = require("../models/budget.model.js");
const Sequelize = require("sequelize");
const dbConfig = require("../config/database.mssql");
const Order = require("../models/order.model.js");
const ServiceERP = require("../services/approveERP.js");
const cloneObject = require("../util/cloneObject.js");
// const axios = require("axios");
const connection = new Sequelize(dbConfig);

exports.register = async (req, res) => {

	const { body: payload } = req;

	const isBlocked = payload.status[0].status === "blocked";
	
	//FAZENDO A CONVERSÃO DOS OBJETOS PARA STRING PARA GRAVAR NO MYSQL
	payload.status = JSON.stringify(payload.status);
	payload.client = JSON.stringify(payload.client);
	payload.products = JSON.stringify(payload.products);
	payload.total = JSON.stringify(payload.total);
	payload.sellerCompany = JSON.stringify(payload.sellerCompany);


	try {
		const { dataValues } = await Budget.create(payload);
		if (dataValues) {
			let resultERP
			if (isBlocked) {
				dataValues.option = 3;
				resultERP = await ServiceERP.approveERP(dataValues);
				if (resultERP.status !== "success") resultERP = "Erro ao enviar o e-mail apra avisar sobre bloqueio";
			}
			return res.json({ create: "success", data: dataValues, triggerEmail: resultERP });
		} else {
			return res.status(400).send({
				message: "cannot possible create this budget",
			});
		}
	} catch (err) {
		res.status(500).send({
			message: err.message,
		});
	}
};

exports.update = (req, res) => {
	const { payload } = req.body;

	const isBlocked = payload.status[payload.status.length - 1].status === "blocked";

	//FAZENDO A CONVERSÃO DOS OBJETOS PARA STRING PARA GRAVAR NO MYSQL
	payload.status = JSON.stringify(payload.status);
	payload.client = JSON.stringify(payload.client);
	payload.products = JSON.stringify(payload.products);
	payload.total = JSON.stringify(payload.total);
	payload.sellerCompany = JSON.stringify(payload.sellerCompany);

	Budget.update(payload, { where: { id: payload.id } })
		.then(async (budget) => {
			if (!budget) {
				return res.status(404).send({
					message: "Budget not found with id " + payload.id,
				});
			}
			let resultERP;
			if (isBlocked) {
				payload.option = 3;
				resultERP = await ServiceERP.approveERP(payload);
				if (resultERP.status !== "success") resultERP = "Erro ao enviar o e-mail para avisar sobre bloqueio";
			}
			res.send({ update: "success", triggerEmail: resultERP });
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: "Budget not found with id " + payload.id,
				});
			}
			return res.status(500).send({
				alert: "Error updating user with id " + payload.id,
				message: err.message
			});
		});
};

exports.delete = function (req, res) {
	Budget.destroy({ where: { id: req.params.id } })
		.then((budget) => {
			if (!budget) {
				return res.status(404).send({
					message: "Budget not found with id " + req.params.id,
				});
			}
			res.send({ message: "Budget deleted successfully!" });
		})
		.catch((err) => {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).send({
					message: "User not found with id " + req.params.id,
				});
			}
			return res.status(500).send({
				message: "Could not delete budget with id " + req.params.id,
			});
		});
};

exports.approve = async (req, res) => {
	try {
		const { payload } = req.body;

		payload.status.push({ status: "approved", date: Date.now() });

		//FAZENDO A CONVERSÃO DOS OBJETOS PARA STRING PARA GRAVAR NO MYSQL
		payload.status = JSON.stringify(payload.status);
		payload.client = JSON.stringify(payload.client);
		payload.products = JSON.stringify(payload.products);
		payload.total = JSON.stringify(payload.total);
		payload.sellerCompany = JSON.stringify(payload.sellerCompany);

		const budget = await Budget.update(payload, {
			where: { id: payload.id },
		});
		if (!budget) {
			return res.status(404).send({
				message: "Budget not found with id " + payload.id,
			});
		} else {
			payload.fk_budget = payload.id;
			payload.option = 1;
			delete payload.id;
			delete payload.createdAt;
			delete payload.updatedAt;

			const resultERP = await ServiceERP.approveERP(cloneObject(payload));

			if (resultERP.status !== "success") return res.send({ error: true }).status(500);

			payload.orderServer = resultERP.content.Pedido;

			let newOrder = await Order.create(payload);

			if (!newOrder) {
				return res.status(400).send({
					message: "Error to create order",
				});
			} else {
				res.send(resultERP).status(200);
			}
		}
	} catch (err) {
		return res.status(500).send({
			message: err.message,
		});
	}
};