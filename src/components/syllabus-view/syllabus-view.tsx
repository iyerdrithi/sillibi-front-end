import { Component, h, State } from '@stencil/core';
import {SyllabusHttpService} from "../../http_services/syllabus.service";
import {RouteService} from "../../services/route.service";

@Component({
  tag: 'syllabus-view',
  styleUrl: 'syllabus-view.css'
})
export class SyllabusView {
  @State() syllabus: any;
  params: any;
  async componentWillLoad() {
    this.params = RouteService.params();
    await this.getBase64()
  }


  async getBase64() {
    this.syllabus = await new SyllabusHttpService().find_by({id: this.params.id})
  }


  render() {
    return [
      <ion-content fullscreen>
        <ion-card class='ion-padding' style={{height: '100%'}}>
      <iframe style={{width: '100%', height: '100%'}} src = {this.syllabus.base64}> </iframe>
        </ion-card>
      </ion-content>

    ];
  }
}
