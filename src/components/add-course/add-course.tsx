import { Component, h } from '@stencil/core';
import { AppRoot } from '../app-root/app-root';

@Component({
  tag: 'add-course',
  styleUrl: 'add-course.css'
})
export class AddCourse {
  colorPicker: HTMLColorPickerElement;
  courseEndPoint = 'http://localhost:3000/courses';
  course_name: HTMLIonInputElement;
  course_number: HTMLIonInputElement;
  section: HTMLIonInputElement;
  term: HTMLIonInputElement;
  instructor: HTMLIonInputElement;

  async getAddCourseInfo() {
    let courseInput = {
      // 'user_id': localStorage.getItem('user_id'),
      'course_name': this.course_name.value,
      'course_number': this.course_number.value,
      'section': this.section.value,
      'term': this.term.value,
      'instructor': this.instructor.value,
      'color': await this.colorPicker.getSelectedColor()
    };
    this.postCourseInfo(courseInput)
  }

  async postCourseInfo(courseInput) {
    const res = await fetch(this.courseEndPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(courseInput)
    });
    const json = await res.json();
    console.log(json);
    AppRoot.getRouter().push('mycourses', 'root')

  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-title>Add Course</ion-title>
          <ion-buttons slot="primary">
            <ion-button href={'#/mycourses'}>Cancel</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
      <ion-card>
        <ion-row style={{paddingTop: '5px'}}align-items-center justify-content-around>
          <ion-icon  style={{fontSize: '4rem'}} name="contact" color={'indigo'}> </ion-icon>
        </ion-row>
        <ion-card-content>
          <ion-row>
            <ion-label>Course Name</ion-label>
          </ion-row>
          <ion-row>
            <ion-input ref={(el) => this.course_name = el as HTMLIonInputElement} style={{fontWeight:'bolder', fontSize:'1.2rem'}} placeholder={'Business Administration'} />
          </ion-row><ion-row>
          <ion-label>Course Number</ion-label>
        </ion-row>
          <ion-row>
            <ion-input ref={(el) => this.course_number = el as HTMLIonInputElement} style={{fontWeight:'bolder', fontSize:'1.2rem'}} placeholder={'e.g. MGMT 100'} />
          </ion-row>
          <ion-row>
            <ion-label>Section Number</ion-label>
          </ion-row>
          <ion-row>
            <ion-input ref={(el) => this.section = el as HTMLIonInputElement} style={{fontWeight:'bolder', fontSize:'1.2rem'}} placeholder={'e.g. 001'} />
          </ion-row>
          <ion-row>
            <ion-label>Term</ion-label>
          </ion-row>
          <ion-row>
            <ion-input ref={(el) => this.term = el as HTMLIonInputElement} style={{fontWeight:'bolder', fontSize:'1.2rem'}} placeholder={'Fall 2019'} />
          </ion-row>
          <ion-row>
            <ion-label>Instructor</ion-label>
          </ion-row>
          <ion-row>
            <ion-input ref={(el) => this.instructor = el as HTMLIonInputElement} style={{fontWeight:'bolder', fontSize:'1.2rem'}} placeholder={'Dr. Ben Jeezy'} />
          </ion-row>
          <ion-row>
            <ion-label>Color</ion-label>
            <color-picker ref={(el) => this.colorPicker = el}/>
          </ion-row>
          <section>
          <ion-button onClick={() => this.getAddCourseInfo()} expand='full' color={'warning'}>SAVE CHANGES</ion-button>
          </section>
        </ion-card-content>
      </ion-card>
      </ion-content>,
      <app-footer />
    ];
  }
}

{/*<ion-row><ion-icon size='large' name="radio-button-off" style={{color: 'blue', backgroundColor: 'blue', borderRadius:'50%'}}/></ion-row>*/}
{/*<ion-row>*/}
{/*<ion-button shape={'round'} style={{color: 'blue', backgroundColor: 'blue', borderRadius:'50%'}} color={'blue'}></ion-button>*/}
{/*  </ion-row>*/}


