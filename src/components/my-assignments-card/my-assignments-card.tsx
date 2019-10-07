import {Component, h} from '@stencil/core';
import {AssignmentHttpService} from '../../http_services/assignment.service';
import {RouteService} from "../../services/route.service";

@Component({
  tag: 'my-assignments-card',
  styleUrl: 'my-assignments-card.css'
})

export class MyAssignmentsCard {
  assignments: any[];
  courses: any[];
  params: any;

  async componentWillLoad() {
    this.params = RouteService.params();
    this.assignments = (await new AssignmentHttpService().query({
      course_id: this.params.course_id
    })).sort((a, b) => {
      return new Date(a.date) < new Date(b.date) ? 1 : -1
    });
  }

  renderAssignments() {
    let currentDateString;
    return this.assignments.map((assignment) => {
      const list = [
        new Date(assignment.date).toDateString() !== currentDateString ? (
          <ion-label class="ion-padding-horizontal"
                     style={{fontFamily: 'Verdana', fontWeight: 'lighter'}}>
            {new Date(assignment.date).toDateString()}
          </ion-label>
        ) : null,
        <assignment-card assignment={assignment}/>
      ];
      currentDateString = new Date(assignment.date).toDateString();
      return list;
    })
  }

  render() {
    return [
      this.renderAssignments(),
      <ion-row>
        <ion-col style={{textAlign: 'center'}}>
          <a href={`#/addassignments/?course_id=${this.params.course_id}`}><img id='addAssingment'
                                                                                src={'../assets/icon/BTN_AddAssignment.svg'}/></a>
        </ion-col>
      </ion-row>
    ];
  }
}
