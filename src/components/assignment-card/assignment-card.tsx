import {Component, h, Prop} from '@stencil/core';

@Component({
  tag: 'assignment-card',
  styleUrl: 'assignment-card.css'
})

export class AssignmentCard {
  @Prop() assignment: any;

  render() {
    return [
      <ion-card>
        <ion-card-content class='ion-no-padding'>
          <ion-item class="ion-no-padding"
                    href={`#/myassignmentsinfo/?assignment_id=${this.assignment.id}`}>
            <ion-text class="ion-padding" style={{fontSize: '1rem', fontWeight: 'bold'}}> {this.assignment.name}</ion-text>
            <ion-text slot={"end"} style={{fontSize: '1rem', fontWeight: 'bold'}}>{this.assignment.points} pts</ion-text>
          </ion-item>
          <ion-item lines="none">
            <ion-textarea readonly>
              {this.assignment.description}
            </ion-textarea>
          </ion-item>
        </ion-card-content>
      </ion-card>
    ];
  }
}
