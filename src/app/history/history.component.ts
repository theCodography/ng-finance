import { Component, OnInit } from '@angular/core';
import { JarService } from '../jar.service';
import { Histories } from '../models/histories';
import { Jars } from '../models/jars';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  today: Date = new Date(Date.now());
  currentMonth = this.today.getMonth() + 1;
  currentYear = this.today.getFullYear();
  month: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  year: number[] = [2020, 2021];
  jars: Jars[];
  jar: Jars;
  histories: Histories[];
  newHistories: Histories[];
  filter;
  constructor(private jarService: JarService) {}

  ngOnInit(): void {
    this.jars = this.jarService.getJars();
    this.filter = {
      month: +this.currentMonth,
      year: +this.currentYear,
      id: 0,
    };
    this.histories = this.getHistory(this.filter);
    this.histories.sort((a, b) =>
      b.datetime > a.datetime ? 1 : a.datetime > b.datetime ? -1 : 0
    );
  }
  changeSelected(obj) {
    this.jar = obj;
    this.filter.id = this.jar?.id || 0;
    this.histories = this.getHistory(this.filter);
  }
  getHistory(filter) {
    return this.jarService.getHistory(filter);
  }

  changeDate() {
    this.filter.month = +this.currentMonth;
    this.filter.year = +this.currentYear;
    this.histories = this.getHistory(this.filter);
  }
}
