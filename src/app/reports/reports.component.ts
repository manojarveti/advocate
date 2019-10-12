import { Component, OnInit } from '@angular/core';
import { Reports } from './reports.service';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private reports: Reports,private http: HttpClient) { }
  error = '';
  success = '';
  datapoints1:any;
  label=[];
  y=[];
  totaldata:any;
  data :Data[];
  baseUrl = 'http://localhost/advocate_api/reports';
  ngOnInit() {
    this.http.get(this.baseUrl).subscribe((res: Data[]) => {
      // res.forEach(y => {
        this.data=res;
      //   this.label.push(y.label);
      //   this.y.push(y.y);
      // });
      
      console.log(this.data);
    var options = {
      animationEnabled: true,
      title:{
        text: "Revenue"   
      },
      axisY:{
        title:"Amount ($)"
      },
      toolTip: {
        shared: true,
        reversed: true
      },
      data: [{
        type: "column",
        name: "Total Case payment",
        showInLegend: "true",
        yValueFormatString: "#,##0 $",
        dataPoints:this.data
      }]
    };
    
    $("#chartContainer").CanvasJSChart(options);
    
 
});
}

  // getdatapoints1(): void {
  //   this.reports.getdatapoints().subscribe(
  //     (res: any) => {
  //       this.datapoints1 = res;
  //     },
  //     (err) => {
  //       this.error = err;
  //     }
  //   );
  // }

}
