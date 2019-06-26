import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { DemoService } from '../demo.service';
import { DemoId } from '../interface';

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
    this.myForm = this.fb.group({
      record: '',
      fields: this.fb.array([])
    });
  }

  get fieldForms() {
    return this.myForm.get('fields') as FormArray;
  }

  addFields() {
    const field = this.fb.group({
      field1: [],
      field2: [],
      field3: [],
    });

    this.fieldForms.push(field);
  }

  deleteFields(i) {
    this.fieldForms.removeAt(i);
  }

  writeForms() {
    console.log('Küldjük a service-nek:', this.myForm.value);
    this.demoService.addDemo(this.myForm.value);
    this.myForm = this.fb.group({
      record: '',
      fields: this.fb.array([])
    });
  }
}
