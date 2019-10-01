import { Component, h} from '@stencil/core';
import _ from 'underscore';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {
  address = 'http://localhost:3000/users';
  email: HTMLIonInputElement;
  password: HTMLIonInputElement;
  users: [];

  async login() {
    const response = await fetch(this.address);
    const objects = await response.json();
    this.users = objects.data;
    debugger;
    if (_.pluck(this.users, "email").includes(this.email)) {

    }

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
