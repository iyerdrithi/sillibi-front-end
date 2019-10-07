import {Component, h} from '@stencil/core';
import {UserHttpService} from "../../http_services/user.service";
import {SessionService} from "../../services/session.service";
import {CrudHttpService} from "../../http_services/crud.service";
import {AppRoot} from "../app-root/app-root";

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css'
})
export class AppProfile {
  first_name:string;
  last_name:string;
  email:string;
  id:number;
  call:boolean;
  text:boolean;
  avatar:string;

  async componentWillLoad() {
    const user = await new UserHttpService().query({});
    console.log(user);
    this.first_name = user.first_name ? user.first_name : "Please update first name";
    this.last_name = user.last_name ? user.last_name : "Please update last name";
    this.email = user.email ? user.email : "Please update email";
    this.id = user.id ? user.id : "N/A";
    this.call = user.call;
    this.text = user.text;
    this.avatar = user.avatar;
  }

  toggleIcon(value, name) {
    return value ? [
      <ion-icon color={"dark-purple"} name={name} size={"large"}
                class="ion-padding"/>
    ] : null;
  }

  async logout() {
    await fetch(  `${CrudHttpService.BASE_URL}/oauth/revoke`, {
      method: 'POST',
      headers: new CrudHttpService('').headers(),
      body: JSON.stringify({token: SessionService.get().token})
    });
    SessionService.clear();
    await AppRoot.route('/');
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="end">
            <ion-button href={`#/edit_profile`}>
              <ion-label color={"primary"}>Edit</ion-label>
            </ion-button>
            <ion-button onClick={() => this.logout()}>
              <ion-label color={"primary"}>Logout</ion-label>
            </ion-button>
          </ion-buttons>
          <ion-title>My Profile</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <ion-card>
          <ion-item class="ion-padding-vertical" lines={"none"} style={{display: 'table', margin: 'auto'}}>
            <ion-avatar style={{borderColor:"dark-purple"}}>
              <img src={
                this.avatar || "../../assets/icon/contact-avatar.png"
              }/>
            </ion-avatar>
          </ion-item>
          <ion-grid>
            <ion-row align-items-center={true} justify-content-around={true}>
              <ion-item lines="none" color={"clear"} style={{width:"84vw", marginRight:"5vw"}}>
                <ion-label position={"floating"} color={"medium"}>First Name</ion-label><ion-input readonly value={this.first_name}/>
              </ion-item>
            </ion-row>
            <ion-row align-items-center={true} justify-content-around={true}>
              <ion-item lines="none" color={"clear"} style={{width:"84vw", marginRight:"5vw"}}>
                <ion-label position={"floating"} color={"medium"}>Last Name</ion-label><ion-input readonly value={this.last_name}/>
              </ion-item>
            </ion-row>
            <ion-row align-items-center={true} justify-content-around={true}>
              <ion-item lines="none" color={"clear"} style={{width:"84vw", marginRight:"5vw"}}>
                <ion-label position={"floating"} color={"medium"}>Email Address</ion-label><ion-input readonly value={this.email}/>
              </ion-item>
            </ion-row>
            <ion-row>
              <ion-item class="ion-padding-top"
                        lines={(!this.call && !this.text) ? "none" : "full"}
                        color={"clear"} style={{width:"100vw"}}>
                <ion-label color={"medium"}>COMMUNICATION SETTINGS</ion-label>
              </ion-item>
            </ion-row>
            <ion-row>
                {this.toggleIcon(this.call, "call")} {this.toggleIcon(this.text, "text")}
            </ion-row>
          </ion-grid>
        </ion-card>
      </ion-content>,
      <app-footer/>
    ];
  }
}
