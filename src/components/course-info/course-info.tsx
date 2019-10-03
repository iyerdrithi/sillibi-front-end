import {Component, h, State} from '@stencil/core';
import {AppRoot} from '../app-root/app-root';
import {RouteService} from "../../services/route.service";
import {CourseHttpService} from "../../http_services/course.service";

@Component({
  tag: 'course-info',
  styleUrl: 'course-info.css'
})
export class CourseInfo {
  @State() course: any;
  @State() editing = false;

  params: any;
  colorPicker: HTMLColorPickerElement;
  name: HTMLIonInputElement;
  number: HTMLIonInputElement;
  section: HTMLIonInputElement;
  term: HTMLIonInputElement;
  instructor: HTMLIonInputElement;

  async componentWillLoad() {
    this.params = RouteService.params();
    const data = await new CourseHttpService().find(this.params.course_id);
    console.log('data:', data);
    this.course = data;
  }

  getCourseInputs() {
    const values = {
      'id': this.params.course_id,
      'name': this.name.value,
      'number': this.number.value,
      'section': this.section.value,
      'term': this.term.value,
      'instructor': this.instructor.value
    };
    Object.keys(values).forEach((key) => {
      if (values[key] === null || values[key] === undefined) {
        delete values[key];
      }
    });
    return values;
  }

  onEditCancelClicked() {
    this.editing = !this.editing;
  }

  async onSaveChangesClicked() {
    this.course = await new CourseHttpService().put(this.getCourseInputs());
    this.editing = false;
  }

  async onDeleteCourseClicked() {
    await new CourseHttpService().delete({id: this.course.id});
    await AppRoot.route('mycourses');
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-title>{this.editing ? 'Editing Course' : 'Course Info'}</ion-title>
          <ion-buttons slot="start">
            <app-back-button defaultHref="mycourses"/>
          </ion-buttons>
          <ion-buttons slot="primary">
            <ion-button onClick={() => this.onEditCancelClicked()}>
              {this.editing ? 'Cancel' : 'Edit'}
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <ion-card>
          <ion-row style={{paddingTop: '5px'}} align-items-center justify-content-around>
            <ion-icon style={{fontSize: '4rem'}} name="contact" color={'indigo'}></ion-icon>
          </ion-row>
          <ion-card-content>
            <ion-list lines="none">
              <ion-item lines={this.editing ? "inset" : "none"}>
                <ion-label position="stacked">Course Name</ion-label>
                <ion-input ref={(el) => this.name = el as HTMLIonInputElement}
                           style={{fontSize: '1.2rem'}}
                           placeholder={this.editing ? this.course.name : null}
                           value={this.editing ? null : this.course.name}
                           readonly={!this.editing}/>
              </ion-item>
              <ion-item lines={this.editing ? "inset" : "none"}>
                <ion-label position="stacked">Course Number</ion-label>
                <ion-input ref={(el) => this.number = el as HTMLIonInputElement}
                           style={{fontSize: '1.2rem'}}
                           placeholder={this.editing ? this.course.number : null}
                           value={this.editing ? null : this.course.number}
                           readonly={!this.editing}/>
              </ion-item>
              <ion-item lines={this.editing ? "inset" : "none"}>
                <ion-label position="stacked">Section Number</ion-label>
                <ion-input ref={(el) => this.section = el as HTMLIonInputElement}
                           style={{fontSize: '1.2rem'}}
                           placeholder={this.editing ? this.course.section : null}
                           value={this.editing ? null : this.course.section}
                           readonly={!this.editing}/>
              </ion-item>
              <ion-item lines={this.editing ? "inset" : "none"}>
                <ion-label position="stacked">Term</ion-label>
                <ion-input ref={(el) => this.term = el as HTMLIonInputElement}
                           style={{fontSize: '1.2rem'}}
                           placeholder={this.editing ? this.course.term : null}
                           value={this.editing ? null : this.course.term}
                           readonly={!this.editing}/>
              </ion-item>
              <ion-item lines={this.editing ? "inset" : "none"}>
                <ion-label position="stacked">Instructor</ion-label>
                <ion-input ref={(el) => this.instructor = el as HTMLIonInputElement}
                           style={{fontSize: '1.2rem'}}
                           placeholder={this.editing ? this.course.instructor : null}
                           value={this.editing ? null : this.course.instructor}
                           readonly={!this.editing}/>
              </ion-item>
              {!this.editing ? [
                <ion-item-divider/>,
                <ion-item lines={'full'} button href={
                            this.course.syllabuses_count > 0
                              ? `/syllabusview/?course_id=${this.course.id}`
                              : null
                          }>
                  <ion-icon slot={'start'} name={'document'} style={{color: 'skyblue'}}/>
                  <ion-label>Syllabus uploads</ion-label>
                  <ion-note slot={'end'}>{this.course.syllabuses_count}</ion-note>
                </ion-item>,
                <ion-item lines={'full'}>
                  <ion-icon slot={'start'} name={'paper'} style={{color: 'skyblue'}}/>
                  <ion-label>Assignments</ion-label>
                  <ion-note slot={'end'}>0</ion-note>
                </ion-item>
              ] : null}
            </ion-list>
            {this.editing ? [
              <section>
                <ion-button onClick={() => this.onSaveChangesClicked()} expand='full' color={'warning'}>
                  Save Changes
                </ion-button>
              </section>,
              <section>
                <ion-button onClick={() => this.onDeleteCourseClicked()} expand='full' color={'medium'}>
                  Delete Course
                </ion-button>
              </section>
            ] : null}
          </ion-card-content>
        </ion-card>
      </ion-content>,
      <app-footer/>
    ];
  }
}
