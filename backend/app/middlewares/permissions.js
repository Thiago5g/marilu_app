exports.typeAdmin = function(req, res, next) {
	req.protectedf = true;
	next();
	return;
}
exports.typeStandard = function(req, res, next) {
	req.protectedf = false;
	next();
	return;
}
exports.havePermissions = function(req, res, next) {

	try {
		let havePermission = false;
		for(let i=0; i<req.user.role.length; i++)
		{
			if(req.user.role[i].name == "ADMIN" || (req.user.role[i].name == "Standard" && !req.protectedf))
			{
				havePermission = true;
			}
		}
		if(!havePermission)
		{
			return res.status(400).json({
				error: {
					msg: "Without permission!"
				}
			});
		}
	}
	catch(err) {
		return res.status(400).json({
			error: {
				msg: "Without permission!"
			}
		});
	}
	next();
	return;
}