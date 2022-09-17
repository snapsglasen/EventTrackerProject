import { FestivalService } from './../../services/festival.service';
import { Component, OnInit } from '@angular/core';
import { Matsuri } from 'src/app/models/matsuri';

@Component({
  selector: 'app-matsuri-list',
  templateUrl: './matsuri-list.component.html',
  styleUrls: ['./matsuri-list.component.css']
})
export class MatsuriListComponent implements OnInit {
  matsuris : Matsuri[] = []

  selected: Matsuri | null = null;

  newMatsuri : Matsuri = new Matsuri();

  editMatsuri: Matsuri | null = null;


  constructor( private festServ : FestivalService) { }

  ngOnInit(): void {
    this.loadMatsuri();
  }

  loadMatsuri(): void {
    this.festServ.index().subscribe(
      {
        next: (matsuris) => {
          this.matsuris = matsuris;
        },
        error: (problem) => {
          console.error('MatsuriListHttpComponent.loadMatsuris(): error loading matsuris:');
          console.error(problem);
        }
      }
    );
  }

  viewDetails(selectedMatsuri : Matsuri) {
    this.selected = selectedMatsuri;
  }


  createMatsuri(newMats : Matsuri) {
    this.festServ.create(newMats).subscribe (
      {
        next: (data) => {
        this.loadMatsuri();
        this.newMatsuri = new Matsuri();
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }
}
