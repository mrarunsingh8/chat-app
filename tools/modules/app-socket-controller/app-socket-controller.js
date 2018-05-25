var UserModal = require("./../user/userModal");
var AuthModal = require("./../auth/AuthModal");

var AppSocketController = {

	getUser: (resolve, reject)=>{
		UserModal.getAllUser().then((data)=>{
			resolve(data);
		}).catch((reason)=>{
			console.log(reason);
		});
	},

	AuthenticateUser: (data, callback)=>{
		AuthModal.isAuthenticateUserForChat(data).then((resp)=>{
			console.log(resp); 
			callback(resp);
		});
	}

};
module.exports = AppSocketController;
