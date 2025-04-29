import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonCard,
  IonCardHeader,
  IonItem,
  IonLabel,
  IonCardContent,
} from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonButton,
    IonInput,
    IonCardHeader,
    IonItem,
    IonLabel,
    IonCardContent,
    NgFor,
    ReactiveFormsModule,
    NgClass,],
})

export class HomePage {
  formToDo: FormGroup;
  todoList: ToDo[] = [];
  constructor(private formBuilder: FormBuilder) {
    this.formToDo = this.formBuilder.group({
      todofield: [''],
    })

    this.loadToDos();
  }

  addToDo() {
    let newToDo = this.formToDo.value.todofield;
    if (newToDo) {
      this.todoList.push({
        id: uuidv4(),
        name: newToDo,
        completed: false,
      })
      this.saveToDos();
      this.formToDo.reset();
    }

  }

  completeToDo(id: string) {
    this.todoList = this.todoList.map(e => e.id === id ? { ...e, completed: !e.completed } : e);
    this.saveToDos();
  }

  deleteToDo(id: string) {
    this.todoList = this.todoList.filter(e => e.id !== id);
    this.saveToDos();
  }

  saveToDos() {
    localStorage.setItem('toDos', JSON.stringify(this.todoList));
  }

  loadToDos() {
    const savedTodos = localStorage.getItem('toDos');
    if (savedTodos) {
      this.todoList = JSON.parse(savedTodos);
    }
  }
}

export interface ToDo {
  id: string;
  name: string;
  completed: boolean;
}
