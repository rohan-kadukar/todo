import { Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  collectionData, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where 
} from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { Observable, switchMap } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {}

  getTasks(): Observable<Task[]> {
    return user(this.auth).pipe(
      switchMap(user => {
        const tasksRef = collection(this.firestore, 'tasks');
        const userTasks = query(tasksRef, where('userId', '==', user?.uid));
        return collectionData(userTasks, { idField: 'id' }) as Observable<Task[]>;
      })
    );
  }

  addTask(task: Task) {
    const tasksRef = collection(this.firestore, 'tasks');
    return addDoc(tasksRef, {
      ...task,
      userId: this.auth.currentUser?.uid,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  updateTask(id: string, task: Partial<Task>) {
    const taskRef = doc(this.firestore, `tasks/${id}`);
    return updateDoc(taskRef, {
      ...task,
      updatedAt: new Date()
    });
  }

  deleteTask(id: string) {
    const taskRef = doc(this.firestore, `tasks/${id}`);
    return deleteDoc(taskRef);
  }
}
