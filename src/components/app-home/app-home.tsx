import {Component, h} from '@stencil/core';
import {SessionService} from "../../services/session.service";
import {UserHttpService} from "../../http_services/user.service";
import {AppRoot} from "../app-root/app-root";

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {
  email: HTMLIonInputElement;
  password: HTMLIonInputElement;
  users: [];

  static async login(email, password, user?) {
    let validated = true;
    document.querySelectorAll('ion-input').forEach((element) => {
      if(!element.value || element.value.trim().length === 0) {
        validated = false;
      }
    });

    if(!validated) {
      await AppRoot.showMessage('Please fill out all fields', 'danger');
      return;
    }

    try {
      let form_data = new FormData();
      form_data.append("email", email);
      form_data.append("password", password);
      form_data.append("grant_type", "password");
      const response = await fetch('http://localhost:3000/oauth/token', {
        method: 'POST',
        body: form_data
      });
      const token = await response.json();
      if (token.error) {
        await AppRoot.showMessage('Invalid username or password', 'danger');
        return;
      }
      SessionService.set({token: token.access_token});
      user = user || await new UserHttpService().query({});
      SessionService.set({token: token.access_token, user_id: user.id});
      await AppRoot.route('profile/');
    } catch (err) {
      await AppRoot.showMessage('Error: please try again', 'danger');
    }
  }

  async onKeyDown(event) {
    if(event.key === 'Enter')
      await AppHome.login(this.email.value, this.password.value);
  }

  render() {
    return [
      <ion-content color={"dark-purple"}>
        <ion-grid style={{marginTop: "15vh"}}>
          <ion-row align-items-center justify-content-around style={{marginBottom: '5vh'}}>
            <img class="ion-padding" style={{display: 'block', margin: 'auto'}}
                 src="/assets/icon/Sillibi-Logo.svg" alt="Sillibi Logo"/>
          </ion-row>
          <ion-row align-items-center={true} justify-content-around={true}>
            <ion-item color={"clear"} style={{width: "84vw", marginRight: "5vw"}}>
              <ion-input placeholder={"Email Address"} ref={(field) => this.email = field as HTMLIonInputElement}/>

            </ion-item>
          </ion-row>
          <ion-row align-items-center={true} justify-content-around={true}>
            <ion-item color={"clear"} style={{width: "84vw", marginRight: "5vw"}}>
              <ion-input type="password" placeholder={"Password"}
                         ref={(field) => this.password = field as HTMLIonInputElement}
                         onKeyDown={(evt) => this.onKeyDown(evt)}/>
            </ion-item>
          </ion-row>
          <ion-row align-items-center={true} justify-content-around={true} style={{marginTop: "6vh"}}>
            <ion-button onClick={() => AppHome.login(this.email.value, this.password.value)}
                        size="default" color="warning" style={{width: "80vw"}} expand={"full"}>
              <ion-text color="dark">LOGIN</ion-text>
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
