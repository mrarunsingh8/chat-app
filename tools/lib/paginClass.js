let paginClass = function(dataParams, results, totalCount){
	let self = this;
	const responseData = {
		status: 200,
		error: null,
		rows: 0,
		totalCount: 0,
		currentPage: 0,
		perPage: 10,
		nextPage: null,
		prevPage: null,
		totalPage: 0,
		response: [],

	};
	this.getPrevPage = function(){
		return (responseData.currentPage > 1)?(responseData.currentPage -1): null;
	}
	this.getTotalPage = function(){
		return Math.ceil(responseData.totalCount/responseData.perPage);
	}
	this.getNextPage = function(){
		return (self.getTotalPage() > responseData.currentPage)?(responseData.currentPage + 1):null;
	}

	this.init = function(){
		responseData.rows = results.length;
		responseData.totalCount = totalCount;
		responseData.currentPage = parseInt(dataParams.page),
		responseData.perPage = parseInt(dataParams.perPage);
		responseData.nextPage = self.getNextPage();
		responseData.prevPage = self.getPrevPage();
		responseData.totalPage = self.getTotalPage();
		responseData.response = results;
		return responseData;
	}
	return this.init();
}

module.exports = paginClass;