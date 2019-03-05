import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SalidaEProvider } from './../../providers/salida-e/salida-e';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-marcador-salida-e',
  templateUrl: 'marcador-salida-e.html',
})
export class MarcadorSalidaEPage{
  
  salida:any;
  form: FormGroup;
  temp:any;
  
  equipos:any = [];
  
  selectOptions:any;
  equipoA:any = {
    nombre:''
  };
  equipoB:any = {
    nombre:''
  };

  idSalidaE:any;

  equiposTemp:any;

  constructor(public navCtrl: NavController,
              private salidaProvider: SalidaEProvider,
              private fb: FormBuilder, 
              public navParams: NavParams) {
                this.form = this.fb.group({
                  idSalidaE: new FormControl(),
                  ganador: new FormControl(1),
                  perdedor: new FormControl(),
                  equipoA: new FormControl(),
                  equipoB: new FormControl(),
                  anotacionesGanador: new FormControl(),
                  anotacionesPerdedor: new FormControl(),
                  finalizado: new FormControl()
                });

                this.temp = this.form.value.ganador;
                this.idSalidaE = this.salidaProvider.getSalidaE();
                

                
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad MarcadorSalidaEPage');
  }


  ionViewWillEnter(){
    this.salidaProvider.getEquiposSalida()
      .subscribe(
        res=>{
          this.equipos = res.result;
          this.equiposTemp = this.equipos;
          this.equipoA = this.equipos[0];
          this.equipoB = this.equipos[1];
          console.log(this.equipoA);
          console.log(this.equipoB);

        },
        e=>{
          console.log(e);
        }
      )
  }

  terminar(){
    if(this.form.value.equipoA > this.form.value.equipoB){
      this.form.setValue({
        idSalidaE: this.idSalidaE,
        equipoA: this.form.value.equipoA,
        equipoB: this.form.value.equipoB,
        ganador: this.equipoA.idEquipo,
        perdedor: this.equipoB.idEquipo,
        anotacionesGanador: this.form.value.equipoA,
        anotacionesPerdedor: this.form.value.equipoB,
        finalizado: 1
      });
      console.log(this.form.value);
    }
    if(this.form.value.equipoA < this.form.value.equipoB){
      this.form.setValue({
        idSalidaE: this.idSalidaE,
        equipoA: this.form.value.equipoA,
        equipoB: this.form.value.equipoB,
        ganador: this.equipoB.idEquipo,
        perdedor: this.equipoA.idEquipo,
        anotacionesGanador: this.form.value.equipoB,
        anotacionesPerdedor: this.form.value.equipoA,
        finalizado: 1
      });
      console.log(this.form.value);
    }
    if(this.form.value.equipoA == this.form.value.equipoB){
      this.form.setValue({
        idSalidaE: this.idSalidaE,
        equipoA: this.form.value.equipoA,
        equipoB: this.form.value.equipoB,
        ganador: this.equipoA.idEquipo,
        perdedor: this.equipoB.idEquipo,
        anotacionesGanador: this.form.value.equipoA,
        anotacionesPerdedor: this.form.value.equipoB,
        finalizado: 1
      });
      console.log(this.form.value);
    }

    this.salidaProvider.putMarcador(this.form.value)
      .subscribe(
        res=>{
          console.log(res);
          this.navCtrl.pop();
        },
        e=>{
          console.log(e);
        }
      );
  }

  



}
