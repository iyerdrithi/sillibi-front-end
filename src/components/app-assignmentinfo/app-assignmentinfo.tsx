import {Component, h,} from '@stencil/core';

@Component({
  tag: 'app-assignmentinfo',
  styleUrl: 'app-assignmentinfo.css'
})
export class AppAssignmentinfo {

  assignmentcard() {
    return [
      <app-assignmentcard>

      </app-assignmentcard>
    ]
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar style={{marginBottom:'2rem'}}>
          <ion-title>Assignments</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        {
          this.assignmentcard()
        }
      </ion-content>
    ]
  }
}
