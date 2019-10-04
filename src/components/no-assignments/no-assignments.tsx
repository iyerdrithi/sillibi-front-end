import {Component, h} from '@stencil/core';
import {RouteService} from "../../services/route.service";

@Component({
  tag: 'no-assignments',
  styleUrl: 'no-assignments.css'
})
export class noAssignments {
  params: any;

  componentWillLoad() {
    this.params = RouteService.params()
  }

  render() {
    return [
      <ion-content>
        <ion-row>
          <ion-col>
            <img src={"../assets/icon/robot.svg"} style={{marginTop:'20px', marginLeft: '25px', width: '90%'}}/>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col style={{textAlign:'center', marginTop:'1rem'}}>
            <ion-text style={{fontSize:'0.9rem', fontWeight:'bold', marginTop:'2rem'}}>
              Our robots are working hard uploading other assignments. Would you like to manually upload them?
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col text-center>
            <ion-button href={`/addassignments/?course_id=${this.params.course_id}`} fill={"clear"}> INPUT MANUAL ASSIGNMENTS </ion-button>
          </ion-col>
        </ion-row>
      </ion-content>
    ];
  }
}
