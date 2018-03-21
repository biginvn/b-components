/**
 * Created by nobikun1412 on 29/01/2018.
 */
// import axios from 'axios';
export default {
    data() {
        return {
            bTable: {},
            optionsTable: {},
            tfoot: '',
            renderTable: false
        }
    },
    props: {
        idTable: {
            type: String,
            required: true
        },
        tableData: {
            type: Object/Array,
        },
        tableColumn: {
            type: Object/Array,
        },
        static: {
            type: Boolean,
            default: true
        },
        otherOptions: {
            type: Object/Array,
        },
        calcSum: {
            type: Array,
            default: null
        },
        tableTfoot: {
            type: Object/Array,
        },
        editAPI: {
            type: String
        },
        keyAPI: {
            type: String,
            default: ''
        },
        idSearch: {
            type: String,
        },
        classPanel: {
            type: String
        },
        titlePanel: {
            type: String
        },
        classFilter: {
            type: String
        },
        searchURL: {
            type: String
        },
        hasSearchFilter: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        options() {
            this.optionsTable = {}
            this.optionsTable.data = this.tableData
            this.optionsTable.columns = this.tableColumn
            this.optionsTable = Object.assign(this.optionsTable, this.otherOptions)
            return this.optionsTable;
        },
    },
    watch: {
        // 'otherOptions': function() {
        //     this.reRender()
        // },
        // 'tableData': function () {
        //     // this.$store.dispatch('updateTableDataStore', this.tableData)
        // }
    },
    beforeUpdate() {
    },
    created() {

    },
    mounted() {
        if (this.tableColumn.length > 0) {
            let idTable = this.idTable
            for (let i = 0; i < this.tableColumn.length; i++) {
                $('#' + idTable + ' tfoot tr').append(`<th></th>`)
            }
            this.bTable = $('#' + idTable).DataTable(this.options)
            if (this.tableTfoot !== null && this.tableTfoot !== undefined) {this.autoTfoot()}
            if (this.calcSum !== null) {this.autoCalc()}
            this.selectCell(this.editAPI, this.keyAPI)
            this.renderTable = true;
            this.reRunTooltip()  
        }
    },
    updated() {
        let idTable = this.idTable
        if (this.static) {
            this.bTable.clear()
                .rows.add(this.tableData)
                .draw();
        }
        else {
            if (this.renderTable) {
                this.bTable.destroy();
                $('#' + idTable).empty(); // empty in case the columns change
            }
            this.bTable = $('#' + idTable).DataTable(this.options);
            this.renderTable = true;
        }
        if (this.tableTfoot !== null && this.tableTfoot !== undefined) {this.autoTfoot()}
        if (this.calcSum !== null) {this.autoCalc()}
        this.reRunTooltip()  
    },
    methods: {
        reRunTooltip() {
            let idTable = this.idTable
            $('#' + idTable).on( 'draw.dt', function () {
                $('[data-toggle="tooltip"]').tooltip()
            } );
        },
        reRender() {
            let idTable = this.idTable
            this.bTable.destroy();
            $('#' + idTable + ' tfoot tr th').empty();
            this.tfoot = $('#' + idTable + ' tfoot');
            $('#' + idTable).empty(); // empty in case the columns change
            $('#' + idTable).append(this.tfoot)
            this.bTable = $('#' + idTable).DataTable(this.options);
            this.selectCell(this.editAPI, this.keyAPI)
        },
        autoCalc() {

            $( this.bTable.column( 0 ).footer() ).html(
                'Total: '
            );
            // Total over all pages
            for (let i = 0; i < this.calcSum.length; i++) {
                if (this.calcSum[i].type == 'number') {
                    let intVal = function ( i ) {
                        return typeof i === 'string' ?
                            i.replace(/[VND,\$]/g, '')*1 :
                            typeof i === 'number' ?
                                i : 0;
                    };

                    let total = this.bTable
                        .column( this.calcSum[i].col )
                        .data()
                        .reduce( function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0 );

                    // Total over this page
                    // let pageTotal = this.bTable
                    //     .column( this.calcSum[i].col, { page: 'current'} )
                    //     .data()
                    //     .reduce( function (a, b) {
                    //         return intVal(a) + intVal(b);
                    //     }, 0 );

                    // Update footer
                    let currency;
                    ((this.calcSum[i].currency == null || this.calcSum[i].currency == 'undefined')) ? currency = '' : currency = this.calcSum[i].currency;
                    $( this.bTable.column( this.calcSum[i].col ).footer() ).html(
                        currency + total
                    );
                }
                else {
                    let total = this.bTable
                        .column( this.calcSum[i].col )
                        .data()
                        .reduce( function (total, e) {
                            if (Boolean(e)) {
                                return total + 1;
                            }
                            else return total;
                        }, 0 );

                    // Total over this page
                    // let pageTotal = this.bTable
                    //     .column( this.calcSum[i].col, { page: 'current'} )
                    //     .data()
                    //     .reduce( function (total, e) {
                    //         if (Boolean(e)){
                    //             return total + 1;
                    //         }
                    //         else return total;
                    //     }, 0 );

                    // Update footer
                    $( this.bTable.column( this.calcSum[i].col ).footer() ).html(
                        total
                    );
                }
            }
        },

        autoTfoot(){
            for (let i = 0; i < this.tableTfoot.length; i++) {
                $(this.bTable.column(i).footer()).html(
                        this.tableTfoot[i].title
                    );
            }
            /* $( this.bTable.column( 0 ).footer() ).html(
                this.tableTfoot[0].title
            )*/

           /* for (let i = 0; i < this.tableTfoot.length; i++){
                let total = this.bTable
                        .column( this.tableTfoot[i].col )
                        .data()
                        .reduce( function (total, e) {
                            if (Boolean(e)) {
                                return total + 1;
                            }
                            else return total;
                        }, 0 );
                $( this.bTable.column( this.tableTfoot[i].col ).footer() ).html(
                        total
                    );
            }*/
        },

        selectCell(editAPI, keyAPI) {
            let idTable = this.idTable
            console.log('this.editAPI: ' + editAPI)
            console.log('this.keyAPI: ' + keyAPI)
            $(document).click(function() {
                $('td.selected_cell').removeClass('selected_cell')

            });
            $('#' + idTable + ' tbody').on( 'click', 'td.editable', function (e) {
                let btable = $('#' + idTable).DataTable();
                let data_cell = btable.cell( this ).data();
                let columns = btable.settings().init().columns;
                //get the index of the clicked cell
                let colIndex = btable.cell(this).index().column;

                //Get data of row:
                let data_row = btable.row( this ).data();

                if (!$(this).hasClass('selected_cell')) {
                    $('td.selected_cell .update-cell').hide()
                    $('td.selected_cell').removeClass('selected_cell')
                    if ($(this).has('input').length) {
                        $(this).addClass('selected_cell')
                    }
                    else {
                        $(this).addClass('selected_cell')
                        $(this).wrapInner( "<div class='data_cell'></div>");
                        $(this).append('<input class="update_cell" type="text" value="' + data_cell + '" name="' + columns[colIndex].name + '"><button type="button" class="btn-update-cell btn-sm btn-primary">Update</button>')
                        $('button').on('click', function () {
                            $("#" + idTable + " .overlay-table").removeClass('hidden')
                            let new_val = $('.selected_cell input').val().trim()
                            let name = columns[colIndex].name;
                            let res = name.split(".");
                            let new_data_row = data_row
                            let data_edit = new_data_row;
                            let tmp =[]
                            for (let i = 0; i < res.length; i++) {
                                if ((typeof data_edit[res[i]]) !== 'object') {
                                    tmp[i] = new_val;
                                    data_edit[res[i]] = new_val;
                                    for (let i = res.length - 1; i = 0; i--) {
                                        if (i > 0) {
                                            tmp[i-1][res[i]] = tmp[i]
                                        }
                                    }
                                    new_data_row[res[0]] = tmp[0]
                                }
                                else {
                                    data_edit = new_data_row[res[i]];
                                    tmp[i] = new_data_row[res[i]];
                                }
                            }

                            //Send request update:
                            // axios.put(editAPI + '/' + data_row._id.$oid + '?apiKey=' + keyAPI + '=true', new_data_row)
                            //     .then(response => {
                            //         $('.selected_cell .data_cell').html(new_val)
                            //         $('td.selected_cell').removeClass('selected_cell')
                            //         $("#" + idTable + " .overlay-table").addClass('hidden')
                            //     })
                            //     .catch(e => {
                            //         $("#" + idTable + " .overlay-table").addClass('hidden')
                            //         alert('Please check data')
                            //     })
                        })
                    }
                }
                event.stopPropagation();
            } );

            // $('#' + idTable + ' tbody').on( 'click', 'tr', function (e) {
            //     let btable = $('#' + idTable).DataTable();
            //     let data_cell = btable.row( this ).data();
            //     alert(JSON.stringify(data_cell))
            //     alert(data_cell.author.name)
            // } );
        },

        // Methods for search filter
        searchFilter(e) {
            this.getSearchResults(formData);
        },
        resetSearchForm(e) {
            $('#' + this.idSearch + ' .search-list').find('input')
                .filter(':text, :password, :file').val('')
                .end()
                .filter(':checkbox, :radio')
                .removeAttr('checked')
                .end()
                .end()
                .find('textarea').val('')
                .end()
                .find('select').prop("selectedIndex", -1)
                .find('option:selected').removeAttr('selected')
            ;
            $('.btn-search-list').trigger('click');
        },
        getSearchResults(data=null) {
            const url = (data==null) ? this.searchURL : this.searchURL + '?' + data;
            // axios.get(url)
            //     .then(response => {
            //         this.updateDataStore(response.data)
            //     })
            //     .catch(e => {
            //         alert('Please check data')
            //     })
        },
        //Emit data:
        updateDataStore(data) {
            this.$emit('updateDataTable', data)
        }
    },
}