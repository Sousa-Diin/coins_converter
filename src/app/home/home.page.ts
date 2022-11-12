import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  valor : number;
  dConv : string;
  pConv : string;
  resultado : number = 0;

  constructor() {
    console.log(this.valor,this.dConv, this.pConv, this.resultado);

  }

  handleConverter(){
    const dolar = 5.33;
    const real = 1.0;
    const euro = 5.52;

    let resul = 0;
    //console.log(resul);

    if (this.dConv == 'Real(BRL)' ){
      if(this.pConv == 'Dollar(USD)'){
        resul = (real/dolar);
      }else if ( this.pConv == 'Euro(EUR)'){
        resul = real/euro;
      }
      
    }else if (this.dConv == 'Dollar(USD)'){
      if(this.pConv == 'Real(BRL)'){
        resul = dolar/real;
      }else if ( this.pConv == 'Euro(EUR)'){
        resul = dolar/euro;
      }
    }else if (this.dConv == 'Euro(EUR)'){
      if(this.pConv == 'Dollar(USD)'){
        resul = euro/dolar;
      }else if ( this.pConv == 'Real(BRL)'){
        resul = euro/real;
      }
    } 
    this.resultado = this.valor * resul;

  }

  handleChange(){
    let aux = this.dConv;
    this.dConv = this.pConv
    this.pConv = aux;
    this.resultado = 0;

  }
  

}
