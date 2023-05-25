import { Component, OnInit } from '@angular/core';
import { CompagnymailingService } from 'app/services/compagnymailing.service';
import { UserService } from 'app/services/userservice.service';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public chart: any;
    nbrUsers=0;
    nbrCampagnes=0;

  constructor(private userService:UserService , private campagneMailingService:CompagnymailingService) { }

  ngOnInit() {
    this.createChart();
    this.countUsers();
    this.countCampagnes();
  }

  createChart()
  {
    this.chart = new Chart("MyChart", {
      type:'doughnut',
      data: {
      labels: ['Compagne envoyée ', 'Compagne en attente'],
      datasets: [
        {
 
          data:[30,20],
          backgroundColor:['green', 'yellow']
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

  countUsers()
  {
    this.userService.countUsers().subscribe(
      res => {
        this.nbrUsers=res;
      })
  }

  countCampagnes()
  {
    this.campagneMailingService.countCampagneMailings().subscribe(
      res => {
        this.nbrCampagnes=res;
      })
  }
}
