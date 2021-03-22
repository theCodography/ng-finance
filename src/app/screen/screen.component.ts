import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JarService } from '../jar.service';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {
  wallet;
  percent: number;
  percentClass: string;
  over50: boolean = false;
  constructor(private jarService: JarService, private router: Router) { }

  ngOnInit(): void {
    this.getWallet();
    this.computePercentage();
  }
  getWallet() {
    this.wallet = this.jarService.getWallet();
  }
  transaction(event) {
    let target = event.currentTarget;
    this.router.navigate(['/transaction'], {
      queryParams: { trans: target.id },
    });
  }
  computePercentage() {
    this.percent = Math.ceil(
      (1 - (this.wallet.expense / this.wallet.income)) * 100
    ) || 0;

    if(this.percent > 50) {
      this.over50 = true;
    }
    this.percentClass = `p${this.percent}`;
  }
}
