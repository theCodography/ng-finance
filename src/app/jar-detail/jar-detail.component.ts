import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JarService } from '../jar.service';
import { Jars } from '../jars';
@Component({
  selector: 'app-jar-detail',
  templateUrl: './jar-detail.component.html',
  styleUrls: ['./jar-detail.component.scss'],
})
export class JarDetailComponent implements OnInit {
  jar: Jars;
  totalMoney: number;
  constructor(
    private route: ActivatedRoute,
    private jarService: JarService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.totalMoney = this.jarService.totalMoney;
    this.getJar();
  }

  getJar() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.jarService.getJar(id)
      .subscribe(jar => this.jar = jar);
  }
  goBack(): void {
    this.location.back();
  }
}
