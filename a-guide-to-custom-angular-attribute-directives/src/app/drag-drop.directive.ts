import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { exhaustMap, Subject, take, takeUntil } from 'rxjs';

type DragDropCallback = (event: Element) => void;

@Directive({
  selector: '[appDragDrop]',
})
export class DragDropDirective implements OnInit, OnDestroy {
  @Input() appDragDrop?: DragDropCallback;

  mouseDown$ = new Subject<MouseEvent>();
  mouseUp$ = new Subject<MouseEvent>();
  destroy$ = new Subject();

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.mouseDown$
      .pipe(takeUntil(this.destroy$))
      .pipe(exhaustMap(() => this.mouseUp$.pipe(take(1))))
      .subscribe((event) => {
        if (
          this.appDragDrop &&
          event.target &&
          event.target instanceof Element &&
          !this.elementRef.nativeElement.contains(event.target)
        ) {
          this.appDragDrop(event.target);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.mouseDown$.next(event);
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    this.mouseUp$.next(event);
  }
}
