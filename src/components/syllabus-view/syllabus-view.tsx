import { Component, h, State } from '@stencil/core';
import {SyllabusHttpService} from "../../http_services/syllabus.service";
import {RouteService} from "../../services/route.service";

@Component({
  tag: 'syllabus-view',
  styleUrl: 'syllabus-view.css'
})
export class SyllabusView {
  @State() syllabuses: any[];
  params: any;

  async componentWillLoad() {
    this.params = RouteService.params();

    if(this.params.id) {
      const syllabus = await new SyllabusHttpService().find_by({id: this.params.id});
      this.syllabuses = [syllabus];
    } else if(this.params.course_id) {
      this.syllabuses = await new SyllabusHttpService().query({
        course_id: this.params.course_id
      });
    }
  }

  renderSyllabuses() {
    return this.syllabuses.map((syllabus) => {
      return (
        <ion-card class='ion-padding' style={{height: '100%'}}>
          <iframe style={{width: '100%', height: '100%'}} src={syllabus.base64}/>
        </ion-card>
      )
    })
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar style={{marginBottom:'2rem'}}>
          <ion-buttons slot={'start'}>
            <ion-back-button defaultHref={'mycourses'}/>
          </ion-buttons>
          <ion-title>Syllabus</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content fullscreen>
        {this.renderSyllabuses()}
      </ion-content>
    ];
  }
}
