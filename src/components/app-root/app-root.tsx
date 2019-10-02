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
          <ion-route url="/assignments" component="app-assignments" />
          <ion-route url="/addassignments" component="app-addassignments" />
          <ion-route url="/courseinfo" component="course-info" />
          <ion-route url="/registration" component="app-registration" />
          <ion-route url="/profile" component="app-profile" />
          <ion-route url="/edit_profile" component="app-edit-profile" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
