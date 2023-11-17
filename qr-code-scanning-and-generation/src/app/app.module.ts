import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScannerComponent } from './pages/scanner/scanner.component';
import { GeneratorComponent } from './pages/generator/generator.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgxKjuaModule } from 'ngx-kjua';

@NgModule({
  declarations: [
    AppComponent,
    ScannerComponent,
    GeneratorComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ZXingScannerModule,
    MatButtonModule,
    NgxKjuaModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
