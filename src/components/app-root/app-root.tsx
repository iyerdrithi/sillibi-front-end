import {Component, h, Prop} from '@stencil/core';
import {CrudHttpService} from "../../http_services/crud.service";
import {SessionService} from "../../services/session.service";
import {loadingController, toastController} from "@ionic/core";

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {
  @Prop() history = [];

  static getHistory() {
    return document.querySelector('app-root').history;
  }

  static getRouter() {
    return document.querySelector('ion-router')
  }

  static async route(path: string) {
    await AppRoot.getRouter().push(path, 'root');
  }

  static async showMessage(message, color, duration = 2000) {
    const toast = await toastController.create({
      message,
      color,
      duration
    });
    await toast.present();
  }

  static async showLoading(message): Promise<HTMLIonLoadingElement> {
    const loading = await loadingController.create({
      message
    });
    await loading.present();
    return loading;
  }

  private static async onIonRouteWillChange(event) {
    AppRoot.getHistory().push(event.detail.from);
    if(['/', '/registration', '/login'].includes(event.detail.to)) {
      if(SessionService.get().token) {
        window.location.href = '#/profile';
      } else return;
    }
    let success = true;
    try {
      const response = await fetch(`${CrudHttpService.BASE_URL}/oauth/token/info`, {
        headers: new CrudHttpService('').headers()
      });
      const object = await response.json();
      if(object.error) {
        success = false;
      }
    } catch(err) {
      success = false;
    }
    if(!success) {
      SessionService.clear();
      window.location.href = '';
    }
  }

  render() {
    return (
      <ion-app>
        <ion-router useHash={true} onIonRouteWillChange={(evt) => AppRoot.onIonRouteWillChange(evt)}>
          <ion-route url="/" component="app-home" />
          <ion-route url="/colorpicker" component="color-picker" />
          <ion-route url="/addcourse" component="add-course" />
          <ion-route url="/mycourses" component="my-courses" />
          <ion-route url="/addassignments" component="add-assignments" />
          <ion-route url="/courseinfo" component="course-info" />
          <ion-route url="/registration" component="app-registration" />
          <ion-route url="/profile" component="app-profile" />
          <ion-route url="/edit_profile" component="app-edit-profile" />
          <ion-route url="/syllabusupload" component="syllabus-upload" />
          <ion-route url="/syllabusview" component="syllabus-view" />
          <ion-route url="/myassignmentsinfo" component="my-assignments-info" />
          <ion-route url="/myassignmentscard" component="my-assignments-card" />
          <ion-route url="/myassignments" component="my-assignments" />
          <ion-route url="/allassignments" component="all-assignments" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
