import {Component, h} from '@stencil/core';
import {SessionService} from "../../services/session.service";
import {CourseHttpService} from "../../http_services/course.service";

@Component({
  tag: 'my-courses-card',
  styleUrl: 'my-courses-card.css'
})
export class MyCoursesCard {
  courses: any[];

  async componentWillLoad() {
    await this.fetchCourseData();
  }

  async fetchCourseData() {
    this.courses = await new CourseHttpService().query({
      user_id: SessionService.get().user_id
    })
  }

  renderCourses() {
    return this.courses.map((course) => {
      return (
        <ion-card>
          <ion-card-content class='ion-no-padding'>
            <ion-item href={`#/courseinfo/?course_id=${course.id}`} class='ion-no-padding' lines={'full'}
                      style={{'--border-color': course.color}}>
              <ion-label style={{marginLeft: '1.2rem'}}>{course.name}</ion-label>
            </ion-item>
            <ion-item lines={'none'}>
              <ion-label
                style={{fontSize: '1rem', fontWeight: 'lighter'}}>{course.number} - {course.section}</ion-label>
            </ion-item>
            <ion-item lines='full'>
              <ion-label style={{fontSize: '1rem', fontWeight: 'lighter'}}>{course.instructor}</ion-label>
            </ion-item>
            <ion-item lines={'full'}
                      style={{background: 'transparent'}}
                      button={true} href={
              course.syllabuses_count > 0
                ? `#/syllabusview/?course_id=${course.id}`
                : `#/syllabusupload/?course_id=${course.id}`
            }>
              <ion-icon size="large" slot={'start'} name={'document'} style={{color: 'skyblue'}}/>
              <ion-label>Syllabus</ion-label>
              <ion-note slot="end">{course.syllabuses_count}</ion-note>
              <ion-button size='large' fill="clear" slot='end' color={'transparent'}
                          href={`#/syllabusupload/?course_id=${course.id}`}>
                <ion-icon style={{color: 'skyblue'}} slot="icon-only" name="add-circle"/>
              </ion-button>
            </ion-item>
            <ion-item href={`#/myassignments/?course_id=${course.id}`} lines={'full'}
                      style={{background: 'transparent'}}>
              <ion-icon size="large" slot={'start'} name={'paper'} style={{color: 'skyblue'}}/>
              <ion-label>Assignments</ion-label>
              <ion-note slot={'end'}>{course.assignments_count}</ion-note>
              <ion-button size='large' fill="clear" slot='end' color={'transparent'}
                          href={`#/addassignments/?course_id=${course.id}`}>
                <ion-icon style={{color: 'skyblue'}} slot='icon-only' name="add-circle"/>
              </ion-button>
            </ion-item>
          </ion-card-content>
        </ion-card>
      )
    })
  }


  render() {
    return [
      <ion-content fullscreen>
        {this.renderCourses()}
        <ion-row>
          <ion-col>
            <a href={'#/addcourse'}><img id='addCourse' src={'../assets/icon/addcourse.svg'}/></a>
          </ion-col>
        </ion-row>
      </ion-content>
    ];
  }
}

{/*<ion-item href={`/courseinfo/${course.id}`} class='ion-no-padding' lines={'full'}>*/
}
