import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import * as $ from 'jquery';
declare var d3: any;
declare var d3plus: any;
@Component({
  selector: 'app-species',
  templateUrl: './species.page.html',
  styleUrls: ['./species.page.scss'],
})
export class SpeciesPage implements OnInit {
public fgh:any;
subscribe:any;
  constructor(
      public platform: Platform, private router: Router, private location: Location
    ) {
      this.subscribe =  this.platform.backButton.subscribe(async () => {
        this.location.back();
       });
     }
   ionViewWillEnter() {
     var urlParams = new URLSearchParams(window.location.search);
     let fgh = urlParams.getAll('fgh');
     this.init(fgh);
   }

  ngOnInit() {
  }
  init(fgh){
    this.fgh = fgh;
      var container = d3.selectAll('.container');
      var json = {"Nodes":[
       {"label":"About Species"},
       {"label":"Silvicultural requirement"},
       {"label":"Nursery techniques"},
       {"label":"Planting techniques"},
       {"label":"Tending operations"},
       {"label":"Suitable Agroforestry System"},
       {"label":"Uses"}
      ]};
   d3.selectAll("svg text").data(json.Nodes).text(function(d){return d.label});
   d3.selectAll('g').on('click', function() {

var speciesname = $(this).text();
var k = 0;
var label_number = 1;
json.Nodes.forEach(element => {
  k++;
  if(element['label'] == speciesname){
    label_number = k;
  }
});
window.location.href = "/detail?fgh="+speciesname+"&panel_number=" + label_number;
//alert($(this).text());
//this.router.navigate(['species']);
});
}
}
