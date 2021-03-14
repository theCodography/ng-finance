import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { JarsComponent } from './jars/jars.component';
import { FormsModule } from '@angular/forms';
import { TransactionComponent } from './transaction/transaction.component';
import { JarDetailComponent } from './jar-detail/jar-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    JarsComponent,
    TransactionComponent,
    JarDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
