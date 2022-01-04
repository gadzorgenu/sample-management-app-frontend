import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent implements OnInit {
  @Input() label: string = "";
  @Input() type: string = "";
  @Input() name: string = "";
  @Input() placeholder: string = "";
  @Input() for: string = "";
  @Input() id: string = "";
  // @Input() ngModel:any;
  constructor() { }

  ngOnInit(): void {
  }

}
