import {Component, h,} from '@stencil/core';

@Component({
  tag: 'app-assignmentcard',
  styleUrl: 'app-assignmentcard.css'
})
export class AppAssignmentcard {
  render() {
    return [
    <ion-card>
      <ion-card-content class='ion-no-padding'>
        <ion-item>
          <ion-text style={{fontSize: '1rem', fontWeight: 'bold'}}> Exam 01 </ion-text>
          <ion-text slot={"end"} style={{fontSize: '1rem', fontWeight: 'bold'}}> 50 pts </ion-text>
        </ion-item>

        <ion-item>
          <ion-textarea> this is the assignment description this is the assignment description this is the assignment description </ion-textarea>
        </ion-item>

      </ion-card-content>
    </ion-card>
    ];
  }
}
