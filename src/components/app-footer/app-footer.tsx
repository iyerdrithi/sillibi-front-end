import { Component, h } from '@stencil/core';
import {AppRoot} from "../app-root/app-root";

@Component({
  tag: 'app-footer',
  styleUrl: 'app-footer.css'
})
export class AppFooter {

  render() {
    return (
      <ion-footer>
        <ion-toolbar color={'dark-purple'} justify-content-around>
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-button color={'dark-purple'} icon-only item-end
                            onClick={() => AppRoot.route('/profile')}>
                  <ion-icon name="contact" size='large' color={"medium"} />
                </ion-button>
              </ion-col>
              <ion-col>
                <ion-button color={'dark-purple'} icon-only item-end
                            onClick={() => AppRoot.route('/mycourses')}>
                  <ion-icon name="document" size='large' color={"medium"}/>
                </ion-button>
              </ion-col>
              <ion-col>
                <ion-button color={'dark-purple'} icon-only item-end
                            onClick={() => AppRoot.route('/allassignments')}>
                  <ion-icon name="paper" size='large' color={"medium"}/>
                </ion-button>
              </ion-col>
              <ion-col>
                <ion-button color={'dark-purple'} icon-only item-end
                            onClick={() => AppRoot.route('/')}>
                  <ion-icon name="more" size='large' color={"medium"}/>
                </ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-toolbar>
      </ion-footer>
    );
  }
}
