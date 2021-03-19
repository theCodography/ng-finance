import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Jars } from '../models/jars';
import { JarService } from '../jar.service';
@Component({
  selector: 'app-jars',
  templateUrl: './jars.component.html',
  styleUrls: ['./jars.component.scss'],
})
export class JarsComponent implements OnInit {
  @ViewChild('income') inputIncome: ElementRef<HTMLInputElement>;
  @ViewChild('description') inputDescription: ElementRef<HTMLInputElement>;
  jars: Jars[] = [];
  wallet;
  constructor(private jarService: JarService) {}

  ngOnInit(): void {
    this.getWallet();
    this.getJars();
  }

  getJars() {
    this.jars = this.jarService.getJars();
  }

  getWallet() {
    this.wallet = this.jarService.getWallet();
  }

  save(income, description): void {
    this.wallet.income = income;
    this.inputIncome.nativeElement.value = '';
    this.inputDescription.nativeElement.value = '';
    this.jars = this.jars.map((jar) => {
      jar.income += (this.wallet.income * jar.percentage) / 100;
      return jar;
    });
    this.jarService.addHistory(income,this.jars,'income', description);
    this.jarService.updateToLocalStorage();
  }
}
