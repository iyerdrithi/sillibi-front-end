import {Component, h} from '@stencil/core';
import {UserHttpService} from "../../http_services/user.service";
import {AppRoot} from "../app-root/app-root";
import {AppHome} from "../app-home/app-home";

@Component({
  tag: 'app-registration',
  styleUrl: 'app-registration.css'
})
export class AppRegistration {
  first_name: HTMLIonInputElement;
  last_name: HTMLIonInputElement;
  email: HTMLIonInputElement;
  password: HTMLIonInputElement;

  async register() {
    let validated = true;
    [this.first_name, this.last_name, this.email, this.password].forEach((element) => {
      if(!element.value || element.value.trim().length === 0) {
        validated = false;
        debugger;
      }
    });

    if(!validated) {
      await AppRoot.showMessage('Please fill out all fields', 'danger');
      return;
    }

    try {
      const response = await new UserHttpService().post({
        first_name: this.first_name.value,
        last_name: this.last_name.value,
        email: this.email.value,
        password_digest: this.password.value
      });
      if(!response || !response.id) {
        await AppRoot.showMessage(
          `Error: ${response.error || 'please try again'}`, 'danger');
        return;
      }
      await AppHome.login(this.email.value, this.password.value, response);
    } catch(err) {
      await AppRoot.showMessage('Error: please try again', 'danger');
      return;
    }
  }

  async onKeyDown(event) {
    if(event.key === 'Enter')
      await this.register();
  }

  render() {
    return [
      <ion-content color={"dark-purple"}>
        <ion-grid style={{marginTop: "15vh"}}>
          <ion-row align-items-center={true} justify-content-around={true}>
            <ion-item color={"clear"} style={{width: "84vw", marginRight: "5vw"}}>
              <ion-label position={"floating"}>First Name</ion-label>
              <ion-input ref={(el) => this.first_name = el}/>
            </ion-item>
          </ion-row>
          <ion-row align-items-center={true} justify-content-around={true}>
            <ion-item color={"clear"} style={{width: "84vw", marginRight: "5vw"}}>
              <ion-label position={"floating"}>Last Name</ion-label>
              <ion-input ref={(el) => this.last_name = el}/>
            </ion-item>
          </ion-row>
          <ion-row align-items-center={true} justify-content-around={true}>
            <ion-item color={"clear"} style={{width: "84vw", marginRight: "5vw"}}>
              <ion-label position={"floating"}>Email Address</ion-label>
              <ion-input type="email" ref={(el) => this.email = el}/>
            </ion-item>
          </ion-row>
          <ion-row align-items-center={true} justify-content-around={true}>
            <ion-item color={"clear"} style={{width: "84vw", marginRight: "5vw"}}>
              <ion-label position={"floating"}>Password</ion-label>
              <ion-input type="password" ref={(el) => this.password = el}
                         onKeyDown={(evt) => this.onKeyDown(evt)}/>
            </ion-item>
          </ion-row>
          <ion-row align-items-center={true} justify-content-around={true} style={{marginTop: "6vh"}}>
            <ion-button size="default" color="warning" style={{width: "80vw"}} expand={"full"}
                        onClick={() => this.register()}>
              <ion-text color="dark">Register</ion-text>
            </ion-button>
          </ion-row>
          <ion-row align-items-center justify-content-around style={{marginTop: "6vh"}}>
            <p>Already have an account?</p>
          </ion-row>
          <ion-row align-items-center justify-content-around style={{marginTop: "-2vh"}}>
            <ion-button href="" fill="clear" size="small">Login</ion-button>
          </ion-row>
        </ion-grid>
      </ion-content>
    ];
  }
}
