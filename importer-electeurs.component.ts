// importer-electeurs.component.ts
import { Component } from '@angular/core';
import { ElecteursService } from './../../src/app/services/electeurs.service';

@Component({
  selector: 'app-importer-electeurs',
  templateUrl: './importer-electeurs.component.html',
  styleUrls: ['./importer-electeurs.component.css']
})
export class ImporterElecteursComponent {
  fichier: File | null = null;

  constructor(private electeursService: ElecteursService) { }

  onFileChange(event: any) {
    this.fichier = event.target.files[0];
  }

  importer() {
    if (this.fichier) {
      this.electeursService.importerElecteurs(this.fichier).subscribe(
        (response) => {
          alert('Fichier importé avec succès !');
        },
        (error) => {
          console.error('Erreur lors de l\'importation :', error);
          alert('Erreur lors de l\'importation');
        }
      );
    }
  }
}