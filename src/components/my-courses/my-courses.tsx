import {Component, h} from '@stencil/core';
import {CourseHttpService} from "../../http_services/course.service";
import {SessionService} from "../../services/session.service";

@Component({
  tag: 'my-courses',
  styleUrl: 'my-courses.css'
})
export class MyCourses {
  courses: any[];

  async componentWillLoad() {
    this.courses = await new CourseHttpService().query({
      user_id: SessionService.get().user_id
    })
  }

  emptyCoursesOrNah() {
    if (this.courses.length > 0) {
      return <my-courses-card />
    }
    else {
      return <no-courses/>
    }
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar style={{marginBottom:'2rem'}}>
          <ion-title>My Courses</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        {this.emptyCoursesOrNah()},
      </ion-content>,
      <app-footer />

    ];
  }
}
