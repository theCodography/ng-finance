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
  color = {
    "1": '#ff9aa2',
    "2": '#ffb7b2',
    "3": '#ffdac1',
    "4": '#e2f0cb',
    "5": '#b5ead7',
    "6": '#c7ceea'
  }
  backColor;
  jar: Jars;
  change: boolean = false;
  constructor(private route: ActivatedRoute, private jarService: JarService) {}

  ngOnInit(): void {
    this.getJar();
    this.backColor = this.color[this.jar.id];
  }

  getJar() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.jar = this.jarService.getJar(id);
  }
}
