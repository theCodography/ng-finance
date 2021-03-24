import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { JarsComponent } from './jars/jars.component';
import { FormsModule } from '@angular/forms';
import { TransactionComponent } from './transaction/transaction.component';
import { JarDetailComponent } from './jar-detail/jar-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PercentageComponent } from './percentage/percentage.component';
import { ScreenComponent } from './screen/screen.component';
import { HistoryComponent } from './history/history.component';
import { DropdownComponent } from './dropdown/dropdown.component';

import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
registerLocaleData(localeVi);
@NgModule({
  declarations: [
    AppComponent,
    JarsComponent,
    TransactionComponent,
    JarDetailComponent,
    PercentageComponent,
    ScreenComponent,
    HistoryComponent,
    DropdownComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'vi'},],
  bootstrap: [AppComponent],
})
export class AppModule {}
