import { Component, Input, OnInit } from '@angular/core';
import { JarService } from '../jar.service';
import { Histories } from '../models/histories';
import { Jars } from '../models/jars';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  jars: Jars[];
  jar: Jars;
  histories: Histories[];
  constructor(private jarService: JarService) { }

  ngOnInit(): void {
    this.jars = this.jarService.getJars();
    this.histories = this.getHistory();
  }
  changeSelected(obj) {
    console.log(obj);
    this.jar = obj;
    this.histories = this.getHistory(this.jar.id);
  }
  getHistory(id: number = 0) {
    return this.jarService.getHistory(id);
  }
}
