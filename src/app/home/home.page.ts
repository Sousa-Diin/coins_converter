import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  inputValue: number; //Entrada de dados (valor)
  showValue = 0;
  convertFrom = ''; // converte de...
  convertTo = ''; // ... para
  result = 0;
  dCotacao = ' ';
  nCotacao = ' ';
  pCotacao : any; //preço
  sCotacao : any; //multiplo



  constructor( private toastController: ToastController){
    console.log(this.inputValue,this.convertFrom, this.convertTo, this.result);

  }

  handleConverter() {
    const url = environment.api;
    const coins = 'USD-BRL,EUR-BRL';

    const real = 1.0;
    let dolar = 0;let euro = 0;
    let resul = 0;

    fetch(url + coins)
      .then((response) => response.json())

      // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
      .then(function(data){
        console.log(data);

        localStorage.setItem('euro', data.EURBRL.bid);
        localStorage.setItem('dolar', data.USDBRL.bid);

        localStorage.setItem('USD',data.USDBRL.name);
        localStorage.setItem('EUR',data.EURBRL.name);

        localStorage.setItem('dataUSD',data.USDBRL.create_date);
        localStorage.setItem('dataEUR',data.EURBRL.create_date);

      });

      dolar = parseFloat(localStorage.getItem('dolar'));
      euro = parseFloat(localStorage.getItem('euro'));

      this.showValue = this.inputValue;

      if (this.inputValue > 0 ){
        if (this.convertFrom === 'Real(BRL)' ){
          this.dCotacao = window.localStorage.getItem('dataUSD').toString();
          this.nCotacao = 'Real/Brasileiro';
          if(this.convertTo === 'Dollar(USD)'){
            resul = (real/dolar);
            this.pCotacao = resul;
            this.sCotacao = dolar;
          }else if ( this.convertTo === 'Euro(EUR)'){
            resul = real/euro;
            this.pCotacao = resul;
            this.sCotacao = euro;
          }

        }else if (this.convertFrom === 'Dollar(USD)'){
          this.dCotacao = window.localStorage.getItem('dataUSD').toString();
          this.nCotacao = window.localStorage.getItem('USD').toString();

          if(this.convertTo === 'Real(BRL)'){
            resul = dolar/real;
            this.pCotacao = dolar;
            this.sCotacao = real/dolar;
          }else if ( this.convertTo === 'Euro(EUR)'){
            resul = dolar/euro;
            this.pCotacao = dolar;
            this.sCotacao = resul;

          }
        }else if (this.convertFrom ==='Euro(EUR)'){

          this.dCotacao = localStorage.getItem('dataEUR').toString();
          this.nCotacao = localStorage.getItem('EUR').toString();

          if(this.convertTo === 'Dollar(USD)'){
            resul = euro/dolar;
            this.pCotacao = euro;
            this.sCotacao = resul;
          }else if ( this.convertTo === 'Real(BRL)'){
            resul = euro/real;
            this.pCotacao = euro;
            this.sCotacao = real/euro;
          }
        }

        this.result = this.inputValue * resul;
        //this.resultado.toFixed(2);
        this.showValue = this.inputValue;
        console.log(this.result);

      }else if (this.convertFrom === '' || this.convertTo === ''){
        this.warning('WARNING: campo vazio');
      }
      else{
        this.result = 0;
        this.showValue = 0;
        this.inputValue = null;
        this.warning('WARNING: Entre com valor válido');
      }

  };

  handleChange(){
    const aux = this.convertFrom;
    this.convertFrom = this.convertTo;
    this.convertTo = aux;
    this.result = 0;

  };

  isFormValid(){
    return (this.convertFrom && this.convertTo  && this.inputValue > 0);
  }

  async warning(msg: string) {

    const previousToast = await this.toastController.getTop();

    if (previousToast){
      await this.toastController.dismiss();
    }

    const toast = await this.toastController.create({
      message: msg,
      color: 'medium',
      duration: 3000
    });

    toast.present();
  }


}
