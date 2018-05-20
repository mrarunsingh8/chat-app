var db = require('../../lib/dbConfig');

var userModal = {
	getAllUser:function(dataParams){
        var dataParams = (typeof dataParams == 'object')?dataParams:{};
        dataParams = Object.assign({}, {startPage: (dataParams.startPage || 0), perPage: (dataParams.perPage || 10)}, dataParams);
        console.log(dataParams);
		return new Promise(function (resolve, reject) {
            db.all('SELECT *, (SELECT COUNT(*) from user) as totalCount from user ORDER BY id DESC LIMIT ?,?', [dataParams.startPage, dataParams.perPage], function(err, rows, fields) {
                if (err) reject(err);
                resolve(rows, fields);
            });
        })
	},
	userDetail:function(userId){
		return new Promise(function (resolve, reject) {
            db.all('SELECT * FROM user WHERE id="'+userId+'"', function(err, rows, fields){
                if(err) reject(err);
                resolve(rows);
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
            db.run('DELETE FROM user  WHERE id="'+userId+'" ', function(err){
                if(err) reject(err);
                resolve({affectedRows: this.changes, deletedId:userId});
            });
        });
    }
}

module.exports = userModal;