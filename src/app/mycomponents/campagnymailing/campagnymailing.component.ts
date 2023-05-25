import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampagneMailing } from 'app/models/CampagneMailing';
import { Configuration } from 'app/models/Configuration';
import { Modele } from 'app/models/Modele';
import { Planification } from 'app/models/Planification';
import { Role } from 'app/models/role';
import { CompagnymailingService } from 'app/services/compagnymailing.service';
import { ConfigurationService } from 'app/services/configuration.service';
import { ModeleService } from 'app/services/modele.service';
import { RoleService } from 'app/services/role.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'campagnymailing',
  templateUrl: './campagnymailing.component.html',
  styleUrls: ['./campagnymailing.component.css']
})
export class CampagnymailingComponent implements OnInit {
  registerCompagnyData: CampagneMailing = new CampagneMailing();
  Mailing = new CampagneMailing();
  registerPlanificationData = {} as any;
  listConfigurations: Configuration[];
  listConfigurationsForUpdate: Configuration[];
  listModelesForUpdate: Modele[];
  listModeles: Modele[];
  listCompagny: CampagneMailing[];

  @ViewChild('modalClose') modalClose;
  @ViewChild('modalCloseUpdate') modalCloseUpdate;
  formCompagneMailing: FormGroup;
  submitted: boolean = false;
  @ViewChild('modalDeleteClose') modalDeleteClose;
  campagneMailingId: number;
  operation: string = "add";
  roles:Role[] = [];
  constructor(private compagnyservice: CompagnymailingService,
    private configService: ConfigurationService,
    private modeleService: ModeleService,
    private toastr: ToastrService,
    private fbBuilder: FormBuilder,
    private roleService:RoleService
  ) { }

  ngOnInit(): void {
    this.getAllConfigurations();
    this.getAllModels()
    this.getAllCampagneMailing();
    this.getAllRoles()
    this.formCompagneMailing = this.fbBuilder.group({

      nom: ['', Validators.required],
      destinataire: ['', Validators.required],
      email: ['', Validators.required],
      configuration: ['', Validators.required],
      modele: ['', Validators.required],
      mode: ['Synchrone', Validators.required],
      dateEnvoie: [''],
      repetition: ['']

    })
  }

  get nom() { return this.formCompagneMailing.get("nom") };
  get destinataire() { return this.formCompagneMailing.get("destinataire") };
  get email() { return this.formCompagneMailing.get("email") };
  get configuration() { return this.formCompagneMailing.get("configuration") };
  get modele() { return this.formCompagneMailing.get("modele") };
  get mode() { return this.formCompagneMailing.get("mode") };
  get dateEnvoie() { return this.formCompagneMailing.get("dateEnvoie") };
  get repetition() { return this.formCompagneMailing.get("repetition") };

  getAllCampagneMailing() {
    this.compagnyservice.AllCampagneMailing().subscribe(
      data => { this.listCompagny = data },
      error => { alert("Probléme d'affichage la liste des compagny") }
    );
  }

  getAllConfigurations() {
    this.configService.AllConfiguration().subscribe(
      data => { this.listConfigurations = data },
      error => { alert("Probléme d'affichage la liste des configuration") }
    );
  }

  getAllModels() {
    this.modeleService.AllModele().subscribe(
      data => { this.listModeles = data },
      error => { alert("Probléme d'affichage la liste des modeles") }
    );
  }
  openModal() {
    $('#exampleModal').modal('show');
    this.operation = "add";
    this.formCompagneMailing.reset();
    this.registerCompagnyData = new CampagneMailing();
    this.submitted = false;
  }
  saveCompagny() {

    this.submitted = true;
    if (this.formCompagneMailing.invalid) {
      return;
    }
    console.log('model 107 , ', this.registerCompagnyData)
    this.compagnyservice.saveCampagneMailing(this.registerCompagnyData).subscribe(
      data => {
        this.registerCompagnyData = data ;
        if(this.registerCompagnyData.modeEnvoie=='Synchrone')
        {
          this.compagnyservice.sendSynchronousMail(this.registerCompagnyData).subscribe(res => {} , error => {
            console.error(error)
          })
        }
       
        this.submitted = false;
     

        if (this.operation == 'add') {
          this.toastr.success('Campagne mailing a été ajoutée', 'Succès', {
            timeOut: 3000,
          })
          this.modalClose.nativeElement.click();
        } else {
          this.toastr.success('Campagne mailing a été modifiée', 'Succès', {
            timeOut: 3000,
          })
          this.modalCloseUpdate.nativeElement.click();
        }


        this.getAllCampagneMailing()
      },
      err => {
        this.toastr.error("Echec d'ajout de la Campagne mailing  ", 'Echec', {
          timeOut: 3000,
        }),
          console.error(err)
        console.log(this.registerCompagnyData)
      }, () => {
        this.registerCompagnyData = new CampagneMailing();
        this.operation = ""
      }
    );
    /*if(this.registerCompagnyData.modeEnvoie === "Synchrone"){
      this.compagnyservice.saveCampagneMailing(this.registerCompagnyData).subscribe(
        data => {
          this.submitted = false ;
          this.registerCompagnyData = new CampagneMailing();
          
         
          this.toastr.success( 'Campagne mailing a été ajoutée' ,'Succès',{
            timeOut: 3000,
          }), 
         this.modalClose.nativeElement.click();
          this.getAllCampagneMailing()
        },
        err => {
          this.toastr.error( "Echec d'ajout de la Campagne mailing  " ,'Echec',{
            timeOut: 3000,
          }), 
         console.error(err)
          console.log(this.registerCompagnyData)
        }
      ); 
    }else if(this.registerCompagnyData.modeEnvoie === "Asynchrone"){
      console.log(this.registerCompagnyData)
      
      this.compagnyservice.saveCampagneMailing(this.registerCompagnyData).subscribe(
        data => {
          this.submitted = false ;
          this.registerCompagnyData = new CampagneMailing();
          this.toastr.success( 'Campagne mailing a été ajoutée' ,'Succès',{
            timeOut: 3000,
          }), 
         this.modalClose.nativeElement.click();
          this.getAllCampagneMailing()
        },
        err => {
          this.toastr.error( "Echec d'ajout de la Campagne mailing  " ,'Echec',{
            timeOut: 3000,
          }), 
         console.error(err)
          console.log(this.registerCompagnyData)
        }
      ); 
    }*/

  }


  openModalUpdateCompagny(id: number) {
    this.operation = "update";
    $('#exampleModalUpdate').modal('show');

    this.compagnyservice.getCampagneMailing(id).subscribe(data => {
      this.registerCompagnyData = data;
      console.log("model compagne ", this.registerCompagnyData)

    }, error => { }, () => {
      if (this.registerCompagnyData.planification != null) {
        this.registerCompagnyData.planification.dateenv = new Date(this.registerCompagnyData.planification.dateenv)
      }
    });
  }




  /*
    onConfigChange(){
      const selectedConfig = this.listConfigurationsForUpdate.find(config => config.id === this.updateForCompagny.configuration.id);
      alert("configid : "+ selectedConfig.id)
    }
  */
  updateFormControl() {
    if (this.registerCompagnyData.modeEnvoie == 'Asynchrone') {
      this.dateEnvoie.setValidators(Validators.required)
      this.dateEnvoie.updateValueAndValidity()
      this.repetition.setValidators(Validators.required)
      this.repetition.updateValueAndValidity()
      if (this.registerCompagnyData.planification == null) {
        this.registerCompagnyData.planification = new Planification()
      }

    } else {
      this.dateEnvoie.setValidators([])
      this.dateEnvoie.updateValueAndValidity()
      this.repetition.setValidators([])
      this.repetition.updateValueAndValidity()
    }
  }

  openDeleteModal(id: number) {
    $('#exampleModalDelete').modal('show');
    this.campagneMailingId = id;
  }

  deleteCampagneMailing() {
    this.compagnyservice.DeleteCampagneMailing(this.campagneMailingId).subscribe(
      res => {
        this.getAllCampagneMailing();
      }, error => { }, () => {

        this.cancel();
        this.toastr.success('Campagne Mailng  a été supprimée', 'Succès', {
          timeOut: 3000,
        })
      }
    )
  }

  cancel() {
    this.campagneMailingId = undefined;

    this.modalDeleteClose.nativeElement.click();
  }

  getAllRoles()
  {
      this.roleService.getAllRoles().subscribe(res => {
        console.log('res ' , res)
        this.roles = res
      })
  }
}
