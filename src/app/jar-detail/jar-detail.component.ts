import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JarService } from '../jar.service';
import { Jars } from '../models/jars';
@Component({
  selector: 'app-jar-detail',
  templateUrl: './jar-detail.component.html',
  styleUrls: ['./jar-detail.component.scss'],
})
export class JarDetailComponent implements OnInit {
  jar: Jars;
  wallet;
  change: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private jarService: JarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getJar();
  }

  getJar() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.jar = this.jarService.getJar(id);
  }

  toNumber() {
    this.jar.expense = +this.jar.expense;
  }

  transaction(event) {
    let target = event.target || event.srcElement || event.currentTarget;
    this.router.navigate(['/transaction'], {
      queryParams: { id: this.jar.id, trans: target.id },
    });
  }
}
