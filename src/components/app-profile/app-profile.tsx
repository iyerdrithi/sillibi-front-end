import { Component, h } from '@stencil/core';

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

  async componentWillLoad() {
    const token = JSON.parse(localStorage.getItem('token'))['access_token'];
    const response = await fetch('http://localhost:3000/users', {
      headers: {Authorization: `Bearer ${token}`}
    });
    const objects = await response.json();
    console.log(objects);
    this.first_name = objects[0].first_name ? objects[0].first_name : "Please update first name";
    this.last_name = objects[0].last_name ? objects[0].last_name : "Please update last name";
    this.email = objects[0].email ? objects[0].email : "Please update email";
    this.id = objects[0].id ? objects[0].id : "N/A";
    this.call = objects[0].call;
    this.text = objects[0].text;
  }

  toggleIcon(value, name) {
    return value ? [<ion-icon color={"medium"} name={name} size={"large"} style={{marginTop:"2vh", marginBottom:"2vh", marginRight:"5vw"}}/>] : [];
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="light">
          <ion-buttons slot="end">
            <ion-button href={`#/edit_profile/?user_id=${this.id}`}>
              <ion-label color={"primary"}>Edit</ion-label>
            </ion-button>
          </ion-buttons>
          <ion-title>My Profile</ion-title>
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
                <ion-label position={"floating"} color={"medium"}>First Name</ion-label><ion-input placeholder={this.first_name}/>
              </ion-item>
            </ion-row>
            <ion-row align-items-center={true} justify-content-around={true}>
              <ion-item color={"clear"} style={{width:"84vw", marginRight:"5vw"}}>
                <ion-label position={"floating"} color={"medium"}>Last Name</ion-label><ion-input placeholder={this.last_name}/>
              </ion-item>
            </ion-row>
            <ion-row align-items-center={true} justify-content-around={true}>
              <ion-item color={"clear"} style={{width:"84vw", marginRight:"5vw"}}>
                <ion-label position={"floating"} color={"medium"}>Email Address</ion-label><ion-input placeholder={this.email}/>
              </ion-item>
            </ion-row>
            <ion-row>
              <ion-item lines={"full"} color={"clear"} style={{width:"100vw"}}>
                <ion-label position={"floating"} color={"medium"}>COMMUNICATION SETTINGS</ion-label>
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
