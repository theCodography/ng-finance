import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    JarsComponent,
    TransactionComponent,
    JarDetailComponent,
    PercentageComponent,
    ScreenComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
