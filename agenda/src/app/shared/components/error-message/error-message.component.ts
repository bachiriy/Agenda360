import { Component, Input, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-error-message',
  standalone: false,
  templateUrl: './error-message.component.html',
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms 100ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ErrorMessageComponent implements OnInit  {

  @Input() isOn: boolean = true;
  @Input() type: 'warning' | 'error' | 'success' = 'success';
  @Input() message: string = '';

  ngOnInit() {
    if (this.isOn) {
      setTimeout(() => {
        this.isOn = false;
      }, 3000);
    }
  }
}
