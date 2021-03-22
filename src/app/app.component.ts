import { Component, OnInit } from '@angular/core';
import { JarService } from './jar.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ng-finance';
  constructor(private jarService: JarService) {}

  ngOnInit() {
    this.jarService.fetchFromLocalStorage();
    this.jarService.updateToLocalStorage();
  }
}
