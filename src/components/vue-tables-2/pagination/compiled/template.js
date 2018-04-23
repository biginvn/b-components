'use strict';

module.exports = function () {

  return function (h) {

    var theme = this.Theme;
    var prevChunk = '';
    var nextChunk = '';
    var firstPage = '';
    var lastPage = '';
    var items = this.pages.map(function (page) {

      return h(
        'li',
        { 'class': 'VuePagination__pagination-item ' + theme.item + ' ' + this.activeClass(page) },
        [h(
          'a',
          { 'class': 'btable-link-page ' + theme.link + ' ' + this.activeClass(page),
            attrs: { href: 'javascript:void(0)',
              role: 'button'
            },
            on: {
              'click': this.setPage.bind(this, page)
            }
          },
          [page]
        )]
      );
    }.bind(this));

    if (this.opts.edgeNavigation && this.totalChunks > 1) {
      firstPage = h(
        'li',
        { 'class': 'VuePagination__pagination-item ' + theme.item + ' ' + (this.page === 1 ? theme.disabled : '') + ' VuePagination__pagination-item-prev-chunk' },
        [h(
          'a',
          { 'class': theme.link,
            attrs: { href: 'javascript:void(0);',
              disabled: this.page === 1,
              role: 'button'
            },
            on: {
              'click': this.setPage.bind(this, 1)
            }
          },
          [this.opts.texts.first]
        )]
      );

      lastPage = h(
        'li',
        { 'class': 'VuePagination__pagination-item ' + theme.item + ' ' + (this.page === this.totalPages ? theme.disabled : '') + ' VuePagination__pagination-item-prev-chunk' },
        [h(
          'a',
          { 'class': theme.link,
            attrs: { href: 'javascript:void(0);',
              disabled: this.page === this.totalPages,
              role: 'button'
            },
            on: {
              'click': this.setPage.bind(this, this.totalPages)
            }
          },
          [this.opts.texts.last]
        )]
      );
    }

    if (this.opts.chunksNavigation === 'fixed') {

      prevChunk = h(
        'li',
        { 'class': 'VuePagination__pagination-item ' + theme.item + ' ' + theme.prev + ' VuePagination__pagination-item-prev-chunk ' + this.allowedChunkClass(-1) },
        [h(
          'a',
          { 'class': theme.link,
            attrs: { href: 'javascript:void(0);',
              disabled: !!this.allowedChunkClass(-1)
            },
            on: {
              'click': this.setChunk.bind(this, -1)
            }
          },
          ['<<']
        )]
      );

      nextChunk = h(
        'li',
        { 'class': 'VuePagination__pagination-item ' + theme.item + ' ' + theme.next + ' VuePagination__pagination-item-next-chunk ' + this.allowedChunkClass(1) },
        [h(
          'a',
          { 'class': theme.link,
            attrs: { href: 'javascript:void(0);',
              disabled: !!this.allowedChunkClass(1)
            },
            on: {
              'click': this.setChunk.bind(this, 1)
            }
          },
          ['>>']
        )]
      );
    }

    return h(
      'div',
      { 'class': 'VuePagination ' + theme.wrapper },
      [h(
        'nav',
        { 'class': '' + theme.nav },
        [h(
          'ul',
          {
            directives: [{
              name: 'show',
              value: this.totalPages > 1
            }],

            'class': theme.list + ' VuePagination__pagination pull-right' },
          [h(
            'li',
            { 'class': 'VuePagination__pagination-item ' + theme.item + ' ' + theme.prev + ' VuePagination__pagination-item-prev-page ' + this.allowedPageClass(this.page - 1) },
            [h(
              'a',
              { 'class': 'btable-prev-page ' + theme.link,
                attrs: { href: 'javascript:void(0);',
                  disabled: !!this.allowedPageClass(this.page - 1)
                },
                on: {
                  'click': this.prev.bind(this)
                }
              },
              ['Previous']
            )]
          ), items, h(
            'li',
            { 'class': 'VuePagination__pagination-item ' + theme.item + ' ' + theme.next + ' VuePagination__pagination-item-next-page ' + this.allowedPageClass(this.page + 1) },
            [h(
              'a',
              { 'class': 'btable-next-page ' + theme.link,
                attrs: { href: 'javascript:void(0);',
                  disabled: !!this.allowedPageClass(this.page + 1)
                },
                on: {
                  'click': this.next.bind(this)
                }
              },
              ['Next']
            )]
          )]
        ), h(
          'p',
          {
            directives: [{
              name: 'show',
              value: parseInt(this.records)
            }],

            'class': 'VuePagination__count status-counting-btable pull-left'},
          [this.count]
        )]
      )]
    );
  };
};