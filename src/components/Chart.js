import Chart from 'chart.js'

export default {
	props:['type','id','data'],

	data(){
		return {
			chart:null
		}
	},
	computed : {
		chartId(){
			if(this.id == undefined || this.id == null || this.id.length == 0)
				return 'chartId';
			return this.id;
		},
		chartType(){
			if (this.type == undefined || this.type == null || this.type.length == 0)
				return 'bar'
			return this.type
		},
		chartData(){
			if (this.data == undefined || this.data == null || this.data.length == 0)
				return []
			return this.data
		},
		
	},

	mounted(){

		this.$emit('input',this.data);

		

		this.chart = Morris.Donut({
		  element: this.id,
		  data: this.data,
		  formatter: function(t) {
            return t + "%"
          },
	        resize: !0,
	        colors: ["#12afcb", "#ef5350", "#8bc34a", "#a9a9a9", "#ff9800", "#fec60d", "#f3f3f3"]
		}).on('click', function (i,row){
			// window.location.href = row.link
			window.open(row.link,'_blank');
		});

		console.log(this.chart);
	},
	

}