import {Component, h} from '@stencil/core';
import {AppRoot} from "../app-root/app-root";
import {UserHttpService} from "../../http_services/user.service";
import {SessionService} from "../../services/session.service";

@Component({
  tag: 'app-edit-profile',
  styleUrl: 'app-edit-profile.css'
})
export class AppEditProfile {
  user: { first_name:string, last_name:string, email:string, call: boolean, text: boolean};
  first: HTMLIonInputElement;
  last: HTMLIonInputElement;
  email: HTMLIonInputElement;
  call = true;
  text = true;
  async componentWillLoad() {
    this.user = await new UserHttpService().find(SessionService.get().user_id);
    this.user.first_name = this.user.first_name || "";
    this.user.last_name = this.user.last_name || "";
    this.user.email = this.user.email || "";
    this.call = this.user.call;
    this.text = this.user.text;
  }
  async postProfile() {
    const edit = await new UserHttpService().put({
      'id':SessionService.get().user_id,
      'email':this.email.value,
      'first_name':this.first.value,
      'last_name':this.last.value,
      'call':this.call,
      'text':this.text
    });
    console.log(edit);
    await AppRoot.route('profile/');
  }
  render() {
    return [
      <ion-header>
        <ion-toolbar color="light">
          <ion-title>Edit Profile</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <ion-card>
          <ion-item lines={"none"} style={{marginLeft:"39vw", marginRight:"39vw", marginTop:"2vh", height:"8vh"}}>
            <ion-avatar style={{borderRadius:"10vw", borderColor:"dark-purple"}}>
              <img src="../../assets/icon/contact-avatar.png"/>
            </ion-avatar>
          </ion-item>
          <ion-grid>
            <ion-row align-items-center={true} justify-content-around={true}>
              <ion-item color={"clear"} style={{width:"84vw", marginRight:"5vw"}}>
                <ion-label position={"floating"} color={"medium"}>First Name</ion-label>
                <ion-input placeholder={this.user.first_name} ref={ (field) => this.first = field as HTMLIonInputElement}/>
              </ion-item>
            </ion-row>
            <ion-row align-items-center={true} justify-content-around={true}>
              <ion-item color={"clear"} style={{width:"84vw", marginRight:"5vw"}}>
                <ion-label position={"floating"} color={"medium"}>Last Name</ion-label>
                <ion-input placeholder={this.user.last_name} ref={ (field) => this.last = field as HTMLIonInputElement}/>
              </ion-item>
            </ion-row>
            <ion-row align-items-center={true} justify-content-around={true}>
              <ion-item color={"clear"} style={{width:"84vw", marginRight:"5vw"}}>
                <ion-label position={"floating"} color={"medium"}>Email Address</ion-label>
                <ion-input placeholder={this.user.email} ref={ (field) => this.email = field as HTMLIonInputElement}/>
              </ion-item>
            </ion-row>
            <ion-row>
              <ion-item lines={"full"} color={"clear"} style={{width:"100vw"}}>
                <ion-label position={"floating"} color={"medium"}>COMMUNICATION SETTINGS</ion-label>
              </ion-item>
            </ion-row>
            <ion-row>
              <ion-item style={{width:"100vw", marginLeft:"-4vw"}}>
                <ion-label>Call</ion-label>
                <ion-toggle slot={"end"} name={"call"} color={"success"} checked={this.user.call} onIonChange={ev => (this.call = ev.detail.checked)}/>
              </ion-item>
            </ion-row>
            <ion-row>
              <ion-item style={{width:"100vw", marginLeft:"-4vw"}}>
                <ion-label>Text</ion-label>
                <ion-toggle slot={"end"} name={"text"} color={"success"} checked={this.user.text} onIonChange={ev => (this.text = ev.detail.checked)}/>
              </ion-item>
            </ion-row>
            <ion-row>
              <ion-button onClick={ () => this.postProfile() } color={"warning"} expand={"full"} style={{width:"80vw", marginLeft:"5vw", marginRight:"5vw", marginTop:"2vh", marginBottom:"2vh"}}>
                <ion-text color={"dark"}>Save Changes</ion-text>
              </ion-button>
            </ion-row>
          </ion-grid>
        </ion-card>
      </ion-content>,
      <app-footer/>
    ];
  }
}
