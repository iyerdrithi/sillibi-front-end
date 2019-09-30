import {Component, h} from '@stencil/core';

@Component({
  tag: 'my-courses',
  styleUrl: 'my-courses.css'
})
export class MyCourses {
  courseEndPoint = 'http://localhost:3000/courses';
  courses: any[];

  async componentWillLoad() {
    const res = await fetch(this.courseEndPoint);
    this.courses = await res.json()
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
