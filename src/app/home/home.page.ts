import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  valor : number = null;
  dConv : string;
  pConv : string;
  resultado : number = 0;
   

  constructor() {
    console.log(this.valor,this.dConv, this.pConv, this.resultado);
 
  }

  handleConverter(){
    const url = environment.api;
    const coins = 'USD-BRL,EUR-BRL';

    const real = 1.0;
    let dolar = 0;let euro = 0;
    let resul = 0;
    
    fetch(url + coins)
      .then(function(response){
        return response.json();
      })

      .then(function(data){
        console.log(data.USDBRL.bid)
        dolar = data.USDBRL.bid;
        localStorage.setItem('euro', data.EURBRL.bid);
        localStorage.setItem('dolar', dolar.toString());

      })

      dolar = parseFloat(localStorage.getItem('dolar'));
      euro = parseFloat(localStorage.getItem('euro'))
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
      console.log(this.resultado)
  }

  handleChange(){
    let aux = this.dConv;
    this.dConv = this.pConv
    this.pConv = aux;
    this.resultado = 0;

  }
  

}
