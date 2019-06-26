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
    fields: new FormArray([])
  });

  constructor(private fb: FormBuilder, private demoService: DemoService) { }

  ngOnInit() {
    this.demoService.getDemo().subscribe(demo => {
      this.demo = demo;
      console.log('Kapjuk a service-ből:', demo);
    });
  }

  get fieldForms() {
    // console.log ('FUSS buli, fuss!!!!', this.myForm);
    return this.myForm.get('fields') as FormArray;
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
    console.log ('URESET SZURTUNK', this.fieldForms);
    this.fieldForms.push(field);
  }

  editForms(event, i, item) {
    if (this.itemToEdit === i) {
      this.editState = false;
      this.itemToEdit = null;
    } else {
      this.editState = true;
      this.itemToEdit = i;

      // Filling FormArray from Firebase data
      this.fieldForms.clear();
      item.forEach(ill => {
        const field = this.fb.group(ill);
        ill = this.fieldForms.push(field);
      });
    }
  }

  deleteForms(event, item) {
    this.demoService.deleteDemo(item);
    this.editState = false;
    this.itemToEdit = null;
  }

  updateForms(event, item, id) {
    this.demoService.updateDemo(item, id);
    console.log ('ITEMET küldjük:', item);
    this.editState = false;
    this.itemToEdit = null;
  }
}
