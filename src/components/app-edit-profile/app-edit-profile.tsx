import {Component, h, State} from '@stencil/core';
import {RouteService} from "../../services/route.service";
import {AppRoot} from "../app-root/app-root";

@Component({
  tag: 'app-edit-profile',
  styleUrl: 'app-edit-profile.css'
})
export class AppEditProfile {
  address = `http://localhost:3000/users/${RouteService.params().user_id}`;
  user: { first_name:string, last_name:string, email:string, call: boolean, text: boolean};
  first: HTMLIonInputElement;
  last: HTMLIonInputElement;
  email: HTMLIonInputElement;
  @State() call = true;
  @State() text = true;
  async componentWillLoad() {
    const token = JSON.parse(localStorage.getItem('token'))['access_token'];
    const response = await fetch(`http://localhost:3000/users/${RouteService.params().user_id}`, {
      headers: {Authorization: `Bearer ${token}`}
    });
    this.user = await response.json();
    this.user.first_name = this.user.first_name || "";
    this.user.last_name = this.user.last_name || "";
    this.user.email = this.user.email || "";
    this.user.call = this.user.call || true;
    this.user.text = this.user.text || true;
  }
  async postProfile() {
    this.email.value = this.email.value || this.user.email;
    this.first.value = this.first.value || this.user.first_name;
    this.last.value = this.last.value || this.user.last_name;
    const token = JSON.parse(localStorage.getItem('token'))['access_token'];
    const response = await fetch(this.address, {
      method: 'PUT',
      headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', Accept: 'application/json'},
      body: JSON.stringify({'email':this.email.value, 'first_name':this.first.value, 'last_name':this.last.value, 'call':this.call, 'text':this.text})
    });
    const edit = await response.json();
    console.log(edit);
    await AppRoot.route('profile/');
  }
  render() {
    return [
      <ion-header>
        <ion-toolbar color="light">
          <ion-buttons slot="end">
            <ion-button href="#/profile/">
              <ion-label color={"primary"}>Cancel</ion-label>
            </ion-button>
          </ion-buttons>
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
                <ion-toggle slot={"end"} name={"call"} color={"success"} checked={this.call} onIonChange={ev => (this.call = ev.detail.checked)}/>
              </ion-item>
            </ion-row>
            <ion-row>
              <ion-item style={{width:"100vw", marginLeft:"-4vw"}}>
                <ion-label>Text</ion-label>
                <ion-toggle slot={"end"} name={"text"} color={"success"} checked={this.text} onIonChange={ev => (this.text = ev.detail.checked)}/>
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
