var UserModal = require("./../user/userModal");
var AuthModal = require("./../auth/AuthModal");
var AppChatModal = require("./app-chat-modal");

var AppSocketController = {

	connectUser: function(data){
		AppChatModal.ConnectUser(data).then((resp)=>{
		});
	},

	disconnectUser: (socketId)=>{
		AppChatModal.disconnectUser(socketId).then(function(resp){
		});	
	},

	getUser: (socData)=>{
		return new Promise((resolve, reject)=>{
			AppChatModal.getUserChatList(socData).then((data)=>{
				resolve(data);
			}).catch((reason)=>{
				console.log(reason);
			});
		});
	},

	AuthenticateUser: (data, callback)=>{
		AuthModal.isAuthenticateUserForChat(data).then((resp)=>{
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
				resolve(respdata);
			}).catch((reason)=>{
				console.log("Error Reson", reason);
			});
		});
	},

	LoadChatRoom: function(data){
		return new Promise((resolve, reject)=>{
			AppChatModal.LoadChatRoom(data).then((respdata)=>{
				resolve(respdata);
			}).catch((reason)=>{
				console.log("Error Reson", reason);
			});
		});
	},
	SaveChat: function(data){
		return new Promise((resolve, reject)=>{
			AppChatModal.SaveChat(data).then((respdata)=>{
				resolve(respdata);
			});
		});
	},

	logoutUser: function(data){
		return new Promise((resolve, reject)=>{
			AppChatModal.logoutUser(data).then((respdata)=>{
				resolve(respdata);
			});
		});
	},

	onUserTyping: function(data){
		return new Promise((resolve, reject)=>{
			UserModal.userDetailByUsername(data.showTypingForUser).then((userData)=>{
				resolve(userData);
			});
		});
	}

};
module.exports = AppSocketController;
