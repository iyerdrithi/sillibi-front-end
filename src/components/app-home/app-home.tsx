import { Component, h} from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  render() {
    return [

      <ion-content class="login-content" color={"dark-purple"}>
        <ion-grid style={{marginTop:"30vh"}}>
          <ion-row align-items-center={true} justify-content-around={true}>
            <ion-item color={"clear"} style={{width:"84vw", marginRight:"5vw"}}>
              <ion-input placeholder={"Email Address"}></ion-input>
            </ion-item>
          </ion-row>
          <ion-row align-items-center={true} justify-content-around={true}>
            <ion-item color={"clear"} style={{width:"84vw", marginRight:"5vw"}}>
              <ion-input placeholder={"Password"}></ion-input>
            </ion-item>
          </ion-row>
          <ion-row align-items-center={true} justify-content-around={true} class={"login-button"} style={{marginTop:"6vh"}}>
            <ion-button href="/profile" size="default" color="warning" style={{width:"80vw"}} expand={"full"}><ion-text color="dark">LOGIN</ion-text></ion-button>
          </ion-row>
          <ion-row align-items-center justify-content-around>
            <ion-button href="/register" size="default" style={{width:"80vw"}} expand={"full"}>LOGIN USING FACEBOOK</ion-button>
          </ion-row>
          <ion-row align-items-center justify-content-around style={{marginTop:"6vh"}}>
            <p>Don't have an account?</p>
          </ion-row>
          <ion-row align-items-center justify-content-around style={{marginTop:"-2vh"}}>
            <ion-button href="/register" fill="clear" size="small">REGISTER</ion-button>
          </ion-row>
        </ion-grid>
      </ion-content>
    ];
  }
}
