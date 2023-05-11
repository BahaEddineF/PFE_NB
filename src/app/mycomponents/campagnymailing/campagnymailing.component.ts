import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampagneMailing } from 'app/models/CampagneMailing';
import { Configuration } from 'app/models/Configuration';
import { Modele } from 'app/models/Modele';
import { CompagnymailingService } from 'app/services/compagnymailing.service';
import { ConfigurationService } from 'app/services/configuration.service';
import { ModeleService } from 'app/services/modele.service';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'campagnymailing',
  templateUrl: './campagnymailing.component.html',
  styleUrls: ['./campagnymailing.component.css']
})
export class CampagnymailingComponent implements OnInit {
  registerCompagnyData :CampagneMailing = new CampagneMailing();
  Mailing = new CampagneMailing();
  registerPlanificationData = {} as any;
  listConfigurations : Configuration[];
  listConfigurationsForUpdate  : Configuration[];
  listModelesForUpdate  : Modele[];
  listModeles : Modele[];
  listCompagny : CampagneMailing[];
  updateForCompagny : CampagneMailing ; 
  @ViewChild('modalClose') modalClose;
  formAddCompagneMailing:FormGroup;
  submitted:boolean = false ;
  @ViewChild('modalDeleteClose') modalDeleteClose;
  campagneMailingId:number;
  constructor(private compagnyservice : CompagnymailingService,
              private configService:ConfigurationService , 
              private modeleService:ModeleService,
              private toastr: ToastrService,
              private fbBuilder:FormBuilder
     ) { }
  
  ngOnInit(): void {
    this.getAllCampagneMailing();
    this.formAddCompagneMailing = this.fbBuilder.group({
    
      nom :['' , Validators.required],
      destinataire :['' , Validators.required],
      email :['' , Validators.required],
      configuration :['' , Validators.required],
      modele :['' , Validators.required],
      mode:['Synchrone' , Validators.required],
      dateEnvoie:['' ],
      repetition:['' ]

    })
  }

get nom() {return this.formAddCompagneMailing.get("nom")};
get destinataire() {return this.formAddCompagneMailing.get("destinataire")};
get email() {return this.formAddCompagneMailing.get("email")};
get configuration() {return this.formAddCompagneMailing.get("configuration")};
get modele() {return this.formAddCompagneMailing.get("modele")};
get mode() {return this.formAddCompagneMailing.get("mode")};
get dateEnvoie() {return this.formAddCompagneMailing.get("dateEnvoie")};
get repetition() {return this.formAddCompagneMailing.get("repetition")};

  getAllCampagneMailing()
  {
    this.compagnyservice.AllCampagneMailing().subscribe(
      data => {this.listCompagny = data},
      error => {alert("Probléme d'affichage la liste des compagny")}
    );
  }
  openModal() {
    $('#exampleModal').modal('show');
    this.configService.AllConfiguration().subscribe(
      data => {this.listConfigurations = data},
      error => {alert("Probléme d'affichage la liste des configuration")}
    );
    this.modeleService.AllModele().subscribe(
      data => {this.listModeles = data},
      error => {alert("Probléme d'affichage la liste des modeles")}
    );
  }
  addCompagny(){

    this.submitted = true ;
    if(this.formAddCompagneMailing.invalid)
    {
      return ;
    }
    if(this.registerCompagnyData.modeEnvoie === "Synchrone"){
      this.compagnyservice.AddCampagneMailingWithModeleAndConfig(this.registerCompagnyData).subscribe(
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
      
      this.compagnyservice.addCampagneMailingWithConfigAndModeleAndPlanification(this.registerCompagnyData).subscribe(
        data => { alert("Ajout de Compagny Asynchrone validé"); location.reload();},
        err => {alert("ajout échoué");console.log(this.registerCompagnyData)}
      ); 
    }
    
  }


  openModalUpdateCompagny(id:number){
   
    this.configService.AllConfiguration().subscribe(
      data => {this.listConfigurationsForUpdate = data},
      error => {alert("Probléme d'affichage la liste des configuration")}
    );
    this.modeleService.AllModele().subscribe(
      data => {this.listModelesForUpdate = data},
      error => {alert("Probléme d'affichage la liste des modeles")}
    );
    this.compagnyservice.getCampagneMailing(id).subscribe(data => {
      this.updateForCompagny = data; console.log(this.updateForCompagny)
      $('#exampleModalUpdate').modal('show');
    });   
  }
  


  updateCompagny(){
    console.log(this.updateForCompagny)
    alert('aaa'+this.updateForCompagny.modeEnvoie)
    //!methode
  }
/*
  onConfigChange(){
    const selectedConfig = this.listConfigurationsForUpdate.find(config => config.id === this.updateForCompagny.configuration.id);
    alert("configid : "+ selectedConfig.id)
  }
*/
updateFormControl()
{
  if(this.registerCompagnyData.modeEnvoie == 'Asynchrone')
  {
      this.dateEnvoie.setValidators(Validators.required)
      this.dateEnvoie.updateValueAndValidity()
      this.repetition.setValidators(Validators.required)
      this.repetition.updateValueAndValidity()
  } else {
    this.dateEnvoie.setValidators([])
    this.dateEnvoie.updateValueAndValidity()
    this.repetition.setValidators([])
    this.repetition.updateValueAndValidity()
  }
}

openDeleteModal(id:number)
{
  $('#exampleModalDelete').modal('show');
  this.campagneMailingId = id;
}

deleteCampagneMailing()
{
  this.compagnyservice.DeleteCampagneMailing(this.campagneMailingId).subscribe(
    res => {
      this.getAllCampagneMailing();
    } , error => {} , () => {

      this.cancel();
      this.toastr.success( 'Campagne Mailng  a été supprimée' ,'Succès',{
        timeOut: 3000,
      })
    }
  )
}

cancel()
  {
    this.campagneMailingId = undefined;

    this.modalDeleteClose.nativeElement.click();
  }
}
