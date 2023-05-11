import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public chart: any;
  constructor() { }

  ngOnInit() {
    this.createChart()
  }

  createChart()
  {
    this.chart = new Chart("MyChart", {
      type:'doughnut',
      data: {
      labels: ['Compagne accepté ', 'Compagne suspendu', 'Compagne en attente'],
      datasets: [
        {
 
          data:[30,50,20],
          backgroundColor:['green', 'red', 'yellow']
        }
      ]
    } ,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Liste de campgnes '
        }
      }
    }
    })
  }


}
