var jwt =  require('jsonwebtoken');
var db = require('../../lib/dbConfig');

let authModal = {
	data: {socketId: 0},
	isExistUsername:function(username){
		return new Promise(function (resolve, reject) {
            db.all(" SELECT * FROM user WHERE username=? ",[username], function(err, rows, fields){
                if (err) reject(err);
                if(rows.length){
                    resolve(true);
                }else{
                    resolve(false);
                }
            });
        });
	},
	isExistUsernamePassword:function(data){
		return new Promise(function (resolve, reject) {
            db.all(" SELECT * FROM user WHERE username=? AND password=? ", [data.username, data.password], function(err, rows, fields){
                if (err) reject(err);
                if(rows.length){
                    resolve({success:true, data:rows[0]});
                }else{
                    resolve({success:false, data:{}});
                }
            });
        });
	},
	getDateObjectToDateFormate(date){
		return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
	},
	setNewToken:function(userId, token, expTime){
		let self = this;
		let tokenExpTime = (typeof expTime == 'number' && expTime > 0)?expTime:5000;

		let getExpiretionTime= function(){
			let tokenExp = new Date();
			tokenExp = new Date(tokenExp.getTime()+(1000*tokenExpTime));
			return self.getDateObjectToDateFormate(tokenExp);
		}
		let tokenExpireIn = getExpiretionTime();
		if(token != null){
			db.run("UPDATE user SET token=?, tokenExpireIn=?, socketId=?, isOnline=?  WHERE id=? ", [token, tokenExpireIn, self.data.socketId, 'Y', userId], function(err, rows, fields){
				if(err) throw err;
			});
		}
	},
	generateNewToken:function(result){
		let tokenExpireTime = 60*60*24;
		token=jwt.sign({username:result.data.username},process.env.SECRET_KEY,{
            expiresIn: tokenExpireTime,
        });
		this.setNewToken(result.data.id, token, tokenExpireTime);
		return token;
	},
	validateToken:function(result, callback){
		let token=null;
		if(result.data.token.length > 10){

		}else{
			token = this.generateNewToken(result);
		}
		callback({success:true,token:token});
	},
	isAuthenticateUser:function(data){
		let self = this;
		return new Promise(function (resolve, reject) {
			self.isExistUsername(data.username).then(function(isExistUser){
				if(isExistUser){
					self.isExistUsernamePassword(data).then(function(result){
                        if(result.success){
                            self.validateToken(result, function(responce){
                                resolve(responce);
                            });
                        }else{
                            let res = {success:false,message:'Authentication failed. Passwords did not match.'};
                            resolve(res);
                        }
                    }).catch(function (reason) {
                        throw reason;
					});
                }else{
                    let res = {success:false,message:'Authentication failed. User not found.'};
                    resolve(res);
                }
            }).catch(function (reason) {
            	throw reason;
			});
        });
	},


	validateTokenForChat:function(result, callback){
		let token=null;
		token = this.generateNewToken(result);
		callback({success:true,token:token});
	},

	isAuthenticateUserForChat:function(data){
		let self = this;
		self.data = Object.assign({}, data);
		return new Promise(function (resolve, reject) {
			self.isExistUsername(data.username).then(function(isExistUser){
				if(isExistUser){
					self.isExistUsernamePassword(data).then(function(result){
                        if(result.success){
                            self.validateTokenForChat(result, function(responce){
                                resolve(responce);
                            });
                        }else{
                            let res = {success:false,message:'Authentication failed. Passwords did not match.'};
                            resolve(res);
                        }
                    }).catch(function (reason) {
                        throw reason;
					});
                }else{
                    let res = {success:false,message:'Authentication failed. User not found.'};
                    resolve(res);
                }
            }).catch(function (reason) {
            	throw reason;
			});
        });
	}
}

module.exports = authModal;
