import {Component, h, State} from '@stencil/core';
import {AssignmentHttpService} from '../../http_services/assignment.service';
import {RouteService} from "../../services/route.service";
import _ from 'underscore';
import {CourseHttpService} from "../../http_services/course.service";
import {SessionService} from "../../services/session.service";

@Component({
  tag: 'all-assignments',
  styleUrl: 'all-assignments.css'
})

export class AllAssignments {
  @State() shownAssignments: any[];
  assignments: any[];
  courses: any[];
  params: any;
  searchBar: HTMLIonSearchbarElement;

  async componentWillLoad() {
    this.params = RouteService.params();
    this.assignments = (await new AssignmentHttpService().query({}))
      .sort((a, b) => {
        return new Date(a.date) > new Date(b.date) ? 1 : -1
      });
    this.courses = await new CourseHttpService().query({
      user_id: SessionService.get().user_id
    });
    this.shownAssignments = this.assignments;
  }

  renderCourseAssignments() {
    const grouped = _.groupBy(this.shownAssignments, (assignment) => new Date(assignment.date).toDateString());
    Object.keys(grouped).forEach((dateStr) => {
      const assignments_at_date = grouped[dateStr];
      grouped[dateStr] = _.groupBy(assignments_at_date, 'course_id');
    });
    console.log(grouped);
    return Object.keys(grouped).map((dateStr) => {
      const course_assignments = grouped[dateStr];
      const courseCards = Object.keys(course_assignments).map((course_id) => {
        const course = _.findWhere(this.courses, {id: Number(course_id)});
        const assignments = course_assignments[course_id];
        return <course-assignment-card course={course} assignments={assignments}/>
      });
      console.log(dateStr, 'has', courseCards.length, 'course cards');
      return [
        <ion-header class="ion-padding-horizontal"
                    style={{fontFamily: 'Verdana', fontWeight: 'lighter'}}>
          {new Date(dateStr).toDateString()}
        </ion-header>
      ].concat(courseCards)
    });
  }

  onSearchBarChanged(event) {
    this.shownAssignments = this.assignments.filter((assignment) => {
      return assignment.name.toLowerCase().match(event.detail.value.toLowerCase());
    })
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-title>All Assignments</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <ion-searchbar ref={(el) => this.searchBar = el}
                       onIonChange={(evt) => this.onSearchBarChanged(evt)}/>
        {
          this.assignments.length > 0
            ? this.renderCourseAssignments()
            : <no-assignments/>
        }
      </ion-content>,
      <app-footer/>
    ];
  }
}
