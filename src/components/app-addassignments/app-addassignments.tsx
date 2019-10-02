import { Component, h } from '@stencil/core';
import {RouteService} from "../../services/route.service";

@Component({
  tag: 'app-addassignments',
  styleUrl: 'app-addassignments.css'
})
export class AppAddAssignments {
  // courseEndPoint = 'http://localhost:3000/assignments';
  name: HTMLIonInputElement;
  date: HTMLIonDatetimeElement;
  description: HTMLIonTextareaElement;
  points: HTMLIonInputElement;

  getAssignmentinput() {
    let assignmentinfo = {
      "name": this.name.value,
      "date": this.date.value,
      "description": this.description.value,
      "points": this.points.value,
      "course_id": RouteService.params().course_id,
    };
    this.postAssignmentinfo(assignmentinfo)
  }

  postAssignmentinfo(assignmentinfo) {
    fetch(`http://localhost:3000/assignments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(assignmentinfo)
    })
      .then(response => response.json())
      .then(json => console.log(json))
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-title>Add Assignment</ion-title>
          <ion-buttons slot="primary">
            <ion-button href={'#/assignments'}>Cancel</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <ion-card>
          <ion-row style={{paddingTop:'5px'}}align-items-center justify-content-around>
          </ion-row>

        <ion-card-content>
        <ion-item>
          <ion-label position={"stacked"}> Assignment Name </ion-label>
          <ion-input ref={(el) => this.name = el as HTMLIonInputElement} required type="text" placeholder={"Assignment 1"}> </ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Due Date</ion-label>
          <ion-datetime ref={(el) => this.date = el as HTMLIonDatetimeElement} display-format="MM/DD/YYYY" min="2019-01-01" max="2030-12-12" placeholder={"2019/10/08"}> </ion-datetime>
        </ion-item>

        <ion-item>
          <ion-label position={"stacked"}> Description </ion-label>
          <ion-textarea ref={(el) => this.description = el as HTMLIonTextareaElement} autoGrow={true} required placeholder={"Write a twelve page essay"}> </ion-textarea>
        </ion-item>

        <ion-item>
          <ion-label position={"stacked"}> Possible Points </ion-label>
          <ion-input ref={(el) => this.points = el as HTMLIonInputElement} required type={"number"} min={"0"} max={"1000"} step={"1"} placeholder={"50"}> </ion-input>
        </ion-item>

          <ion-button href={"/assignmentinfo"} onClick={()=> this.getAssignmentinput()} style={{marginTop:'120px'}} expand={"full"} color={"warning"}> CREATE ASSIGNMENT </ion-button>
        </ion-card-content>
        </ion-card>
      </ion-content>


    ];
  }
}
