import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Jars } from '../models/jars';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Input() hasDefault: boolean = false;
  @Input() jars: Jars[];
  @Output() selectedJar = new EventEmitter<Jars>();
  @Output() selectedDefault = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}
}
