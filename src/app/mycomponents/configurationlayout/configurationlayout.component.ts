import { Component, OnInit, ViewChild } from '@angular/core';
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
  configurationId:number;
  @ViewChild('modalDeleteClose') modalDeleteClose;
  constructor(private configService: ConfigurationService,
     private toastr: ToastrService) { }

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

  AllConfiguration()
  {
    this.configService.AllConfiguration().subscribe(
      data => {this.listConfigurations = data},
      error => { this.toastr.error("Echec d'affiche de les configurations  ", 'Echec'), {
        timeOut: 3000,}},
    );
  }

  deleteConfiguration() {
    this.configService.DeleteConfiguration(this.configurationId).subscribe(
      res => {
        this.AllConfiguration();
      } , error => {} , () => {
  
        this.cancel();
        this.toastr.success( 'Configuration  a été supprimée' ,'Succès',{
          timeOut: 3000,
        })
      }
    )
  }

  addConfiguration() {
    this.configService.AddConfiguration(this.registerConfigData).subscribe(
      data => {
        this.toastr.success('SOFTMAILS', 'Ajout de configuration validé !', { timeOut: 5000, closeButton: true });
      })}

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
      data => { this.toastr.success("Success de modifier la configuration ", 'Success'), {
        timeOut: 3000,}},
      err => { this.toastr.error("Echec de modifier la configuration  ", 'Echec'), {
        timeOut: 3000, }}
    )
  }
  cancel()
  {
    this.configurationId = undefined;

    this.modalDeleteClose.nativeElement.click();
  }

  openDeleteModal(id:number)
{
  $('#exampleModalDelete').modal('show');
  this.configurationId = id;
}
}

