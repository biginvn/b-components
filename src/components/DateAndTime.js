import baseComponent from '../mixins/base-mixins'
import jQuery from 'jquery'

export default {
    data() {
        return {

        }
    },

    components: {

    },

    props : [ 'id', 'default', 'label', 'size', 'name', 'disabled', 'list', 'alt', 'class-name'],

    mixins: [baseComponent],

    mounted() {
        this.getDateTime()
    },

    computed: {
    },

    methods: {
        getDateTime(){
            $('#datetimepicker10').datetimepicker({
                viewMode: 'years',
                format: 'MM/YYYY'
            });
        }
    }

}