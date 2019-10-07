import {Component, h, Prop} from '@stencil/core';
import {AppRoot} from "../app-root/app-root";

@Component({
  tag: 'course-assignment-card',
  styleUrl: 'course-assignment-card.css'
})

export class CourseAssignmentCard {
  @Prop() course: any;
  @Prop() assignments: any[];

  componentWillLoad() {
  }

  renderAssignments() {
    return this.assignments.map((assignment) => {
      return [
        <ion-item href={`#/myassignmentsinfo/?assignment_id=${assignment.id}`}>
          <ion-text style={{fontSize: '1rem', fontWeight: 'bold'}}> {assignment.name}</ion-text>
          <ion-text slot={"end"} style={{fontSize: '1rem', fontWeight: 'bold'}}>{assignment.points} pts</ion-text>
        </ion-item>,
        <ion-item lines="full">
          <ion-textarea readonly>
            {assignment.description}
          </ion-textarea>
        </ion-item>
      ]
    });
  }

  render() {
    return [
      <ion-card>
        <ion-card-content class='ion-no-padding'>
          <ion-item onClick={() => AppRoot.route(`/myassignments/?course_id=${this.course.id}`)}
                    lines={'full'} style={{'--border-color': this.course.color}}>
            <ion-label>{this.course.name}</ion-label>
          </ion-item>
          {this.renderAssignments()}
        </ion-card-content>
      </ion-card>
    ];
  }
}
