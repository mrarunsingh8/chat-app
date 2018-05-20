var db = require('../../lib/dbConfig');

var authorModal = {
	getAllAuthor:function(dataParams){
        var dataParams = (typeof dataParams == 'object')?dataParams:{};
        dataParams = Object.assign({}, {startPage: (dataParams.startPage || 0), perPage: (dataParams.perPage || 10)}, dataParams);
		return new Promise(function (resolve, reject) {
            db.all('SELECT *, (SELECT COUNT(*) from author) as totalCount from author ORDER BY id DESC LIMIT ?,? ', [dataParams.startPage, dataParams.perPage], function(err, rows, fields) {
                if (err) reject(err);
                resolve(rows, fields);
            });
        })
	},
	authorDetail:function(authorId){
		return new Promise(function (resolve, reject) {
            db.all('SELECT * FROM author WHERE id="'+authorId+'"', function(err, rows, fields){
                if(err) reject(err);
                resolve(rows);
            });
        });
	},

    AddNewAuthor: function (authorData) {
        return new Promise(function (resolve, reject) {
            console.log("Inserted");
            db.run('INSERT INTO author (name, email, number, about, description, gender) VALUES(?,?,?,?,?, ?) ', [authorData.name, authorData.email, authorData.number, authorData.about, authorData.description, authorData.gender], function(err){
                if(err) reject(err);
                resolve({affectedRows: this.changes, insertId: this.lastID});
            });
        });
    },

    UpdateAuthor: function (authorData, authorId) {
        return new Promise(function (resolve, reject) {
            db.run('UPDATE author SET name=?, email=?, number=?, about=?, description=?, gender=? WHERE id=? ', [authorData.name, authorData.email, authorData.number, authorData.about, authorData.description, authorData.gender , authorId], function(err){
                if(err) reject(err);
                resolve({affectedRows: this.changes, updateId:authorId});
            });
        });
    },

    DeleteAuthor: function (authorId) {
        return new Promise(function (resolve, reject) {
            db.run('DELETE FROM author  WHERE id="'+authorId+'" ', function(err){
                if(err) reject(err);
                resolve({affectedRows: this.changes, deletedId:authorId});
            });
        });
    }
}

module.exports = authorModal;