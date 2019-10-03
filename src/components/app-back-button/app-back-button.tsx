import {Component, h, Prop} from '@stencil/core';
import {AppRoot} from "../app-root/app-root";

@Component({
  tag: 'app-back-button',
  styleUrl: 'app-back-button.css'
})
export class AppBackButton {

  @Prop() defaultHref: string;

  async back() {
    await AppRoot.route(AppRoot.getHistory().pop() || this.defaultHref);
  }

  render() {
    return [
      <ion-button onClick={() => this.back()}>
        <ion-icon slot="icon-only" name="arrow-back"/>
      </ion-button>
    ];
  }
}
