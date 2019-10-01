import {Component, h} from '@stencil/core';

@Component({
  tag: 'app-edit-profile',
  styleUrl: 'app-edit-profile.css'
})
export class AppEditProfile {
  user: { first_name:string, last_name:string, email:string, call: boolean, text: boolean};

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
                <ion-label position={"floating"} color={"medium"}>First Name</ion-label><ion-input placeholder={this.user.first_name}/>
              </ion-item>
            </ion-row>
            <ion-row align-items-center={true} justify-content-around={true}>
              <ion-item color={"clear"} style={{width:"84vw", marginRight:"5vw"}}>
                <ion-label position={"floating"} color={"medium"}>Last Name</ion-label><ion-input placeholder={this.user.last_name}/>
              </ion-item>
            </ion-row>
            <ion-row align-items-center={true} justify-content-around={true}>
              <ion-item color={"clear"} style={{width:"84vw", marginRight:"5vw"}}>
                <ion-label position={"floating"} color={"medium"}>Email Address</ion-label><ion-input placeholder={this.user.email}/>
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
                <ion-toggle slot={"end"} name={"call"} color={"success"} checked></ion-toggle>
              </ion-item>
            </ion-row>
            <ion-row>
              <ion-item style={{width:"100vw", marginLeft:"-4vw"}}>
                <ion-label>Text</ion-label>
                <ion-toggle slot={"end"} name={"call"} color={"success"} checked></ion-toggle>
              </ion-item>
            </ion-row>
            <ion-row>
              <ion-button href={"/profile"} color={"warning"} expand={"full"} style={{width:"80vw", marginLeft:"5vw", marginRight:"5vw", marginTop:"2vh", marginBottom:"2vh"}}>
                <ion-text color={"dark"}>Save Changes</ion-text>
              </ion-button>
            </ion-row>
          </ion-grid>
        </ion-card>
      </ion-content>,

      <ion-footer>
        <ion-toolbar color={"dark-purple"} justify-content-around>
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-button icon-only item-end fill={"clear"}><ion-icon color={"warning"} name="contact" size={"large"}/></ion-button>
              </ion-col>
              <ion-col>
                <ion-button icon-only item-end fill={"clear"}><ion-icon color={"medium"} name="copy" size={"large"}/></ion-button>
              </ion-col>
              <ion-col>
                <ion-button icon-only item-end fill={"clear"}><ion-icon color={"medium"} name="paper" size={"large"}/></ion-button>
              </ion-col>
              <ion-col>
                <ion-button icon-only item-end fill={"clear"}><ion-icon color={"medium"} name="more" size={"large"}/></ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-toolbar>
      </ion-footer>
    ];
  }
}
