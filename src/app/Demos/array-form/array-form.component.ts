import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { DemoService, DemoId } from '../demo.service';

@Component({
  selector: 'app-array-form',
  templateUrl: './array-form.component.html',
  styleUrls: ['./array-form.component.css']
})
export class ArrayFormComponent implements OnInit {

  myForm: FormGroup;
  public demo: DemoId[];

  constructor(private fb: FormBuilder, private demoService: DemoService) { }

  ngOnInit() {
    this.demoService.getDemo().subscribe(demo => {
      this.demo = demo;
      console.log('Kapjuk a service-ből:', demo);
    });

    this.myForm = this.fb.group({
      email: '',
      phones: this.fb.array([])
    });
  }

  get phoneForms() {
    return this.myForm.get('phones') as FormArray;
  }

  writeForms() {
    console.log('Küldjük a service-nek:', this.myForm.value);
    this.demoService.addDemo(this.myForm.value);
  }

  addPhone() {
    const phone = this.fb.group({
      area: [],
      prefix: [],
      line: [],
    });

    this.phoneForms.push(phone);
  }

  deletePhone(i) {
    this.phoneForms.removeAt(i);
  }
}
