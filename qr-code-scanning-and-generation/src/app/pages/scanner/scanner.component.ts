import { Component, ViewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  map,
  scan,
  shareReplay,
  startWith,
} from 'rxjs';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent {
  @ViewChild('scanner') scanner!: ZXingScannerComponent;

  allowedFormats = [BarcodeFormat.QR_CODE];

  devices$ = new BehaviorSubject<MediaDeviceInfo[]>([]);

  selectedDevice$: Observable<MediaDeviceInfo> = this.devices$.pipe(
    map((device) => device[0]),
    distinctUntilChanged(),
    shareReplay(1)
  );

  enable$ = this.devices$.pipe(map(Boolean));

  toggleCamera$ = new BehaviorSubject<boolean>(false);

  startCamera$ = this.toggleCamera$.pipe(
    scan((acc) => !acc, true),
    startWith(true)
  );

  scanSuccess$ = new BehaviorSubject<string>('');

  scanError(error: Error) {
    console.error(error);
  }
}
