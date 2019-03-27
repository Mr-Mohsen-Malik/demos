import { Component, OnInit } from '@angular/core';
import { Dinosaur } from '../dinosaur';
import { DinosaurService } from '../dinosaur.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dinosaurs: Dinosaur[] = [];

  constructor(private dinosaurService: DinosaurService) { }

  ngOnInit() {
    this.getDinosaurs();
  }

  getDinosaurs(): void {
    this.dinosaurService.getDinosaurs()
      .subscribe(dinosaurs => this.dinosaurs = dinosaurs.slice(1, 5));
  }
}
