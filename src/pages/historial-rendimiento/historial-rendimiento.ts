import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-historial-rendimiento',
  templateUrl: 'historial-rendimiento.html',
})
export class HistorialRendimientoPage {

  rendimientos:any;
  visible=0;
  data: any;

  public lineChartData: Array<any> = [
    {data: [], label: 'Rendimiento'}
  ];
  
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(0, 92, 243, 0.2)',
      borderColor: 'rgba(0, 92, 243, 1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(public navCtrl: NavController, 
              public usuarioService: UsuarioProvider,
              public navParams: NavParams) {
              
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistorialRendimientoPage');
    this.consulta();
    
  }


  ionViewWillEnter(){
  
  }

consulta(){
  this.usuarioService.getRendimientos(sessionStorage.getItem('idUsuario'))
  .subscribe(
    res=>{
      console.log(res.result);
      this.rendimientos = res.result;
    },
    e=>{
      console.log(e);
    }
  );

}

datos(){
  for(let i in this.rendimientos){
    this.lineChartData[0].data.push(this.rendimientos[i].valor);
    this.lineChartLabels.push(this.rendimientos[i].fecha);
    console.log('valor ' + this.rendimientos[i].valor);
  }
}
// events
  public chartClicked(e: any) {
    console.log(e);
  }
  public chartHovered(e: any) {
    console.log(e);
  }
}
