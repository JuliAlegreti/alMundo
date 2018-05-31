import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './public/home/home.component';
import { HeaderComponent } from './public/components/header/header.component';
import { RequestService } from './services/app.request';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {AccordionModule} from "ngx-accordion";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    AccordionModule
  ],
  providers: [RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
