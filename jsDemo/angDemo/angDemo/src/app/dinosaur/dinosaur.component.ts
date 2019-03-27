import { Component, OnInit } from '@angular/core';
import {Dinosaur} from '../dinosaur';
import { DinosaurService } from '../dinosaur.service';

@Component({
  selector: 'app-dinosaur',
  templateUrl: './dinosaur.component.html',
  styleUrls: ['./dinosaur.component.css']
})
export class DinosaurComponent implements OnInit {

  selectedDino: Dinosaur;
  dinosaurs: Dinosaur[];
  onSelect(dino: Dinosaur) {
    this.selectedDino = dino;
  }
  constructor(private dinosaurService: DinosaurService) { }
  getDinosaurs(): void {
    this.dinosaurService.getDinosaurs()
    .subscribe(dinosaurs => { this.dinosaurs = dinosaurs; console.log(this.dinosaurs); });
  }
  ngOnInit() {
    this.getDinosaurs();
  }

}
