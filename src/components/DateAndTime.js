import jQuery from 'jquery'

export default {
    data() {
        return {

        }
    },

    components: {

    },

    props : [ 'id', 'default', 'label', 'size', 'name', 'disabled', 'list', 'alt', 'class-name'],

    mounted() {
        this.getDateTime()
    },

    computed: {
    },

    methods: {
        getDateTime(){
            $('#datetimepicker4').datetimepicker({

            });
        }
    }

}