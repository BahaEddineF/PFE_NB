import { Component, OnInit } from '@angular/core';
import { UtilisateurInfo } from 'app/models/utilisateurInfo';
import { UserService } from 'app/services/userservice.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userInfo:UtilisateurInfo = new UtilisateurInfo() ;
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userInfo = res
      }
    )
  }

}
