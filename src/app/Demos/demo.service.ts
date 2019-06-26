import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Demo {
  email: string;
  phone: [];
}
export interface DemoId extends Demo {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  private demoCollection: AngularFirestoreCollection<Demo>;
  demo: Observable<DemoId[]>;

  constructor(public afs: AngularFirestore) {
    this.demoCollection = afs.collection<Demo>('demo');
  }

  getDemo() {
    this.demo = this.demoCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Demo;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    console.log ('GET DATA:', this.demo);
    return this.demo;
  }

  addDemo(doc: Demo) {
    console.log ('POST DATA:', doc);
    this.demoCollection.add(doc);
  }
}
