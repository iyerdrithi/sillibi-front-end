import {Component, h, Prop} from '@stencil/core';
import {CrudService} from "../../services/crud.service";

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {
  @Prop() CrudService;
  constructor() {
    this.CrudService = new CrudService()
  }

  static getCrudService() {
    return document.querySelector('app-root').CrudService
  }
  static getRouter() {
    return document.querySelector('ion-router')
  }

  render() {
    return (
      <ion-app>
        <ion-router useHash={true}>
          <ion-route url="/" component="app-home" />
          <ion-route url="/colorpicker" component="color-picker" />
          <ion-route url="/addcourse" component="add-course" />
          <ion-route url="/mycourses" component="my-courses" />
          <ion-route url="/registration" component="app-registration" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
