import { Role } from './role';
export class Utilisateur {
    id: number;
    nom: string ;
    prenom:string;
    email: string;
    login: string;
    motdepasse: string;
    datenaissance: Date;
    active:boolean ;
    role:string;
   
    
    constructor()
    {
   
        this.active = true;
    }
}