/** @odoo-module **/
import AbstractField from 'web.AbstractField';
import fieldRegistry from 'web.field_registry';
var ChartWidget = AbstractField.extend({
    template: "ChartWidget",
    start: function(){
        this._super.apply(this, arguments);
        if (this.recordData[this.nodeOptions.currentValue]){
            this.value = this.recordData[this.nodeOptions.currentValue]
        }
    },
    _render: function() {
        var self = this;
        var value = this.value;
        var ajax = require('web.ajax');
        var result = [];
        var labels = [];
        var data_v =[];
        var data_a =[];
        var data_r = [];
        //var data_completa = [];
        var canvas = this.$('.canvas')[0]
        var ctx = canvas.getContext("2d");
        var enlace = "/get_buffer_changes/"+value.toString();
        console.log('test con for en vez de forEach')
        ajax.jsonRpc(enlace, 'call', {}, {
            'async': false
        }).then(function (data) {
            //result.push(data);
            data.forEach(element=>{
                //console.log(typeof(element.create_date))
                //data_c.push({x:element.create_date,y:element.buffer_size})
                //labels.push(element.create_date);
                data_v.push({x:element.create_date,y:element.buffer_size});
                data_a.push({x:element.create_date,y:2*element.buffer_size/3});
                data_r.push({x:element.create_date,y:element.buffer_size/3});
                
            })
            //labels.push(date)
            /*for(var i =0; i<result[0].length-1; i++){
                labels.push(result[0][i].create_date);
                //data_c.push(result[0][i].buffer_size);
                console.log(result[0][i].create_date,result[0][i+1].create_date);
                data_completa.push({
                        fill:true,
                        label:'Buffer size',
                        data:[{x:result[0][i].create_date,y:result[0][i].buffer_size},{x:result[0][i+1].create_date,y:result[0][i].buffer_size}],
                        backgroundColor:'rgba(53,200,85,0.2)',
                        borderColor:'rgba(53,200,85,1)',
                })
            }
            console.log(data_completa)*/
            const myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets:[
                        {
                            fill:true,
                            data:data_r,
                            stepped: true,
                            backgroundColor:'rgba(241,64,64,1)',
                            borderColor:'rgba(181,49,19,1)',
                        },
                        {
                            fill:true,
                            data:data_a,
                            stepped: true,
                            backgroundColor:'rgba(235,194,50,1)',
                            borderColor:'rgba(189,156,39,1)',
                        },
                        {
                            label:'Buffer size',
                            fill:true,
                            data:data_v,
                            stepped: true,
                            backgroundColor:'rgba(53,200,85,1)',
                            borderColor:'rgba(38,148,82,1)',
                        },
                        ]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                            x: {
                                type: 'time',
                                time: {
                                    displayFormats: {
                                        quarter: 'MMM YYYY'
                                    }
                                },
                                title: {
                                    display: true,
                                    text: 'Date'
                                }
                            },
                            
                        },
                        plugins:{
                           legend: {
                                display: false
                           },
                            title: {
                                display: true,
                                text: 'Comportamiento historico del buffer'
                            },
                        },
                        tooltips: {
                            mode: 'nearest',
                            intersect: false
                        }
                    }
            });
        });
        //console.log(labels)
        //console.log(data_c)
        
        
    },
})
fieldRegistry.add('chart_widget', ChartWidget);