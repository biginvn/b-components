// Component make by thien.nguyen 19/01/2018
export default {
    data () {
        return {
        }
    },
    props: ['id', 'message', 'classModal'],
    computed: {

    },
    created(){
        // this.classModal = 'modal fade ' + this.classModal 
        if(this.value == true){
            $('#' + this.id).modal();
        }else
            $('#' + this.id).modal('hide');
    },
    watch:{
        value(value){
            if(value == true)
                $('#' + this.id).modal();
            else
                $('#' + this.id).modal('hide');
        },
    },
    methods : {
        closeMessage(){
            $('#' + this.id).modal('hide');
            return this.$emit('input', false)
        }
    }
}