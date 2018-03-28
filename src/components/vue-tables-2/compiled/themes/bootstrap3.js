'use strict';

module.exports = function () {
    return {
        framework: 'bootstrap3',
        table: 'btable-bt3-test table dataTable table-striped table-hover',
        row: 'row',
        column: 'col-md-12',
        label: '',
        input: 'form-control',
        select: 'form-control',
        field: 'form-group',
        inline: 'form-inline',
        right: 'pull-right',
        left: 'pull-left',
        center: 'text-center',
        contentCenter: '',
        small: '',
        nomargin: '',
        groupTr: 'info',
        classPagination: 'pagination-btable',
        button: 'btn btn-secondary',
        dropdown: {
            container: 'dropdown',
            trigger: 'dropdown-toggle',
            menu: 'dropdown-menu',
            content: '',
            item: '',
            caret: 'caret'
        },
        pagination: {
            count: '',
            wrapper: '',
            list: 'pagination',
            item: 'page-item',
            link: 'page-link',
            next: 'next',
            prev: 'previ',
            active: 'active',
            disabled: 'disabled',
            align: 'left',
        },
        sortIcon: {
          is: 'fa fa-sort',
          base: 'fa fa-sort',
          up: 'fa fa-sort-asc',
          down: 'fa fa-sort-desc'
        },
        sortingAlgorithm: function sortingAlgorithm(data, column) {
          return data.sort(this.getSortFn(column));
        },

    };
};