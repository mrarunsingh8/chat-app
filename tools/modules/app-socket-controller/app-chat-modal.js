var db = require('../../lib/dbConfig');

var AppChatModal = {
	currentUser: {id: 0},
	otherUser: {id: 0},
	userChatRoomId: 0,

	ConnectUser: function(data){
		thisOb = this;
		return new Promise((resolve, reject)=>{
			db.run("UPDATE user SET isOnline=?, socketId=? where token=?", ['Y', data.socketId, data.token], function(err){
				if(err) console.log(err);
				resolve({action: "OnConnection", affectedRows: this.changes, updateId: data.token});
			});
		});
	},

	disconnectUser: function(socketId){
		thisOb = this;
		return new Promise((resolve, reject)=>{
			var lastSeen = thisOb.getDateObjectToDateFormate(new Date());
			db.run("UPDATE user SET lastSeen=?, isOnline=? where socketId=?", [lastSeen, 'N', socketId], function(err){
				if(err) console.log(err);
				resolve({affectedRows: this.changes, updateId: socketId});
			});
		});
	},


	getUserChatList:function(dataParams){
        var dataParams = (typeof dataParams == 'object')?dataParams:{};
        dataParams = Object.assign({}, {token: '', startPage: (dataParams.startPage || 0), perPage: (dataParams.perPage || 10)}, dataParams);
		return new Promise(function (resolve, reject) {
            db.all('SELECT *, (SELECT COUNT(*) from userTableView) as totalCount from userTableView ORDER BY id DESC LIMIT ?,?', [dataParams.startPage, dataParams.perPage], function(err, rows, fields) {
                if (err) reject(err);
                resolve(rows, fields);
            });
        })
	},

	getUserIdByToken: function(token){
		thisobj = this;
		return new Promise((resolve, reject)=>{
			db.all("SELECT id from userTableView WHERE token=? ORDER BY id DESC",[token], (err, rows, fields)=>{
	            if(err) reject(err);
	            if(rows.length > 0){
	            	thisobj.currentUser.id = rows[0].id;
	            	resolve(thisobj.currentUser);
	            }else{
	            	thisobj.currentUser.id = 0;
	            	resolve(thisobj.currentUser);
	            }
	        });
		});
	},

	getUserIdByUsername: function(username){
		thisobj = this;
		return new Promise((resolve, reject)=>{
			db.all("SELECT id from userTableView WHERE username=? ORDER BY id DESC", [username], (err, rows, fields)=>{
	            if(err) reject(err);
	            if(rows.length > 0){
	            	thisobj.otherUser.id = rows[0].id;
	            	resolve(thisobj.otherUser);
	            }else{
	            	thisobj.otherUser.id = 0;
	            	resolve(thisobj.otherUser);
	            }
	        });
		});
	},

	CheckExistChatRoom: function(){
		return new Promise((resolve, reject)=>{
			db.all("SELECT COUNT(*) from chatRoomTableView WHERE (roomuser=? AND user=?) OR (roomuser=? AND user=?) ORDER BY id DESC", [], (err, rows, fields)=>{
	            if(err) reject(err);
	            resolve(rows, fields);
	        });
		});
	},

	isExistChatRoom: function(currentUser, otherUser){
		return new Promise((resolve, reject)=>{
			db.all("SELECT id FROM chatRoomTableView WHERE (room_user=? AND user=?) OR (room_user=? AND user=?) ORDER BY id DESC", [currentUser, otherUser, otherUser, currentUser], (err, rows, fields)=>{
                if(rows.length > 0){
	            	thisobj.userChatRoomId = rows[0].id;
	            	resolve(thisobj.userChatRoomId);
	            }else{
	            	thisobj.userChatRoomId = 0;
	            	resolve(thisobj.userChatRoomId);
	            }
            });
		});
	},


	getDateObjectToDateFormate(date){
		return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
	},

	createChatRoom: function(currentUser, otherUser){
		let thisOb = this;
		return new Promise((resolve, reject)=>{
			let dateTime = thisOb.getDateObjectToDateFormate(new Date());
			db.run('INSERT INTO chatroom (room_user, user, dateTime) VALUES(?,?,?) ', [currentUser, otherUser, dateTime], function(err){
                if(err) reject(err);
                thisOb.userChatRoomId = this.lastID;
                resolve({affectedRows: this.changes, insertId: this.lastID});
            });
		});
	},

	userToUserChatRoom: function(){
		let thisOb = this;
		return new Promise((resolve, reject)=>{
			thisOb.isExistChatRoom(thisOb.currentUser.id, thisOb.otherUser.id).then((resp)=>{
				if(parseInt(resp) > 0){
					resolve(resp);
				}else{
					thisOb.createChatRoom(thisOb.currentUser.id, thisOb.otherUser.id).then((resp)=>{
						resolve(resp);
					});
				}
			});
		});
	},

	OpenUserChatRoom: function(dataParams){
		let thisOb = this;
		dataParams = (typeof dataParams == 'object')?(dataParams):({currentUser: null, otherUser: null});
		return new Promise((resolve, reject)=>{
			if(dataParams.currentUser != '' && dataParams.otherUser != ''){
				thisOb.getUserIdByToken(dataParams.currentUser).then(()=>{
					thisOb.getUserIdByUsername(dataParams.otherUser).then(()=>{
						thisOb.userToUserChatRoom().then((res)=>{
							resolve(thisOb.userChatRoomId);
						});
					});
				});
			}
		});
	},

	getChatData: function(){
		let thisOb = this;
		return new Promise((resolve, reject)=>{
			db.all("SELECT id, chatText,dateTime, isDeleted, isRead,(CASE WHEN chatDataTableView.sender = ? THEN 'snd' ELSE 'rcv' END) as type FROM chatDataTableView WHERE (sender=? AND reciever=?) OR (sender=? AND reciever=?) ORDER BY id ASC limit 0, 60", [thisOb.currentUser.id, thisOb.currentUser.id, thisOb.otherUser.id, thisOb.otherUser.id, thisOb.currentUser.id], (err, rows, fields)=>{
                resolve(rows);
            });
		});
	},

	LoadChatRoom: function(dataParams){
		let thisOb = this;
		dataParams = (typeof dataParams == 'object')?(dataParams):({currentUser: null, otherUser: null, chatRoom: 0});
		return new Promise((resolve, reject)=>{
			if(dataParams.currentUser != '' && dataParams.otherUser != ''){
				thisOb.getUserIdByToken(dataParams.currentUser).then(()=>{
					thisOb.getUserIdByUsername(dataParams.otherUser).then(()=>{
						thisOb.getChatData().then((rowsData)=>{
							resolve(rowsData);
						});
					});
				});
			}
		});
	},

	insertChat: function(data){
		let thisOb = this;
		return new Promise((resolve, reject)=>{
			db.run('INSERT INTO chatdata (sender, reciever, chatText, dateTime) VALUES(?,?,?,?) ', [thisOb.currentUser.id, thisOb.otherUser.id, data.chatText, data.dateTime], function(err){
                if(err) reject(err);
                resolve({affectedRows: this.changes, insertId: this.lastID});
            });
		});
	},

	SaveChat: function(dataParams){
		let thisOb = this;
		dataParams = (typeof dataParams == 'object')?(dataParams):({currentUser: null, otherUser: null, chatRoom: 0});
		return new Promise((resolve, reject)=>{
			if(dataParams.currentUser != '' && dataParams.otherUser != ''){
				thisOb.getUserIdByToken(dataParams.currentUser).then(()=>{
					thisOb.getUserIdByUsername(dataParams.otherUser).then(()=>{
						thisOb.insertChat({chatText: dataParams.chatText, dateTime: dataParams.dateTime}).then((resp)=>{
							resolve(resp);
						});
					});
				});
			}
		});
	},

	logoutUser: function(dataParams){
		let thisOb = this;
		dataParams = (typeof dataParams == 'object')?(dataParams):({token: null});
		return new Promise((resolve, reject)=>{
			if(dataParams.token != ''){
				db.run('UPDATE user SET lastSeen=?, isOnline=? WHERE token=? ', [thisOb.getDateObjectToDateFormate(new Date()), 'N', dataParams.token], function(err){
	                if(err) reject(err);
	                resolve({affectedRows: this.changes, updateId: dataParams.token});
	            });
			}
		});
	}


}

module.exports = AppChatModal;