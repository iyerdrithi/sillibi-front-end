import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-footer',
  styleUrl: 'app-footer.css'
})
export class AppFooter {


  render() {
    return (
      <ion-footer>
        <ion-toolbar color={'indigo'}>
          <ion-button color={'indigo'} icon-only item-end clear href='/profile' >
          <ion-icon name="contact" size='large'/>
          </ion-button>
          <ion-button color={'indigo'} icon-only item-end clear href='/mycourses' >
          <ion-icon name="document" size='large'/>
          </ion-button>
            <ion-button color={'indigo'} icon-only item-end clear href='/myassignments' >
          <ion-icon name="paper" size='large'/>
            </ion-button>
          <ion-button color={'indigo'} icon-only item-end clear href='/' >
          <ion-icon name="more" size='large'/>
          </ion-button>
        </ion-toolbar>
      </ion-footer>
    );
  }
}
