import { Component, OnInit } from '@angular/core';
import { Jars } from '../models/jars';
import { JarService } from '../jar.service';
@Component({
  selector: 'app-jars',
  templateUrl: './jars.component.html',
  styleUrls: ['./jars.component.scss'],
})
export class JarsComponent implements OnInit {
  jars: Jars[] = [];
  constructor(private jarService: JarService) {}

  ngOnInit(): void {
    this.getJars();
  }

  getJars() {
    this.jars = this.jarService.getJars();
  }
}
