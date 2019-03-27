import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { DinosaurService } from '../dinosaur.service';
import { Dinosaur } from '../dinosaur';



@Component({
  selector: 'app-dinosaur-detail',
  templateUrl: './dinosaur-detail.component.html',
  styleUrls: ['./dinosaur-detail.component.css']
})
export class DinosaurDetailComponent implements OnInit {

  @Input() dinosaur: Dinosaur;

  constructor(private route: ActivatedRoute,
    private dinosaurService: DinosaurService,
    private location: Location) { }

  ngOnInit(): void {
    this.getDinosaur();
  }
  getDinosaur(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.dinosaurService.getDinosaur(id)
      .subscribe(dinosaur => this.dinosaur = dinosaur);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.dinosaurService.updateDinosaur(this.dinosaur)
      .subscribe(() => this.goBack());
  }
}
