import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { JarService } from '../jar.service';
import { Jars } from '../models/jars';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  @ViewChild('money') money: ElementRef<HTMLInputElement>;
  @ViewChild('description') inputDescription: ElementRef<HTMLInputElement>;
  show: boolean = false;
  jar: Jars;
  jarHistory: Jars[];
  trans: string;
  jars: Jars[];
  constructor(
    private jarService: JarService,
    public router: Router,
    private location: Location,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((value) => {
      this.jar = this.jarService.getJar(+value.id || 1);
      this.trans = value.trans || 'expense';
    });
    this.jars = this.jarService.getJars();
  }
  save(money, description): void {
    if (money !== '' && Number(money) !== 0) {
      this.money.nativeElement.value = '';
      this.inputDescription.nativeElement.value = '';
      if (this.trans === 'expense') {
        this.jarHistory = [JSON.parse(JSON.stringify(this.jar))];
        this.jar.expense += +money;
        this.jarHistory = this.jarHistory.map((jar) => {
          jar.expense = +money;
          jar.income = 0;
          return jar;
        });
        this.jarService.addHistory(+money, this.jarHistory, description);
      } else if (this.trans === 'income') {
        this.jarHistory = JSON.parse(JSON.stringify(this.jars));
        this.jars = this.jars.map((jar) => {
          jar.income += (+money * jar.percentage) / 100;
          return jar;
        });
        this.jarHistory = this.jarHistory.map((jar) => {
          jar.income = (+money * jar.percentage) / 100;
          return jar;
        });
        this.jarService.addHistory(
          +money,
          this.jarHistory,
          description,
          'income'
        );
      }
      this.jarService.updateToLocalStorage();
      this.goBack();
    }else {
      alert('nhap tien');
    }
  }
  changeSelected(obj) {
    this.jar = obj;
    this.jarHistory = JSON.parse(JSON.stringify(this.jar));
  }
  goBack(): void {
    this.location.back();
  }
}
