import {Component, h} from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {
  static getRouter() {
    return document.querySelector('ion-router')
  }

  static async route(path: string) {
    await AppRoot.getRouter().push(path, 'root');
  }

  render() {
    return (
      <ion-app>
        <ion-router useHash={true}>
          <ion-route url="/" component="app-home" />
          <ion-route url="/colorpicker" component="color-picker" />
          <ion-route url="/addcourse" component="add-course" />
          <ion-route url="/mycourses" component="my-courses" />
          <ion-route url="/courseinfo" component="course-info" />
          <ion-route url="/registration" component="app-registration" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
