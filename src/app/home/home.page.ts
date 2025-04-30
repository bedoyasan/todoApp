import { NgClass, NgFor, NgIf } from '@angular/common';
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
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    IonSelect,
    IonSelectOption,
    NgFor,
    ReactiveFormsModule,
    NgClass,
    NgIf,
    FormsModule,
  ],
})
export class HomePage {
  formToDo: FormGroup;
  todoList: ToDo[] = [];
  typeList: string[] = ["Trabajo", "Personal", "Otro..."]

  filterValue: string = "";
  constructor(private formBuilder: FormBuilder) {
    this.formToDo = this.formBuilder.group({
      todofield: [''],
      typefield: [''],
      typecustomfield: [''],
    })
    
    this.loadToDos();
  }

  setFilter(event: any) {
    this.filterValue = event.detail.value;
  }

  resetFilter() {
    this.filterValue = "";
  }

  getFilterValues() {
    let filterData: string[] = [];
    this.todoList.forEach(e => {
      if(!filterData.includes(e.type)) {
        filterData.push(e.type);
      }
    });

    return filterData;
  }

  addToDo() {
    let newToDo = this.formToDo.value.todofield;
    let typeToDo = this.formToDo.value.typefield;
    if (typeToDo === 'Otro...') {
      typeToDo = this.formToDo.value.typecustomfield;
      if (typeToDo) {
        this.typeList = [
          ...this.typeList.slice(0, this.typeList.length - 1),
          typeToDo,
          this.typeList[this.typeList.length - 1]
        ]
      }
    }
    if (newToDo && typeToDo) {
      this.todoList.push({
        id: uuidv4(),
        name: newToDo,
        completed: false,
        type: typeToDo,
      })
      this.saveToDos();
      this.formToDo.reset();
      this.resetFilter();
    }

  }

  removeType(typeName: string) {
    this.typeList = this.typeList.filter(e => e !== typeName);
    this.saveToDos();
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
    localStorage.setItem('typeToDos', JSON.stringify(this.typeList));
  }

  loadToDos() {
    const savedTodos = localStorage.getItem('toDos');
    if (savedTodos) {
      this.todoList = JSON.parse(savedTodos);
    }
    const savedTypes = localStorage.getItem('typeToDos');
    if (savedTypes) {
      this.typeList = JSON.parse(savedTypes);
    }
  }
}

export interface ToDo {
  id: string;
  name: string;
  completed: boolean;
  type: string;
}
