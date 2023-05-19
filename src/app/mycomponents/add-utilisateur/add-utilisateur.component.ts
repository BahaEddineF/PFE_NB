import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Utilisateur } from 'app/models/utilisateur';
import { UserService } from 'app/services/userservice.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'add-utilisateur',
  templateUrl: './add-utilisateur.component.html',
  styleUrls: ['./add-utilisateur.component.css']
})
export class AddUtilisateurComponent implements OnInit {
  formAddUtilisateur: FormGroup;
  utilisateur: Utilisateur = new Utilisateur();
  submitted: boolean = false;
  constructor(
    private fbBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.formAddUtilisateur = this.fbBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      login: ['', [Validators.required, Validators.minLength(2)]],
      dateDeNaissance: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  get nom() { return this.formAddUtilisateur.get("nom") };
  get prenom() { return this.formAddUtilisateur.get("prenom") };
  get login() { return this.formAddUtilisateur.get("login") };
  get dateDeNaissance() { return this.formAddUtilisateur.get("dateDeNaissance") };
  get email() { return this.formAddUtilisateur.get("email") };
  get password() { return this.formAddUtilisateur.get("password") };
  addUtilisateur() {

    this.submitted = true;
    if (this.formAddUtilisateur.invalid) {
      return;
    }
    this.userService.addUser(this.utilisateur).subscribe(
      res => {
        this.dialog.closeAll()
        this.submitted = false;
        this.utilisateur = new Utilisateur();
        this.toastr.success('Utilisateur a été ajouté', 'Succès', {
          timeOut: 3000,
        })
      }
    )
  }
}

