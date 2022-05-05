const Order = require("../models/order.model.js");

exports.register = async (req, res) => {
	try{
		const newOrder = Order.create(req.body);
		
		if (!newOrder) {
			return res.status(400).send({
				message: "Error for create a order"
			});
		} else {
			return res.json(newOrder);
		}
	}catch(err){
		res.status(500).send({
			message: err.message
		});
	}
}

exports.findPaginate = (req, res) => {
    
	Order.findAll()
		.then(order => {
			let jsonResponse = {
				"list" : order.map(payload=>{
					payload.status = JSON.parse(payload.status);
					payload.client = JSON.parse(payload.client);
					payload.products = JSON.parse(payload.products);
					payload.total = JSON.parse(payload.total);
					payload.sellerCompany = JSON.parse(payload.sellerCompany);
					
					return payload;
				}).filter(item => item.client.cnpjoucpf === req.query.id )
			};
			res.status(200).send(jsonResponse);
		}).catch(err => {
			res.status(500).send({
				message: err.message
			});
		});    
};

exports.delete = function (req, res) {

	Order.destroy({where: {id: req.params.id}})
		.then(order => {
			if (!order) {
				return res.status(404).send({
					message: "Order not found with id " + req.params.id
				});
			}
			res.send({ message: "Order deleted successfully!" });
		}).catch(err => {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).send({
					message: "User not found with id " + req.params.id
				});
			}
			return res.status(500).send({
				message: "Could not delete order with id " + req.params.id
			});
		});
}