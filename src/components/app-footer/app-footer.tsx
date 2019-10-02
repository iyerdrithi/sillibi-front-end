import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-footer',
  styleUrl: 'app-footer.css'
})
export class AppFooter {


  render() {
    return (
      <ion-footer>
        <ion-toolbar color={'dark-purple'}>
          <ion-button color={'dark-purple'} icon-only item-end clear href='/profile' >
          <ion-icon name="contact" size='large'/>
          </ion-button>
          <ion-button color={'dark-purple'} icon-only item-end clear href='/mycourses' >
          <ion-icon name="document" size='large'/>
          </ion-button>
            <ion-button color={'dark-purple'} icon-only item-end clear href='/myassignments' >
          <ion-icon name="paper" size='large'/>
            </ion-button>
          <ion-button color={'dark-purple'} icon-only item-end clear href='/' >
          <ion-icon name="more" size='large'/>
          </ion-button>
        </ion-toolbar>
      </ion-footer>
    );
  }
}
