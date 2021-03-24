import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Jars } from '../models/jars';
@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss'],
})
export class ScreenComponent implements OnInit {
  @Input() wallet;
  @Input() jar: Jars;
  percent: number;
  percentClass: string;
  over50: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.computePercentage(this.wallet || this.jar);
  }
  transaction(event) {
    let target = event.currentTarget;
    this.router.navigate(['/transaction'], {
      queryParams: { id: this.jar?.id, trans: target.id },
    });
  }
  computePercentage(something: any) {
    this.percent =
      Math.ceil((1 - something.expense / something.income) * 100) || 0;
    if (this.percent > 50) {
      this.over50 = true;
    }
    this.percentClass = `p${this.percent}`;
  }
}
