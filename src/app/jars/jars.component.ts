import { Component, OnInit } from '@angular/core';
import { Jars } from '../models/jars';
import { JarService } from '../jar.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-jars',
  templateUrl: './jars.component.html',
  styleUrls: ['./jars.component.scss'],
})
export class JarsComponent implements OnInit {
  jars: Jars[] = [];
  wallet;
  constructor(private jarService: JarService, private router: Router) {}

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
  transaction(event) {
    let target = event.target || event.srcElement || event.currentTarget;
    this.router.navigate(['/transaction'], {
      queryParams: { trans: target.id },
    });
  }
}
