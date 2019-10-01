import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-addassignments',
  styleUrl: 'app-addassignments.css'
})
export class AppAddAssignments {
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
          <ion-input required type={"text"} placeholder={"Assignment 1"}> </ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Due Date</ion-label>
          <ion-datetime display-format="MM/DD/YYYY" min="2019-01-01" max="2030-12-12" placeholder={"2019/10/08"}> </ion-datetime>
        </ion-item>

        <ion-item>
          <ion-label position={"stacked"}> Description </ion-label>
          <ion-textarea autoGrow={true} required placeholder={"Write a twelve page essay"}> </ion-textarea>
        </ion-item>

        <ion-item>
          <ion-label position={"stacked"}> Possible Points </ion-label>
          <ion-input required type={"number"} min={"0"} max={"1000"} step={"1"} placeholder={"50"}> </ion-input>
        </ion-item>
          <ion-button style={{marginTop:'120px'}} expand={"full"} color={"warning"}> CREATE ASSIGNMENT </ion-button>
        </ion-card-content>
        </ion-card>
      </ion-content>


    ];
  }
}
