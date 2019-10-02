import { Component, h, State } from '@stencil/core';
import {AppRoot} from "../app-root/app-root";
import {CourseHttpService} from "../../http_services/course.service";
import {SessionService} from "../../services/session.service";

@Component({
  tag: 'add-course',
  styleUrl: 'add-course.css'
})
export class AddCourse {
  colorPicker: HTMLColorPickerElement;
  @State() course: any = {};

  async getAddCourseInfo() {
    this.course.color = await this.colorPicker.getSelectedColor();
    const course = await this.postCourseInfo();
    this.course = {...course};
    AppRoot.getRouter().push('mycourses', 'root')
  }

  update(event) {
    this.course[event.target.name] = event.target.value;
  }

  async postCourseInfo() {
    return await new CourseHttpService().post({
      ...this.course,
      user_id: SessionService.get().user_id
    });
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
            <ion-input name='name' onInput={(event) => this.update(event) } style={{fontWeight:'bolder', fontSize:'1.2rem'}} placeholder={'Business Administration'} />
          </ion-row><ion-row>
          <ion-label>Course Number</ion-label>
        </ion-row>
          <ion-row>
            <ion-input name='number' onInput={(event) => this.update(event) } style={{fontWeight:'bolder', fontSize:'1.2rem'}} placeholder={'e.g. MGMT 100'} />
          </ion-row>
          <ion-row>
            <ion-label>Section Number</ion-label>
          </ion-row>
          <ion-row>
            <ion-input name='section' onInput={(event) => this.update(event) } style={{fontWeight:'bolder', fontSize:'1.2rem'}} placeholder={'e.g. 001'} />
          </ion-row>
          <ion-row>
            <ion-label>Term</ion-label>
          </ion-row>
          <ion-row>
            <ion-input name='term' onInput={(event) => this.update(event) } style={{fontWeight:'bolder', fontSize:'1.2rem'}} placeholder={'Fall 2019'} />
          </ion-row>
          <ion-row>
            <ion-label>Instructor</ion-label>
          </ion-row>
          <ion-row>
            <ion-input name='instructor' onInput={(event) => this.update(event) } style={{fontWeight:'bolder', fontSize:'1.2rem'}} placeholder={'Dr. Ben Jeezy'} />
          </ion-row>
          <ion-row>
            <ion-label>Color</ion-label>
          </ion-row>
          <ion-row>
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


