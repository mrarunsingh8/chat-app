var db = require('../../lib/dbConfig');

var userModal = {
    SearchUserByTerm: function(dataParams){
        var dataParams = (typeof dataParams == 'object')?dataParams:{terms: null};
        return new Promise((resolve, reject)=>{
            if(dataParams.terms != null){
                let $terms = dataParams.terms;
                db.all("SELECT name, username, token, lastSeen, isOnline FROM userTableView WHERE name LIKE '%"+$terms+"%' OR username LIKE '%"+$terms+"%' ORDER BY name ASC", [], (err, rows, fields)=>{
                    if(err) reject(err);
                    resolve(rows, fields);
                });
            }else{
                resolve([]);
            }
        });
    },
	getAllUser:function(dataParams){
        var dataParams = (typeof dataParams == 'object')?dataParams:{};
        dataParams = Object.assign({}, {startPage: (dataParams.startPage || 0), perPage: (dataParams.perPage || 10)}, dataParams);
        console.log(dataParams);
		return new Promise(function (resolve, reject) {
            db.all('SELECT *, (SELECT COUNT(*) from userTableView) as totalCount from userTableView ORDER BY id DESC LIMIT ?,?', [dataParams.startPage, dataParams.perPage], function(err, rows, fields) {
                if (err) reject(err);
                resolve(rows, fields);
            });
        })
	},
    userDetail:function(userId){
        return new Promise(function (resolve, reject) {
            db.all('SELECT * FROM userTableView WHERE id="'+userId+'"', function(err, rows, fields){
                if(err) reject(err);
                resolve(rows);
            });
        });
    },

    userDetailByUsername:function(userName){
        return new Promise(function (resolve, reject) {
            db.all('SELECT * FROM userTableView WHERE username="'+userName+'"', function(err, rows, fields){
                if(err) reject(err);
                if(rows.length){
                    resolve(rows[0]);
                }else{
                    resolve({});
                }
            });
        });
    },

    AddNewUser: function (userData) {
        return new Promise(function (resolve, reject) {
            db.run('INSERT INTO user (name, email, username, password, contact) VALUES(?,?,?,?,?) ', [userData.name, userData.email, userData.username, userData.password, userData.contact], function(err){
                if(err) reject(err);
                resolve({affectedRows: this.changes, insertId: this.lastID});
            });
        });
    },

    UpdateUser: function (userData, userId) {
        return new Promise(function (resolve, reject) {
            db.run('UPDATE user SET name=?, email=?, username=?, password=?, contact=? WHERE id=? ', [userData.name, userData.email, userData.username, userData.password, userData.contact, userId], function(err){
                if(err) reject(err);
                resolve({affectedRows: this.changes, updateId:userId});
            });
        });
    },

    DeleteUser: function (userId) {
        return new Promise(function (resolve, reject) {
            db.run('DELETE FROM userTableView  WHERE id="'+userId+'" ', function(err){
                if(err) reject(err);
                resolve({affectedRows: this.changes, deletedId:userId});
            });
        });
    }
}

module.exports = userModal;