import { Component, OnInit, ViewChild } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Modele } from 'app/models/Modele';
import { ModeleService } from 'app/services/modele.service';
@Component({
  selector: 'modelemail',
  templateUrl: './modelemail.component.html',
  styleUrls: ['./modelemail.component.css']
})
export class ModelemailComponent implements OnInit {
  public Editor = ClassicEditor;
  listModeles : Modele[];
  modeleForUpdate : Modele;
  constructor(private modeleService:ModeleService) { }
  registerModeleData = {} as any;
  @ViewChild('myckeditor') ckeditor: any;
  ngOnInit(): void {

    this.modeleService.AllModele().subscribe(
      data => {this.listModeles = data},
      error => {alert("Probléme d'affichage la liste des modeles")}
    );

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
        alert("Ajout de configuration validé");
        location.reload();},
      err => {alert("ajout échoué");console.log(this.registerModeleData)}
    );

   }

 
  contenu: string;
  sauvegarderContenu(editeur) {
    this.contenu = editeur.getData();
  }

  onIconClickDelete(id: number){
    if (window.confirm('Confirmer la supression'+id)){
      this.modeleService.DeleteModele(id).subscribe(
        data => {alert("suppresion avec succès");location.reload(); },
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
