import {Component, h} from '@stencil/core';
@Component({
  tag: 'app-registration',
  styleUrl: 'app-registration.css'
})
export class AppRegistration {

  render() {
    return [
      <ion-content color={"dark-purple"}>
        <ion-grid style={{marginTop: "15vh"}}>
          <ion-row align-items-center={true} justify-content-around={true}>
            <ion-item color={"clear"} style={{width: "84vw", marginRight: "5vw"}}>
              <ion-label position={"floating"}>First Name</ion-label>
              <ion-input/>
            </ion-item>
          </ion-row>
          <ion-row align-items-center={true} justify-content-around={true}>
            <ion-item color={"clear"} style={{width: "84vw", marginRight: "5vw"}}>
              <ion-label position={"floating"}>Last Name</ion-label>
              <ion-input/>
            </ion-item>
          </ion-row>
          <ion-row align-items-center={true} justify-content-around={true}>
            <ion-item color={"clear"} style={{width: "84vw", marginRight: "5vw"}}>
              <ion-label position={"floating"}>Email Address</ion-label>
              <ion-input/>
            </ion-item>
          </ion-row>
          <ion-row align-items-center={true} justify-content-around={true}>
            <ion-item color={"clear"} style={{width: "84vw", marginRight: "5vw"}}>
              <ion-label position={"floating"}>Password</ion-label>
              <ion-input/>
            </ion-item>
          </ion-row>
          <ion-row align-items-center={true} justify-content-around={true} style={{marginTop: "6vh"}}>
            <ion-button size="default" color="warning" style={{width: "80vw"}} expand={"full"}>
              <ion-text color="dark">LOGIN</ion-text>
            </ion-button>
          </ion-row>
          <ion-row align-items-center justify-content-around>
            <ion-button href="#/registration" size="default" style={{width: "80vw"}} expand={"full"}>LOGIN USING
              FACEBOOK
            </ion-button>
          </ion-row>
          <ion-row align-items-center justify-content-around style={{marginTop: "6vh"}}>
            <p>Don't have an account?</p>
          </ion-row>
          <ion-row align-items-center justify-content-around style={{marginTop: "-2vh"}}>
            <ion-button href="#/registration" fill="clear" size="small">REGISTER</ion-button>
          </ion-row>
        </ion-grid>
      </ion-content>
    ];
  }
}
