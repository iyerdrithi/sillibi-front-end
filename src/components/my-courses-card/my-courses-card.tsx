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
            <ion-item href={`#/courseinfo/?course_id=${course.id}`} class='ion-no-padding' lines={'full'} style={{'--border-color': course.color}}>
              <ion-label style={{marginLeft: '1.2rem'}}>{course.name}</ion-label>
            </ion-item>
            <ion-item lines={'none'}>
              <ion-label
                style={{fontSize: '1rem', fontWeight: 'lighter'}}>{course.number} - {course.section}</ion-label>
            </ion-item>
            <ion-item lines='full'>
              <ion-label style={{fontSize: '1rem', fontWeight: 'lighter'}}>{course.instructor}</ion-label>
            </ion-item>
            <ion-row style={{marginTop: '0rem'}}>
              <ion-toolbar>
                <ion-list>
                  <ion-item class='ion-no-padding' lines={'full'}
                            style={{background: 'transparent', paddingLeft: '1px'}}>
                    <ion-icon size='large' slot={'start'} name={'document'} style={{color: 'skyblue'}}/>
                    <ion-label style={{paddingLeft: '1rem'}}>Syllabus</ion-label>
                    <ion-label style={{flex: 'none'}} slot={'end'}>{course.syllabuses_count}</ion-label>
                    <ion-button size='large' slot='end' color={'transparent'} icon-only item-end
                                href={`#/syllabusupload/?course_id=${course.id}`}>
                      <ion-icon style={{color: 'skyblue'}} name="add-circle"/>
                    </ion-button>
                  </ion-item>
                </ion-list>
              </ion-toolbar>
            </ion-row>
            <ion-row>
              <ion-toolbar>
                <ion-list>
                  <ion-item class='ion-no-padding' lines={'full'}
                            style={{background: 'transparent', paddingLeft: '1px'}}>
                    <ion-icon size='large' slot={'start'} name={'paper'} style={{color: 'skyblue'}}/>
                    <ion-label style={{paddingLeft: '1rem'}}>Assignments</ion-label>
                    <ion-label style={{flex: 'none'}} slot={'end'}>0</ion-label>
                    <ion-button size='large' slot='end' color={'transparent'} icon-only item-end
                                href={`/addassignments/?course_id=${course.id}`}>
                      <ion-icon style={{color: 'skyblue'}} slot='end' name="add-circle"/>
                    </ion-button>
                  </ion-item>
                </ion-list>
              </ion-toolbar>
            </ion-row>
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

{/*<ion-item href={`/courseinfo/${course.id}`} class='ion-no-padding' lines={'full'}>*/}
