<template>
    <div class="b-table-custom">
        <div v-if="hasSearchFilter" class="panel" :id="idSearch" :class="classPanel" :searchURL="searchURL">
            <div class="panel-body">
                <div class="panel panel-border">
                    <div class="panel-heading">
                        <h3 class="panel-title">{{ titlePanel }}</h3>
                    </div>
                    <div class="panel-body">
                        <form class="search-list">
                            <div class="form-help">
                                <slot name="help">

                                </slot>
                            </div>
                            <div class="form-elements">
                                <!--Add input, select, ... at here-->
                                <slot name="elements">

                                </slot>
                            </div>
                            <div class="form-actions">
                                <!--Add buttons for actions at here-->
                                <slot name="actions">
                                    <button @click="searchFilter($event)" type="button" class="btn btn-success btn-rounded btn-search-list">Search</button>
                                    <button @click="resetSearchForm($event)" type="button" class="btn btn-default btn-rounded">Clear</button>
                                </slot>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="filter-actions" :class="classFilter">
                    <!--Add buttons for action create/update,..-->
                    <slot name="filter_actions">

                    </slot>
                </div>
            </div>
        </div>


        <table class="display table dataTable" :editAPI="editAPI" :keyAPI="keyAPI" :id="idTable" width="100%" :static="static" :tableData="tableData" :tableColumn="tableColumn" :otherOptions="otherOptions" :calcSum="calcSum" :tableTfoot="tableTfoot" :orderColumn="orderColumn">
            <tbody>
            </tbody>
            <tfoot>
            <tr>
            </tr>
            </tfoot>
            <slot></slot>
            <div class="overlay-table hidden">
                <div class="message-processing">
                    Please wait ...
                    <i class="fa fa-spinner fa-spin fa-fw"></i>
                </div>
            </div>
        </table>

    </div>
</template>

<script>
    import DataTable from '../../components/DataTable'
    export default DataTable
</script>

<style scope>
thead tr th {
     border-top: none !important;
}
</style>