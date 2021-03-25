import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { JarService } from '../jar.service';
import { Jars } from '../models/jars';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  @ViewChild('money') money: ElementRef<HTMLInputElement>;
  @ViewChild('description') inputDescription: ElementRef<HTMLInputElement>;
  today: Date = new Date(Date.now());
  dateHistory: Date;
  model: NgbDateStruct = {
    day: this.today.getDate(),
    month: this.today.getMonth(),
    year: this.today.getFullYear(),
  };
  jar: Jars;
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
    this.dateHistory = new Date(
      this.model.year,
      this.model.month,
      this.model.day
    );
    if (money !== '' && Number(money) !== 0) {
      this.money.nativeElement.value = '';
      this.inputDescription.nativeElement.value = '';
      if (this.trans === 'expense') {
        this.jar.expense += +money;
        this.jarService.addHistory(
          +money,
          this.jar,
          this.dateHistory,
          description
        );
      } else if (this.trans === 'income') {
        this.jars = this.jars.map((jar) => {
          jar.income += (+money * jar.percentage) / 100;
          this.jarService.addHistory(
            (+money * jar.percentage) / 100,
            jar,
            this.dateHistory,
            description,
            'income'
          );
          return jar;
        });
      }
      this.jarService.updateToLocalStorage();
      this.goBack();
    } else {
      alert('nhap tien');
    }
  }
  changeSelected(obj) {
    this.jar = obj;
  }
  goBack(): void {
    this.location.back();
  }
}
