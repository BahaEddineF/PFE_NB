import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UtilisateurInfo } from 'app/models/utilisateurInfo';
import { UserService } from 'app/services/userservice.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'update-utilisateur',
  templateUrl: './update-utilisateur.component.html',
  styleUrls: ['./update-utilisateur.component.css']
})
export class UpdateUtilisateurComponent implements OnInit {
  formUpdateUtilisateur: FormGroup;
  utilisateur: UtilisateurInfo = new UtilisateurInfo();
  submitted: boolean = false;
  operation: string = "update";
  constructor(
    private fbBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    if(this.data != null)
    {
      this.getUser(this.data)
    }

    this.formUpdateUtilisateur = this.fbBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      login: ['', [Validators.required, Validators.minLength(2)]],
      dateDeNaissance: ['', Validators.required],
      email: ['', Validators.required],
    });
  }


  get nom() { return this.formUpdateUtilisateur.get("nom") };
  get prenom() { return this.formUpdateUtilisateur.get("prenom") };
  get login() { return this.formUpdateUtilisateur.get("login") };
  get dateDeNaissance() { return this.formUpdateUtilisateur.get("dateDeNaissance") };
  get email() { return this.formUpdateUtilisateur.get("email") };
  updateUser() {

    this.submitted = true;
    if (this.formUpdateUtilisateur.invalid) {
      return;
    }
    this.utilisateur.nom = this.nom.value ; 
    this.utilisateur.prenom = this.prenom.value ; 
    this.utilisateur.login = this.login.value ; 
    this.utilisateur.dateDeNaissance = this.dateDeNaissance.value ; 
    this.utilisateur.email = this.email.value ; 
    this.userService.updateUser(this.utilisateur).subscribe(
      res => {
        this.dialog.closeAll()
        this.submitted = false;
        this.utilisateur = new UtilisateurInfo();
        this.toastr.success('Utilisateur a été Modifié', 'Succès', {
          timeOut: 3000,
        })
      }
    )
  }

  getUser(id:number)
  {
    this.userService.getUserInfoById(id).subscribe(res => {
      this.utilisateur = res
    } , error => {} , () => {
     this.nom.setValue(this.utilisateur.nom)
     this.nom.updateValueAndValidity()
      this.prenom.setValue(this.utilisateur.prenom)
      this.prenom.updateValueAndValidity()
      this.login.setValue(this.utilisateur.login)
      this.login.updateValueAndValidity()
      this.dateDeNaissance.setValue(this.utilisateur.dateDeNaissance)
      this.dateDeNaissance.updateValueAndValidity()
      this.email.setValue(this.utilisateur.email)
      this.email.updateValueAndValidity()
    })
  }
}

