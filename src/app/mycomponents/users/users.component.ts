import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AddUtilisateurComponent } from '../add-utilisateur/add-utilisateur.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'app/services/userservice.service';
import { ToastrService } from 'ngx-toastr';
import { Utilisateur } from 'app/models/utilisateur';
import { UtilisateurInfo } from 'app/models/utilisateurInfo';
import { UpdateUtilisateurComponent } from '../update-utilisateur/update-utilisateur.component';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  listUtilisateurs:UtilisateurInfo[];
  formAllUser:FormGroup;
  formAddUSER:FormGroup;
action:string="";
userId:number;
@ViewChild('modalClose') modalClose;
  constructor(public dialog: MatDialog,
    private userservice: UserService,
              private toastr: ToastrService,
              private fbBuilder:FormBuilder) { }


  ngOnInit() :void {
    this.getAllUser();
    this.formAddUSER = this.fbBuilder.group({
    
      nom :['' , Validators.required],
      prenom :['' , Validators.required],
      email :['' , Validators.required],
      datenasissance :['' , Validators.required],
      login :['' , Validators.required],
     } )
}
get nom() {return this.formAddUSER.get("nom")};
get prenom() {return this.formAddUSER.get("prenom")};
get email() {return this.formAddUSER.get("email")};
get datenasissance() {return this.formAddUSER.get("datenasissance")};
get login() {return this.formAddUSER.get("login")};


  getAllUser()
  {
    this.userservice.getAllUser().subscribe(
    data=> {
        this.listUtilisateurs=data;},
      error=> console.error(error)
       
    )
  }

  openModal()
  {
    const dialogRef = this.dialog.open(AddUtilisateurComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllUser()
    });
  }

  openModalUpdateUtilisateur(id:number)
  {
    const dialogRef = this.dialog.open(UpdateUtilisateurComponent, {
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllUser()
    });
  }

  openModalBlockUtilisateur(id:number)
  {
    $('#exampleModal').modal('show');
    this.action="block"
    this.userId = id;
  }

  openModalUnBlockUtilisateur(id:number)
  {
    $('#exampleModal').modal('show');
    this.action="unblock"
    this.userId = id;
  }
  blockUser()
  {
    this.userservice.blockUser(this.userId).subscribe(
      res => {
        this.getAllUser();
      } , error => {} , () => {
        this.cancel();
        this.toastr.success( 'Utilisateur  a été bloqué' ,'Succès',{
          timeOut: 3000,
        }) 

      }
    )
  }

  unblockUser()
  {
    this.userservice.unblockUser(this.userId).subscribe(
      res => {
        this.getAllUser();
      } , error => {} , () => {
        this.cancel();
        this.toastr.success( 'Utilisateur  a été débloqué' ,'Succès',{
          timeOut: 3000,
        })

      }
    )
  }
  

  cancel()
  {
    this.userId = undefined;
    this.action = "";
    this.modalClose.nativeElement.click();
  }
}
