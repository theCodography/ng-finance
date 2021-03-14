import { Component, OnInit } from '@angular/core';
import { Jars } from '../jars';
import { JARS } from '../mock-jars';
import { JarService } from '../jar.service';
@Component({
  selector: 'app-jars',
  templateUrl: './jars.component.html',
  styleUrls: ['./jars.component.scss'],
})
export class JarsComponent implements OnInit {
  jars: Jars[] = [];
  totalMoney = 10000000;
  constructor(private jarService: JarService) {}

  ngOnInit(): void {
    this.getJars();
  }

  getJars() {
    this.jarService.getJars().subscribe(jars => {
      this.jars = jars;
    });
  }
}
