const Client = require("../models/clients.model");

module.exports = {
	index: async (req, res) => {
		try {
			const clients = await Client.findAll();
			const cleanClients = clients.map((row) => {
				const clientObject = {}
				const dataEntries = Object.entries(row.dataValues)
				dataEntries.map(([key, value]) => {
					clientObject[key] = String(value).trim()
					return false
				})
				return clientObject
			})
			return res.json({ clientList: cleanClients })
		} catch (error) {
			return res.status(500).json({ error: true, message: error.message })
		}
	}
}
