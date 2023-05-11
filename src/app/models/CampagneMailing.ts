import { Configuration } from "./Configuration";
import { Modele } from "./Modele";
import { Planification } from "./Planification";

export class CampagneMailing {

    public id : number;
    public nom : string;
    public email : string;
    public destinataire : string;
    public idplanification : number;
 
  
    public modeEnvoie : string;
    public modele : Modele;
    public configuration:Configuration;
   public etat : number;
    public planification : Planification;



    constructor()
    {
      this.modele  = new Modele();
      this.configuration = new Configuration();

      this.planification = new Planification();
     this.planification.repetetion = 0 ;
     this.modeEnvoie = 'Synchrone'
    }
  }
  