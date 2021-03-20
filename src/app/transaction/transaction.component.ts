import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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
  jar: Jars;
  jarHistory: Jars;
  trans: string;
  jars: Jars[];
  constructor(
    private jarService: JarService,
    public router: Router,
    private location: Location,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(value => {
      this.jar = this.jarService.getJar(+value.id || 1)
      this.trans = value.trans;
    });
    this.jars = this.jarService.getJars();
    if(this.jar) {
      this.jarHistory = JSON.parse(JSON.stringify(this.jar));
    }
  }
  save(money, description): void {
    this.money.nativeElement.value = '';
    this.inputDescription.nativeElement.value = '';
    if(this.trans === 'expense') {
      this.jar.expense += +money;
      this.jarHistory.expense = +money;
      this.jarHistory.income = 0;
      this.jarService.addHistory(
        +money,
        [this.jarHistory],
        description
      );
      this.jarService.updateToLocalStorage();
    }
    this.goBack();
    console.log(this.jar);
  }
  changeSelected(obj) {
   this.jar = obj;
   this.jarHistory = JSON.parse(JSON.stringify(this.jar));
  }
  goBack(): void {
    this.location.back();
  }
}
