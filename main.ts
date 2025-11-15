import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- 2. Import FormsModule

// 4. Define the Task interface
interface Task {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  standalone: true, // <-- 1. Mark component as standalone
  imports: [
    FormsModule    // <-- 2. Add FormsModule to the imports array
  ],
  template: `
    <h2>My Task Tracker</h2>
    <input 
      type="text" 
      placeholder="Enter a task:" 
      [(ngModel)]="newTaskName"
      (keyup.enter)="AddTask()"
    />
    <button (click)="AddTask()">Add Task</button> @for(task of tasks ; track task.id){
      <p>{{task.name}}<button (click)="RemoveTask(task.id)">Done</button></p>
    } @empty {
      <p>No tasks yet. Add one!</p>
    }
  `,
})
export class Playground {

  // 4. Properly typed tasks array (added some initial tasks)
  tasks: Task[] = [
    { id: 1, name: "Learn Angular" },
    { id: 2, name: "Build a task tracker" }
  ];

  // 3. Define the newTaskName property to bind to the input
  newTaskName: string = '';

  AddTask() {
    // Good practice: Don't add empty tasks
    if (this.newTaskName.trim() === '') {
      return;
    }

    const newTask: Task = {
      id: Date.now(), // Use timestamp for a simple unique ID
      name: this.newTaskName.trim()
    };

    // Push the new task into the array
    this.tasks.push(newTask);

    // Clear the input field for the next entry
    this.newTaskName = '';
  }
  RemoveTask(idToRemove: number){
    this.tasks = this.tasks.filter(task => task.id !== idToRemove);
  }
}

bootstrapApplication(Playground);