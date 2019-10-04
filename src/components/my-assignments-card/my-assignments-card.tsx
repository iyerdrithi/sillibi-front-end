import {Component, h} from '@stencil/core';
import { AssignmentHttpService } from '../../http_services/assignment.service';
import {RouteService} from "../../services/route.service";

@Component({
  tag: 'my-assignments-card',
  styleUrl: 'my-assignments-card.css'
})

export class MyAssignmentsCard {
  assignments: any[];
  params: any;
  async componentWillLoad() {
    this.params = RouteService.params();
    this.assignments = (await new AssignmentHttpService().query({
      course_id: this.params.course_id
    })).sort((a, b) => {
      return new Date(a.date) < new Date(b.date) ? 1 : -1
    })
  }


  renderAssignments() {
    return this.assignments.map((assignment) => {
      let convertedDate = new Date(assignment.date);
      let dateString = convertedDate.toDateString();
      return [
          <ion-header style={{fontFamily:'Verdana', fontWeight:'lighter', marginLeft:'2rem'}}>
            {dateString}
          </ion-header>,
        <ion-card>
          <ion-card-content class='ion-no-padding'>
            <ion-item href={`#/myassignmentsinfo/?assignment_id=${assignment.id}`}>
              <ion-text style={{fontSize: '1rem', fontWeight: 'bold'}}> {assignment.name}</ion-text>
              <ion-text slot={"end"} style={{fontSize: '1rem', fontWeight: 'bold'}}>{assignment.points} pts</ion-text>
            </ion-item>
            <ion-item>
              <ion-textarea>
                {assignment.description}
              </ion-textarea>
            </ion-item>
          </ion-card-content>
        </ion-card>
      ]
    })
  }

  render() {
    return [
      <ion-content>
        {this.renderAssignments()},
        <ion-row>
          <ion-col style={{textAlign: 'center'}}>
            <a href={`#/addassignments/?course_id=${this.params.course_id}`}><img id='addAssingment' src={'../assets/icon/BTN_AddAssignment.svg'} /></a>
          </ion-col>
        </ion-row>
      </ion-content>
    ];
  }
}
