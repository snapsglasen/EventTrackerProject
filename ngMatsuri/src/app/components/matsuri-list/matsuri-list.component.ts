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

  reload() {
    this.festServ.index().subscribe({
      next: (matsuris) => {
        this.matsuris = matsuris;
      },
      error: (err) => {
        console.error('MatsuriListComponent.reload(): error retrieving matsuris');
        console.error(err);
      },
    });
  }

  updateMatsuri(matsuri: Matsuri, setSelected = true): void {
    this.festServ.update(matsuri).subscribe({
      next: (matsuri) => {
        this.reload();
        // this.editTodo = null;
        if (setSelected) {
          this.selected = matsuri;
        }
      },
      error: (bad) => {
        console.error('MatsuriListComponent.updateMatsuri(): error updating matsuri');
        console.error(bad);
      },
    });
  }

  deleteMatsuri(id: number): void {
    this.festServ.destroy(id).subscribe({
      next: (good) => {
        this.reload();
      },
      error: (bad) => {
        console.error('MatsuriListComponent.deleteMatsuri(): error deleting matsuri');
        console.error(bad);
      },
    });
  }

  setEditMatsuri(): void {
    this.editMatsuri = Object.assign({}, this.selected);
  }
}
