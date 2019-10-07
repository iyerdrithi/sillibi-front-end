import {Component, h, State} from '@stencil/core';
import {AppRoot} from "../app-root/app-root";
import {UserHttpService} from "../../http_services/user.service";
import {SessionService} from "../../services/session.service";
import {getBase64FromFile} from "../../helpers/utils";

@Component({
  tag: 'app-edit-profile',
  styleUrl: 'app-edit-profile.css'
})
export class AppEditProfile {
  user: { first_name: string, last_name: string, email: string, call: boolean, text: boolean, avatar: string };
  @State() avatarBase64: string;
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
    this.avatarBase64 = this.user.avatar;
  }

  async postProfile() {
    this.email.value = this.email.value || this.user.email;
    this.first.value = this.first.value || this.user.first_name;
    this.last.value = this.last.value || this.user.last_name;
    const edit = await new UserHttpService().put({
      'id': SessionService.get().user_id,
      'email': this.email.value,
      'first_name': this.first.value,
      'last_name': this.last.value,
      'call': this.call,
      'text': this.text,
      'avatar': this.avatarBase64
    });
    console.log(edit);
    await AppRoot.route('profile/');
  }

  onAvatarClicked() {
    const input = document.querySelector('#input-avatar') as HTMLInputElement;
    input.click();
  }

  async onAvatarFileChanged(event) {
    if (!event.target || event.target.files.length === 0) return;

    const image = event.target.files[0] as File;

    if (!image.type.toLowerCase().startsWith('image')) {
      await AppRoot.showMessage(`Avatar must be an image`, 'danger');
      return;
    }

    const kb_size = image.size / 1000;
    const max_kb_size = 500;

    if (kb_size > max_kb_size) {
      await AppRoot.showMessage(`Avatar size must not exceed ${max_kb_size}kb`, 'danger');
      return;
    }

    const encoded = await getBase64FromFile(image);
    this.avatarBase64 = encoded.toString();
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
          <ion-item class="ion-padding-vertical" lines={"none"} style={{display: 'table', margin: 'auto'}}>
            <ion-avatar style={{borderColor: "dark-purple"}}>
              <input id="input-avatar" type="file" accept="image/*" hidden
                     onChange={(evt) => this.onAvatarFileChanged(evt)}/>
              <img id="img-avatar" src={
                this.avatarBase64 || "../../assets/icon/contact-avatar.png"
              } onClick={() => this.onAvatarClicked()}/>
            </ion-avatar>
          </ion-item>
          <ion-grid>
            <ion-row align-items-center={true} justify-content-around={true}>
              <ion-item lines="inset" color={"clear"} style={{width: "84vw", marginRight: "5vw"}}>
                <ion-label position={"floating"} color={"medium"}>First Name</ion-label>
                <ion-input placeholder={this.user.first_name}
                           ref={(field) => this.first = field as HTMLIonInputElement}/>
              </ion-item>
            </ion-row>
            <ion-row align-items-center={true} justify-content-around={true}>
              <ion-item lines="inset" color={"clear"} style={{width: "84vw", marginRight: "5vw"}}>
                <ion-label position={"floating"} color={"medium"}>Last Name</ion-label>
                <ion-input placeholder={this.user.last_name} ref={(field) => this.last = field as HTMLIonInputElement}/>
              </ion-item>
            </ion-row>
            <ion-row align-items-center={true} justify-content-around={true}>
              <ion-item lines="inset" color={"clear"} style={{width: "84vw", marginRight: "5vw"}}>
                <ion-label position={"floating"} color={"medium"}>Email Address</ion-label>
                <ion-input placeholder={this.user.email} ref={(field) => this.email = field as HTMLIonInputElement}/>
              </ion-item>
            </ion-row>
            <ion-row>
              <ion-item lines={"full"} color={"clear"} style={{width: "100vw"}}>
                <ion-label position={"floating"} color={"medium"}>COMMUNICATION SETTINGS</ion-label>
              </ion-item>
            </ion-row>
            <ion-item lines="full">
              <ion-label>Call</ion-label>
              <ion-toggle slot={"end"} name={"call"} color={"success"} checked={this.user.call}
                          onIonChange={ev => (this.call = ev.detail.checked)}/>
            </ion-item>
            <ion-item lines="full">
              <ion-label>Text</ion-label>
              <ion-toggle slot={"end"} name={"text"} color={"success"} checked={this.user.text}
                          onIonChange={ev => (this.text = ev.detail.checked)}/>
            </ion-item>
            <ion-row>
              <ion-button onClick={() => this.postProfile()} color={"warning"} expand={"full"} style={{
                width: "80vw",
                marginLeft: "5vw",
                marginRight: "5vw",
                marginTop: "2vh",
                marginBottom: "2vh"
              }}>
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
