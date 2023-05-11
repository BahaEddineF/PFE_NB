import { Component, OnInit } from '@angular/core';
import { Configuration } from 'app/models/Configuration';
import { ConfigurationService } from 'app/services/configuration.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'configurationlayout',
  templateUrl: './configurationlayout.component.html',
  styleUrls: ['./configurationlayout.component.css']
})
export class ConfigurationlayoutComponent implements OnInit {
  listConfigurations: Configuration[];
  registerConfigData = {} as any;
  configForUpdate: Configuration;
  constructor(private configService: ConfigurationService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.configService.AllConfiguration().subscribe(
      data => { this.listConfigurations = data },
      error => { alert("Probléme d'affichage la liste des configuration") }
    );

  }
  fermer() {
    // activer le bouton "close"
    $('.close').click(() => {
      $('#configModal').modal('hide');
    });
  }
  onIconClickLaunch(event: any) {
    alert("hii")
  }

  onIconClickDelete(id: number) {
    if (window.confirm('Confirmer la supression')) {
      this.configService.DeleteConfiguration(id).subscribe(
        data => { alert("suppresion avec succès"); location.reload(); },
        error => { alert('suppression erronée'); }
      );
    }
  }

  addConfiguration() {
    this.configService.AddConfiguration(this.registerConfigData).subscribe(
      data => {

        this.toastr.success('SOFTMAILS', 'Ajout de configuration validé !', { timeOut: 5000, closeButton: true });
       //!TO DO method get all conf 
        location.reload();
        //.onTap.subscribe(() => {   location.reload(); } );   
        ;
      },
      err => { this.toastr.error('SOFTMAILS', 'Suppresion de configuration validé !', { timeOut: 5000, closeButton: true }) }
    );

  }



  onClick() {
    // Affiche une alerte
    alert('Button clicked!');
  }

  // Fonction appelée lorsqu'un bouton est cliqué pour ouvrir le modal
  openModal() {
    $('#exampleModal').modal('show');
  }

  openModalUpdateConfig(id: number) {
    this.configService.getConfiguration(id).subscribe(data => { this.configForUpdate = data; });
    $('#exampleModalUpdate').modal('show');
  }


  updateConfiguration() {
    this.configService.UpdateConfiguration(this.configForUpdate).subscribe(
      data => { alert("Modification de configuration validé"); window.location.reload() },
      err => { alert("Modification échoué"); console.log(this.registerConfigData) }
    );
  }
}
