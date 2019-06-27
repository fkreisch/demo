import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { DemoService } from '../demo.service';
import { DemoId } from '../interface';

@Component({
  selector: 'app-array-form-controls',
  templateUrl: './array-form-controls.component.html',
  styleUrls: ['./array-form-controls.component.css']
})

export class ArrayFormControlsComponent implements OnInit {

  public demo: DemoId[];
  editState = false;
  itemToEdit: DemoId;

  myForm = new FormGroup({
    record: new FormControl(),
    details: new FormControl(),
    fields: new FormArray([])
  });

  constructor(private fb: FormBuilder, private demoService: DemoService) { }

  ngOnInit() {
    this.demoService.getDemo().subscribe(demo => {
      this.demo = demo;
    });
  }

  // --> Array field functions BEGIN
  get fieldForms() {
    return this.myForm.get('fields') as FormArray;
  }

  fillFields(item) {
    this.fieldForms.clear();
    item.fields.forEach(ill => {
      const field = this.fb.group(ill);
      ill = this.fieldForms.push(field);
    });
  }

  deleteFields(i) {
    this.fieldForms.removeAt(i);
  }

  addFields() {
    const field = this.fb.group({
      field1: [],
      field2: [],
      field3: [],
    });
    this.fieldForms.push(field);
  }
  // --> Array field functions END

  editForms(event, item) {
    if (this.itemToEdit === item) {
      this.editState = false;
      this.itemToEdit = null;
    } else {
      this.editState = true;
      this.itemToEdit = item;
      this.fillFields(item);
    }
  }

  deleteForms(event, id) {
    this.demoService.deleteDemo(id);
    this.editState = false;
    this.itemToEdit = null;
  }

  updateForms(event, id) {
    this.demoService.updateDemo(this.myForm.value, id);
    this.editState = false;
    this.itemToEdit = null;
  }
}
