"use strict";

module.exports = function () {

  this.page = 1;

  if (!this.opts.pagination.dropdown) {
   	this.$refs.pagination.setPageHoang(parseInt((this.searchPage != null || !this.searchPage )? this.searchPage : 1));
  }
};