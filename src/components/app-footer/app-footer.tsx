import { Component, h } from '@stencil/core';
import {AppRoot} from "../app-root/app-root";
<<<<<<< HEAD
import {RouteService} from "../../services/route.service";
=======
>>>>>>> master

@Component({
  tag: 'app-footer',
  styleUrl: 'app-footer.css'
})
export class AppFooter {

<<<<<<< HEAD
  getColor(path) {
    return RouteService.path().match(path) ? 'warning' : 'medium';
  }

=======
>>>>>>> master
  render() {
    return (
      <ion-footer>
        <ion-toolbar color={'dark-purple'} justify-content-around>
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-button color={'dark-purple'} icon-only item-end
                            onClick={() => AppRoot.route('/profile')}>
<<<<<<< HEAD
                  <ion-icon name="contact" size='large' color={this.getColor('profile')} />
=======
                  <ion-icon name="contact" size='large' color={"medium"} />
>>>>>>> master
                </ion-button>
              </ion-col>
              <ion-col>
                <ion-button color={'dark-purple'} icon-only item-end
                            onClick={() => AppRoot.route('/mycourses')}>
<<<<<<< HEAD
                  <ion-icon name="document" size='large' color={this.getColor('mycourses')}/>
=======
                  <ion-icon name="document" size='large' color={"medium"}/>
>>>>>>> master
                </ion-button>
              </ion-col>
              <ion-col>
                <ion-button color={'dark-purple'} icon-only item-end
                            onClick={() => AppRoot.route('/allassignments')}>
<<<<<<< HEAD
                  <ion-icon name="paper" size='large' color={this.getColor('allassignments')}/>
=======
                  <ion-icon name="paper" size='large' color={"medium"}/>
>>>>>>> master
                </ion-button>
              </ion-col>
              <ion-col>
                <ion-button color={'dark-purple'} icon-only item-end
                            onClick={() => AppRoot.route('/')}>
<<<<<<< HEAD
                  <ion-icon name="more" size='large' color={this.getColor('/')}/>
=======
                  <ion-icon name="more" size='large' color={"medium"}/>
>>>>>>> master
                </ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-toolbar>
      </ion-footer>
    );
  }
}
