import { Component, h } from '@stencil/core';
import {SyllabusHttpService} from "../../http_services/syllabus.service";
import {RouteService} from "../../services/route.service";
import {AppRoot} from "../app-root/app-root";

@Component({
  tag: 'syllabus-upload',
  styleUrl: 'syllabus-upload.css'
})
export class SyllabusUpload {
  params: any;
  componentWillLoad() {
    this.params = RouteService.params()
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  async Main() {
    const element = document.querySelector('#file-upload') as HTMLInputElement;
    const file = element.files[0];
    console.log(await this.toBase64(file));
    const encoded = await this.toBase64(file);
    this.sendBase64(encoded)
  }

  async sendBase64(encoded) {
    const response = await new SyllabusHttpService().post({base64: encoded}, {course_id: this.params.course_id});
    AppRoot.getRouter().push(`syllabusview/?id=${response.id}`, 'root')

  }

  upload() {
    const button = document.querySelector("#file-upload") as HTMLButtonElement;
    button.click();
  }


  render() {
    return [

      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="secondary">
            <ion-button href={'/mycourses'}>Back</ion-button>
          </ion-buttons>
          <ion-title>Syllabus Upload</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-row>
        <ion-col>
          <img id='addAssignment' src='../assets/icon/robot.svg' style={{textAlign: 'center', maxWidth:'80%', display:'block', margin:'auto'}}/>
        </ion-col>
      </ion-row>,
      <ion-row>
        <ion-col style={{textAlign:'center'}}>
          <ion-text style={{fontSize:'1.2rem', fontWeight:'bold'}}>
            Use your camera to capture your syllabus and one of our robot elves will input your assignments for you.
          </ion-text>
        </ion-col>
      </ion-row>,
      <ion-row style={{marginBottom:'3rem'}}>
        <ion-col style={{textAlign:'center'}}>
          <ion-button fill={"clear"} onClick={() => this.upload() }>Upload Syllabus</ion-button>
          <input onChange={() => this.Main()} id="file-upload" type="file"/>
        </ion-col>
      </ion-row>
    ];
  }
}
