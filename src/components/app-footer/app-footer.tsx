import { Component, h } from '@stencil/core';
import {AppRoot} from "../app-root/app-root";
import {RouteService} from "../../services/route.service";

@Component({
  tag: 'app-footer',
  styleUrl: 'app-footer.css'
})
export class AppFooter {

  getColor(path) {
    return RouteService.path().match(path) ? 'warning' : 'medium';
  }

  render() {
    return (
      <ion-footer>
        <ion-toolbar color={'dark-purple'}>
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-button color={'dark-purple'} fill="clear"
                            onClick={() => AppRoot.route('/profile')}>
                  <ion-icon slot="icon-only" name="contact" size='large'
                            color={this.getColor('profile')} />
                </ion-button>
              </ion-col>
              <ion-col>
                <ion-button color={'dark-purple'} fill="clear"
                            onClick={() => AppRoot.route('/mycourses')}>
                  <ion-icon slot="icon-only" name="document" size='large'
                            color={this.getColor('mycourses')}/>
                </ion-button>
              </ion-col>
              <ion-col>
                <ion-button color={'dark-purple'} fill="clear"
                            onClick={() => AppRoot.route('/allassignments')}>
                  <ion-icon slot="icon-only" name="paper" size='large'
                            color={this.getColor('allassignments')}/>
                </ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-toolbar>
      </ion-footer>
    );
  }
}
