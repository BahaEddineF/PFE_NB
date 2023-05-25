import { Component, OnInit, ViewChild } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Modele } from 'app/models/Modele';
import { ModeleService } from 'app/services/modele.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'modelemail',
  templateUrl: './modelemail.component.html',
  styleUrls: ['./modelemail.component.css']
})
export class ModelemailComponent implements OnInit {
  public Editor = ClassicEditor;
  listModeles : Modele[];
  modeleForUpdate : Modele;
  constructor(private modeleService:ModeleService,
    private toastr: ToastrService) { }
  registerModeleData = {} as any;
  @ViewChild('myckeditor') ckeditor: any;
  ngOnInit(): void {

    this.modeleService.AllModele().subscribe(
      data => {this.listModeles = data},
      error => {this.toastr.error("Echec d'affiche de les modeles  ", 'Echec'), {
        timeOut: 3000,}})
  }
  
  openModal() {
    $('#exampleModal').modal('show');
  }

  onClick() {
    // Affiche une alerte
    alert('Button clicked!');
  }
  fermer(){
    // activer le bouton "close"
    $('.close').click(() => {
     $('#configModal').modal('hide');
   });
   }


   addModele(){
    this.modeleService.AddModele(this.registerModeleData).subscribe(
      data => { 
        this.toastr.success('Success', 'Ajout de modele validé !', { timeOut: 5000, closeButton: true });;},
      err => { this.toastr.error('SOFTMAILS', 'Ajout de configuration anullée !', { timeOut: 5000, closeButton: true })}
    );

   }

 
  contenu: string;
  sauvegarderContenu(editeur) {
    this.contenu = editeur.getData();
  }

  onIconClickDelete(id: number){
    if (window.confirm('Confirmer la supression'+id)){
      this.modeleService.DeleteModele(id).subscribe(
        data => {alert("suppresion avec succès"); },
        error => {alert('suppression erronée');}
      );
    }
  }

  openModalUpdateModele(id:number){
    this.modeleService.getModele(id).subscribe(data => {this.modeleForUpdate = data;});
    $('#exampleModalUpdate').modal('show');
  }

//
  updateModele(){
    this.modeleService.UpdateModele(this.modeleForUpdate).subscribe(
      data => { alert("Modification de modele validé");location.reload();},
      err => {alert("Modification échoué");console.log(this.modeleForUpdate)}
    );
  }
}
