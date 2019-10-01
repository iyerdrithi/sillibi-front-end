import { Component, h } from '@stencil/core';

@Component({
  tag: 'no-courses',
  styleUrl: 'no-courses.css'
})
export class NoCourses {

  render() {
    return [
        <ion-row>
          <ion-col>
          <a href={'#/addcourse'}><img id='addCourse' src='../assets/icon/addcourse.svg' style={{textAlign: 'center'}} alt={'Add Courses'}/></a>
          </ion-col>
        </ion-row>,
        <ion-row>
          <ion-col style={{textAlign:'center', marginTop:'3rem'}}>
          <ion-text style={{fontSize:'1.8rem', fontWeight:'bold'}}>
          Add a course to upload a syllabus
          </ion-text>
          </ion-col>
        </ion-row>
    ];
  }
}
