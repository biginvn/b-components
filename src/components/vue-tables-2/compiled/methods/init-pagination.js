"use strict";

module.exports = function () {

  this.page = 1;

  if (!this.opts.pagination.dropdown) {
    if(this.searchPage != null && this.searchPage != undefined ){
    	this.$refs.pagination.setPageHoang(parseInt(this.searchPage));
  	}else{
  		console.log('The "searchPage" must be fill out full !')
  	}
  }
};