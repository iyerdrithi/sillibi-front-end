import {Component, h, State} from '@stencil/core';
import {AssignmentHttpService} from '../../http_services/assignment.service';
import {RouteService} from "../../services/route.service";

@Component({
  tag: 'my-assignments-card',
  styleUrl: 'my-assignments-card.css'
})

export class MyAssignmentsCard {
  @State() shownAssignments: any[];
  assignments: any[];
  courses: any[];
  params: any;
  searchBar: HTMLIonSearchbarElement;

  async componentWillLoad() {
    this.params = RouteService.params();
    this.assignments = (await new AssignmentHttpService().query({
      course_id: this.params.course_id
    })).sort((a, b) => {
      return new Date(a.date) > new Date(b.date) ? 1 : -1
    });
    this.shownAssignments = this.assignments;
  }

  renderAssignments() {
    let currentDateString;
    return this.shownAssignments.map((assignment) => {
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

  onSearchBarChanged(event) {
    this.shownAssignments = this.assignments.filter((assignment) => {
      return assignment.name.toLowerCase().match(event.detail.value.toLowerCase());
    })
  }

  render() {
    return [
      <ion-searchbar ref={(el) => this.searchBar = el}
                     onIonChange={(evt) => this.onSearchBarChanged(evt)}/>,
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
