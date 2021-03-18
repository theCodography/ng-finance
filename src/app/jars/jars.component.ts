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

  save(): void {
    this.jars = this.jars.map(jar => {
      jar.income += this.wallet.income * jar.percentage / 100;
      return jar;
    });
    console.log( this.wallet.income);
    this.jarService.updateToLocalStorage();
  }
}
