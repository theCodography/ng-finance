import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JarService } from '../jar.service';
import { Jars } from '../models/jars';
@Component({
  selector: 'app-jar-detail',
  templateUrl: './jar-detail.component.html',
  styleUrls: ['./jar-detail.component.scss'],
})
export class JarDetailComponent implements OnInit {
  jar: Jars;
  wallet;
  change: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private jarService: JarService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getJar();
  }

  getJar() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.jar = this.jarService.getJar(id);
  }
  goBack(): void {
    this.location.back();
  }
  toNumber(){
    this.jar.expense = +this.jar.expense;
  }
  save(): void {
    this.jarService.updateToLocalStorage();
    this.jarService.addHistory(this.jar.expense, [this.jar]);
    this.goBack();
  }

  transaction() {
    this.change = !this.change;
  }
}
