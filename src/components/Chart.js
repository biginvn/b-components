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


		if(this.type === 'doughnut'){
			this.chart = Morris.Donut({
			  element: this.id,
			  data: this.data,
			  formatter: function(t) {
	            return t + "%"
	          },
		        resize: !0,
		        colors: ["#12afcb", "#ef5350", "#8bc34a", "#a9a9a9", "#ff9800", "#fec60d", "#f3f3f3"]
			}).on('click', function (i,row){
				window.open(row.link,'_blank');
			});
		}
		else if(this.type === 'bar'){

			let idChart = this.id

			this.chart = new Chart(idChart,{
				type:this.type,
				data:{
					labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
					datasets: [
						{
		                    label: "Initiated",
		                    backgroundColor: "rgba(0,123,255,0.5)",
		                    borderColor: "rgba(0,123,255,0.8)",
		                    highlightFill: "rgba(0,123,255,0.75)",
		                    highlightStroke: "rgba(0,123,255,1)",
		                    data: this.data.dataResponse[0].value,
		                    borderWidth: 1
		                },
		                {
		                    label: "Completed",
		                    backgroundColor: "rgba(255,193,7,0.2)",
		                    borderColor: "rgba(255,193,7,1)",
		                    pointColor: "rgba(255,193,7,1)",
		                    pointStrokeColor: "#fff",
		                    pointHighlightFill: "#fff",
		                    pointHighlightStroke: "rgba(18,175,203,1)",
		                    data: this.data.dataResponse[1].value,
		                    borderWidth: 1
		                }
					]
				},
				options:{
			        scaleBeginAtZero : true,
			        scaleShowGridLines : true,
			        scaleGridLineColor : "rgba(0,0,0,.05)",
			        scaleGridLineWidth : 1,
			        scaleShowHorizontalLines: true,
			        scaleShowVerticalLines: true,
			        barShowStroke : true,
			        barStrokeWidth : 2,
			        barDatasetSpacing : 1,
			        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
			        responsive: true,
			        legend: {
			        
			            position: 'right',
			        },
			        title: {
			            display: true,
			            text: 'Initiated & Completed Relocations by Month',
			            position:'top',

			        },


			    }
			})
		}

		this.$emit('input',this.data);

	},
	

}