import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DataGridComponent } from './components/data-grid/data-grid.component';

@NgModule({
  declarations: [AppComponent, DataGridComponent],
  imports: [BrowserModule, MatTableModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
