const axios = require("axios");
const approveERP = async (data, parseJson = true) => {
	if(parseJson){
		data.client = JSON.parse(data.client);
		data.products = JSON.parse(data.products);
		data.total = JSON.parse(data.total);
		data.status = JSON.parse(data.status);
	}
	console.log("data",data);
	try{
		const result = await axios.post("http://localhost:8099/rest/WSRESTACTIONSORDER",data);
		if(result.status === 200) return {status: "success", content: result.data}
		else return {status: "error"}
	}catch(e){
		return {status: "error", message: e.message}
	}
}

module.exports = {approveERP}