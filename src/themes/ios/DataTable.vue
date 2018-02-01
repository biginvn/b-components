<template>
    <div class="b-table-custom">
        <table class="display dataTable" :editAPI="editAPI" :keyAPI="keyAPI" :id="id" width="100%" :static="static" :tableData="tableData" :tableColumn="tableColumn" :otherOptions="otherOptions" :calcSum="calcSum">
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
    import DataTable from './../../components/DataTable'
    export default DataTable
</script>

<style>

</style>