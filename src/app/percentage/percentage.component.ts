import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { JarService } from '../jar.service';
import { Jars } from '../models/jars';
@Component({
  selector: 'app-percentage',
  templateUrl: './percentage.component.html',
  styleUrls: ['./percentage.component.scss'],
})
export class PercentageComponent implements OnInit {
  @Input() jars: Jars[];
  alert: boolean = true;
  private percentageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    100
  );
  percentage$: Observable<number> = this.percentageSubject.asObservable();
  percentage: number = 100;
  constructor(private modalService: NgbModal, private jarService: JarService) {}

  ngOnInit(): void {}
  open(content) {
    this.modalService.open(content, { size: 'sm', centered: true });
  }
  changePercentage(jar: Jars, event) {
    if (event.target.id === 'minus' && jar.percentage > 0) {
      jar.percentage -= 5;
    } else if (event.target.id === 'plus' && jar.percentage < 100) {
      jar.percentage += 5;
    }
    //! Logic
    this.percentageSubject.next(
      this.jars.reduce((acc, jar) => {
        return acc + jar.percentage;
      }, 0)
    );
    this.percentage$.subscribe((v) => {
      this.percentage = v;
      if (v === 100) {
        this.alert = true;
      } else {
        this.alert = false;
      }
    });
  }
  updatePercentage() {
    this.jarService.updateToLocalStorage();
  }
}
