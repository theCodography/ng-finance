import { Component, Input, OnInit } from '@angular/core';
import { JarService } from '../jar.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  @Input() selected: boolean;
  constructor(private jarService: JarService) { }

  ngOnInit(): void {
  }

}
