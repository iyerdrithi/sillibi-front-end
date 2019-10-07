import { Component, h, State } from '@stencil/core';
import {SyllabusHttpService} from "../../http_services/syllabus.service";
import {RouteService} from "../../services/route.service";
import {AppRoot} from "../app-root/app-root";

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

  async componentDidRender() {
    if(this.syllabuses.length === 0) {
      await AppRoot.route(this.params.course_id
        ? `/courseinfo/?course_id=${this.params.course_id}`
        : `/mycourses`
      );
    }
  }

  async deleteSyllabus(id) {
    await new SyllabusHttpService().delete({id});
    this.syllabuses = [...this.syllabuses]
      .filter((syllabus) => syllabus.id !== id);
  }

  renderSyllabuses() {
    return this.syllabuses.map((syllabus) => {
      return (
        <ion-card class='ion-padding' style={{height: '100%'}}>
          <ion-button fill="clear" color="danger" onClick={() => this.deleteSyllabus(syllabus.id)}>
            Delete Syllabus
          </ion-button>
          <iframe style={{width: '100%', height: '100%'}} src={syllabus.base64}>
            {/*<ion-button onClick={() => window.location.href = syllabus.base64} fill="clear">*/}
            {/*  View PDF*/}
            {/*</ion-button>*/}
          </iframe>
        </ion-card>
      )
    })
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar style={{marginBottom:'2rem'}}>
          <ion-buttons slot={'start'}>
            <app-back-button forceHref={'mycourses'}/>
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
