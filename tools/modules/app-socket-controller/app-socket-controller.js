var UserModal = require("./../user/userModal");

var AppSocketController = {

	getUser: (resolve, reject)=>{
		UserModal.getAllUser().then((data)=>{
			resolve(data);
		}).catch((reason)=>{
			console.log(reason);
		});
	}

};

module.exports = AppSocketController;
