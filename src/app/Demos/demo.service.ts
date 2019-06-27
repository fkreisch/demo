import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Demo, DemoId } from './interface';

@Injectable({
  providedIn: 'root'
})

export class DemoService {

  private demoCollection: AngularFirestoreCollection<Demo>;
  private demoDoc: AngularFirestoreDocument<Demo>;
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
    return this.demo;
  }

  addDemo(doc: Demo) {
    this.demoCollection.add(doc);
  }

  deleteDemo(id: string) {
    this.demoDoc = this.afs.doc(`demo/${id}`);
    this.demoDoc.delete();
  }

  updateDemo(doc: Demo, id: string) {
    this.demoDoc = this.afs.doc(`demo/${id}`);
    this.demoDoc.set(doc, {merge: true});
  }
}
