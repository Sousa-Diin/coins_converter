import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  valor : number;
  converterDe : string;
  converterPara : string;
  resultado : number;

  constructor() {}

  handleConverter(){
    const resul = this.valor / 5.19;
    
  }

}
