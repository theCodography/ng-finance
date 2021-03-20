import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Jars } from '../models/jars';
import { JarService } from '../jar.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-jars',
  templateUrl: './jars.component.html',
  styleUrls: ['./jars.component.scss'],
})
export class JarsComponent implements OnInit {
  @ViewChild('income') inputIncome: ElementRef<HTMLInputElement>;
  @ViewChild('description') inputDescription: ElementRef<HTMLInputElement>;
  jars: Jars[] = [];
  jarsHistory: Jars[] = [];
  wallet;
  constructor(private jarService: JarService,
    private router: Router) {}

  ngOnInit(): void {
    this.getWallet();
    this.getJars();
  }

  getJars() {
    this.jars = this.jarService.getJars();
    this.jarsHistory = JSON.parse(JSON.stringify(this.jars));
  }

  getWallet() {
    this.wallet = this.jarService.getWallet();
  }
  transaction(event) {
    let target = event.target || event.srcElement || event.currentTarget;
    this.router.navigate(['/transaction'],{
      queryParams: { trans: target.id },
    });
  }
  save(income, description): void {
    this.wallet.income = income;
    this.inputIncome.nativeElement.value = '';
    this.inputDescription.nativeElement.value = '';
    this.jarsHistory = this.jarsHistory.map((jar) => {
      jar.income = (this.wallet.income * jar.percentage) / 100;
      return jar;
    });
    this.jars = this.jars.map((jar) => {
      jar.income += (this.wallet.income * jar.percentage) / 100;
      return jar;
    });

    this.jarService.addHistory(
      +income,
      this.jarsHistory,
      description,
      'income'
    );
    this.jarService.updateToLocalStorage();
  }
}
