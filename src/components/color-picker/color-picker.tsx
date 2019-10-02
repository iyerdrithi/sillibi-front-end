import { Component, h, State, Method } from '@stencil/core';

@Component({
  tag: 'color-picker',
  styleUrl: 'color-picker.css'
})

export class ColorPicker {
@State() selectedColor: string;
@Method() async getSelectedColor() {
  return this.selectedColor
}

  colors = [
    ['#ffce00', '#f04141', '#3880ff', '#0bb8cc', '#989aa2'],
    ['#f25454', '#f04100', '#B9B8FF', '#24d6ea', '#86888f'],
    ['#d33939', '#B800B5', '#9757FF', '#0ec254', '#005C42'],
    ['#FF6200', '#80006F', '#DA0AFF', '#28e070', '#006B2E'],
  ];

  componentWillLoad() {
    this.selectedColor = this.colors[0][0];
  }


  renderColors() {
    return this.colors.map((row) => {
      return (
        <ion-row class="ion-padding" >
          {row.map((color) => {
            return (
              <ion-col>
                <div class={'outerCircle' + (this.selectedColor === color ? "selectedCircle" : "")}>
                <div class="circle" style={{background: color}} onClick={() => this.selectedColor = color}/>
                </div>
              </ion-col>
            )
          })}
        </ion-row>
      )
    })
  }



  render() {
    return (
      <ion-grid>
     {this.renderColors()}
      </ion-grid>
    );
  }
}
