var db = require('../../lib/dbConfig');

var AppChatModal = {

	currentUser: {id: 0},
	otherUser: {id: 0},
	getUserIdByToken: function(token){
		thisobj = this;
		return new Promise((resolve, reject)=>{
			db.all("SELECT id from user WHERE token=? ORDER BY id DESC",[token], (err, rows, fields)=>{
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
			db.all("SELECT id from user WHERE username=? ORDER BY id DESC", [username], (err, rows, fields)=>{
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
			db.all("SELECT COUNT(*) from chatroom WHERE (roomuser=? AND user=?) OR (roomuser=? AND user=?) ORDER BY id DESC", [], (err, rows, fields)=>{
	            if(err) reject(err);
	            resolve(rows, fields);
	        });
		});
	},

	isExistChatRoom: function(currentUser, otherUser){
		return new Promise((resolve, reject)=>{
			db.all("SELECT * FROM chatroom WHERE room_user=? AND user=? ORDER BY id DESC", [currentUser, otherUser], (err, rows, fields)=>{
                if(err) reject(err);
                if(rows.length > 0){
                	resolve(true);
                }else{
                	resolve(false);
                }
            });
		});
	},

	userToUserChatRoom: function(users){
		let thisOb = this;
		/*let isExistChatRoom(thisOb.currentUser, thisOb.otherUser).then((resp)=>{
			if(resp){

			}else{
				
			}
		});*/
	},

	OpenUserChatRoom: function(dataParams){
		let thisOb = this;
		var dataParams = (typeof dataParams == 'object')?dataParams:{currentUser: null, otherUser: null};
		return new Promise((resolve, reject)=>{
			if(dataParams.currentUser != '' && dataParams.otherUser != ''){
				var promiseCurrentUser = thisOb.getUserIdByToken(dataParams.currentUser);
				var promiseotherUser = thisOb.getUserIdByUsername(dataParams.otherUser);
				var promiseUserChatRoom = thisOb.userToUserChatRoom();
				Promise.all([promiseCurrentUser, promiseotherUser]).then(function(){
					console.log(thisOb.currentUser, thisOb.otherUser)
				});
			}
			/*if(typeof dataParams.otherUser == "string" && dataParams.otherUser != null && dataParams.otherUser.length > 0){
				let $terms = dataParams.terms;
                db.all("SELECT name, username, token FROM user WHERE name LIKE '%"+$terms+"%' OR username LIKE '%"+$terms+"%' ORDER BY name ASC", [], (err, rows, fields)=>{
                    if(err) reject(err);
                    resolve(rows, fields);
                });
			}else{
				resolve([]);
			}*/
		});
	}


}

module.exports = AppChatModal;