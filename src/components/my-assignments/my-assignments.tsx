import {Component, h} from '@stencil/core';
import {AssignmentHttpService} from "../../http_services/assignment.service";
import {RouteService} from "../../services/route.service";

@Component({
  tag: 'my-assignments',
  styleUrl: 'my-assignments.css'
})
export class MyAssignments {
  assignments: any[];
  params: any;

  async componentWillLoad() {
    this.params = RouteService.params();
    this.assignments = await new AssignmentHttpService().query(
      this.params.course_id
        ? {course_id: this.params.course_id}
        : {}
    )
  }

  emptyAssignmentsOrNah() {
    if (this.assignments.length > 0) {
      if(this.params.course_id) {
        return <my-assignments-card/>
      } else {
        return <all-assignments/>
      }
    } else {
      return <no-assignments/>
    }
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          {this.params.course_id ? (
            <ion-buttons slot={'start'}>
              <ion-button href={'#/mycourses'}>Back</ion-button>
            </ion-buttons>
          ) : null}
          <ion-title>Assignments</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        {this.emptyAssignmentsOrNah()}
      </ion-content>,
      <app-footer/>

    ];
  }
}
