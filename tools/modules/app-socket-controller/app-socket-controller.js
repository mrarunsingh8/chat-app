var UserModal = require("./../user/userModal");
var AuthModal = require("./../auth/AuthModal");
var AppChatModal = require("./app-chat-modal");

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
	},

	SearchUserByTerm: (data) =>{
		return new Promise((resolve, reject)=>{
			UserModal.SearchUserByTerm(data).then((data)=>{
				resolve(data);
			}).catch((reason)=>{
				console.log("Error Reason", reason);
			});
		});
	},

	OpenUserChatRoom: (data)=>{
		return new Promise((resolve, reject)=>{
			AppChatModal.OpenUserChatRoom(data).then((respdata)=>{
				resolve(data);
			}).catch((reason)=>{
				console.log("Error Reson", reason);
			});
		});
	}	

};
module.exports = AppSocketController;
