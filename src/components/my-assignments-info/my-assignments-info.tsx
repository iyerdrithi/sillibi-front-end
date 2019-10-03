import {Component, h, State} from '@stencil/core';
import {AppRoot} from '../app-root/app-root';
import {RouteService} from "../../services/route.service";
import { AssignmentHttpService } from '../../http_services/assignment.service';

@Component({
  tag: 'my-assignments-info',
  styleUrl: 'my-assignments-info.css'
})
export class MyAssignmentsInfo {
  @State() assignment: any;
  @State() editing = false;

  params: any;
  colorPicker: HTMLColorPickerElement;
  name: HTMLIonInputElement;
  date: HTMLIonDatetimeElement
  points: HTMLIonInputElement;
  description: HTMLIonTextareaElement;

  async componentWillLoad() {
    this.params = RouteService.params();
    const data = await new AssignmentHttpService().find(this.params.assignment_id);
    console.log('data:', data);
    this.assignment = data;
  }

  getAssignmentInputs() {
    const values = {
      'id': this.params.assignment_id,
      'date': this.date.value,
      'name': this.name.value,
      'points': this.points.value,
      'description': this.description.value

    };
    Object.keys(values).forEach((key) => {
      if (values[key] === null || values[key] === undefined) {
        delete values[key];
      }
    });
    return values;
  }

  onEditCancelClicked() {
    this.editing = !this.editing;
  }

  async onSaveChangesClicked() {
    this.assignment = await new AssignmentHttpService().put(this.getAssignmentInputs());
    this.editing = false;
  }

  async onDeleteAssignmentClicked() {
    await new AssignmentHttpService().delete({id: this.assignment.id});
    AppRoot.getRouter().push(`myassignments/?course_id=${this.assignment.course_id}`, 'root');
  }

  backButton() {
    AppRoot.getRouter().push(`myassignments/?course_id=${this.assignment.course_id}`, 'root');
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-title>{this.editing ? 'Editing Assignment' : 'Assignment Info'}</ion-title>
          <ion-buttons slot="start">
            <ion-button onClick={() => this.backButton()}>Back</ion-button>
          </ion-buttons>
          <ion-buttons slot="primary">
            <ion-button onClick={() => this.onEditCancelClicked()}>
              {this.editing ? 'Cancel' : 'Edit'}
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <ion-card>
          <ion-row style={{paddingTop: '5px'}} align-items-center justify-content-around>
            <ion-icon style={{fontSize: '4rem'}} name="contact" color={'indigo'}></ion-icon>
          </ion-row>
          <ion-card-content>
            <ion-list lines="none">
              <ion-item lines={this.editing ? "inset" : "none"}>
                <ion-label position="stacked">Assignment Name</ion-label>
                <ion-input ref={(el) => this.name = el as HTMLIonInputElement}
                           style={{fontSize: '1.2rem'}}
                           value={this.assignment.name}
                           readonly={!this.editing}/>
              </ion-item>
              <ion-item lines={this.editing ? "inset" : "none"}>
                <ion-label position="stacked">Assignment Date</ion-label>
                <ion-datetime ref={(el) => this.date = el as HTMLIonDatetimeElement}
                           style={{fontSize: '1.2rem'}}
                           value={new Date(this.assignment.date).toISOString()}
                           readonly={!this.editing}/>
              </ion-item>
              <ion-item lines={this.editing ? "inset" : "none"}>
                <ion-label position="stacked">Possible Points</ion-label>
                <ion-input ref={(el) => this.points = el as HTMLIonInputElement}
                           style={{fontSize: '1.2rem'}}

                           value={this.assignment.points}
                           readonly={!this.editing}/>
              </ion-item>
              <ion-item lines={this.editing ? "inset" : "none"}>
                <ion-label position="stacked">Description</ion-label>
                <ion-textarea autoGrow={true} ref={(el) => this.description = el as HTMLIonTextareaElement}
                           style={{fontSize: '1.2rem'}}
                           value={this.assignment.description}
                           readonly={!this.editing}/>
              </ion-item>
            </ion-list>
            {this.editing ? [
              <section>
                <ion-button onClick={() => this.onSaveChangesClicked()} expand='full' color={'warning'}>
                  Save Changes
                </ion-button>
              </section>,
              <section>
                <ion-button onClick={() => this.onDeleteAssignmentClicked()} expand='full' color={'medium'}>
                  Delete Assignment
                </ion-button>
              </section>
            ] : null}
          </ion-card-content>
        </ion-card>
      </ion-content>,
      <app-footer/>
    ];
  }
}
