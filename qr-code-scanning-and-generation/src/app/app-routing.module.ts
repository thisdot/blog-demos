import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScannerComponent } from './pages/scanner/scanner.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GeneratorComponent } from './pages/generator/generator.component';

const routes: Routes = [
  {
    path: '',
    title: 'ZXing Angular Demo',
    component: DashboardComponent,
  },
  {
    path: 'scanner',
    title: 'QR Code Scanner',
    component: ScannerComponent,
  },
  {
    path: 'generator',
    title: 'QR Code Generator',
    component: GeneratorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
