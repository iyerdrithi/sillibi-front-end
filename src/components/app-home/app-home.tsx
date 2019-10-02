import { Component, h} from '@stencil/core';
// import { UserHttpService } from "../../http_services/user.service";
import {AppRoot} from "../app-root/app-root";

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {
  address = 'http://localhost:3000/oauth/token';
  email: HTMLIonInputElement;
  password: HTMLIonInputElement;
  users: [];

  async login() {
    let form_data = new FormData();
    form_data.append("email", this.email.value);
    form_data.append("password", this.password.value);
    form_data.append("grant_type", "password");
    const response = await fetch(this.address, {
      method: 'POST',
      body: form_data
    });
    const objects = await response.json();
    localStorage.setItem("token", JSON.stringify(objects));
    console.log(objects);
    await AppRoot.route('profile/');
  }



  render() {
    return [
      <ion-content color={"dark-purple"}>
        <ion-grid style={{marginTop:"30vh"}}>
          <ion-row align-items-center={true} justify-content-around={true}>
            <ion-item color={"clear"} style={{width:"84vw", marginRight:"5vw"}}>
              <ion-input placeholder={"Email Address"} ref={ (field) => this.email = field as HTMLIonInputElement }/>

            </ion-item>
          </ion-row>
          <ion-row align-items-center={true} justify-content-around={true}>
            <ion-item color={"clear"} style={{width:"84vw", marginRight:"5vw"}}>
              <ion-input placeholder={"Password"} ref={ (field) => this.password = field as HTMLIonInputElement }/>
            </ion-item>
          </ion-row>
          <ion-row align-items-center={true} justify-content-around={true} style={{marginTop:"6vh"}}>
            <ion-button onClick={ () => this.login() } size="default" color="warning" style={{width:"80vw"}} expand={"full"}><ion-text color="dark">LOGIN</ion-text></ion-button>
          </ion-row>
          <ion-row align-items-center justify-content-around>
            <ion-button href="#/registration" size="default" style={{width:"80vw"}} expand={"full"}>LOGIN USING FACEBOOK</ion-button>
          </ion-row>
          <ion-row align-items-center justify-content-around style={{marginTop:"6vh"}}>
            <p>Don't have an account?</p>
          </ion-row>
          <ion-row align-items-center justify-content-around style={{marginTop:"-2vh"}}>
            <ion-button href="#/registration" fill="clear" size="small">REGISTER</ion-button>
          </ion-row>
        </ion-grid>
      </ion-content>
    ];
  }
}
