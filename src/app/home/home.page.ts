import { Component } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import * as $ from 'jquery';
declare var d3: any;
declare var d3plus: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage
{
  subscribe:any;

  constructor(
      public alertController: AlertController, public platform: Platform, private router: Router, private location: Location
  ) {
      this.subscribe =  this.platform.backButton.subscribe(async () => {
        if (this.router.isActive('/home', true) && this.router.url === '/home') {
          this.presentAlertConfirm();

        } else {
          this.location.back();
        }
      });
    }
  ionViewWillEnter() {
    this.init();
  }

  init() {
    var container = d3.selectAll('.container');
    var json = {"nodes":
    [
      {"label":"Node 1"},
      {"label":"Node 2"},
      {"label":"Node 3"},
      {"label":"Node 4"},
      {"label":"Node 5"},
      {"label":"Node 6"},
      {"label":"Node 7"},
      {"label":"Node 8"},
      {"label":"Node 9"},
      {"label":"Node 10"},
      {"label":"Node 11"},
      {"label":"Node 12"},
      {"label":"Node 13"},
      {"label":"Node 14"},
      {"label":"Node 15"}
   ]};

  container.data(json.nodes).append('text').text(function(d){return d.label})
    .attr('fill','#ffffff')
    .attr('font-size', '10')
    .each(function () {
      d3plus.textwrap().
      container(d3.select(this)).
      shape('circle').
      align('middle').
      valign('middle').
      draw();
    });

    var toRemove;

    d3.selectAll('g').on('click', function() {
      if($(this).hasClass('clickable')) {
        var speciesname = $(this).text();
        window.location.href = "/species?fgh="+speciesname;
      }

      if(toRemove) {
        d3.select(toRemove)
        .attr("class", "container")
        .select('circle')
        .transition()
        .duration(200)
        .attr('r', 40)
        .transition()
        .ease('elastic')
        .attr('r', 42)
        .attr('fill','green')
        .attr('stroke','#ffffff');

        d3.select(toRemove).selectAll('tspan')
        .attr('dy', '14')
        .attr('fill','#ffffff')
        .attr('font-size', '10');
      }

      toRemove = this;

      toRemove.parentElement.appendChild(toRemove);
      d3.select(this)
      .attr("class", "clickable container")
      .select('circle')
      .transition()
      .duration(200)
      .attr('r', 70)
      .transition()
      .ease('elastic')
      .attr('r', 85)
      .attr('fill','green')
      .attr('stroke','#ffffff');
      d3.select(this).selectAll('tspan')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '20')
      .attr('dy', '18')
      .attr('fill','#ffffff');
    });

    var tooltip = d3.select(".container");
    var tooltipWithContent = d3.selectAll(".container, .container *");

    function equalToEventTarget() {
        return this == d3.event.target;
    }
    d3.select("body").on("click",function(){
        var outside = tooltipWithContent.filter(equalToEventTarget).empty();
        if (outside) {
          d3.select(toRemove)
          .attr("class", "container")
          .selectAll('circle')
          .transition()
          .duration(200)
          .attr('r', 40)
          .transition()
          .ease('elastic')
          .attr('r', 42)
          .attr('fill','green')
          .attr('stroke','#ffffff');
          d3.select(toRemove).selectAll('tspan')
          .attr('dy', '14')
          .attr('fill','#ffffff')
          .attr('font-size', '10');
        }
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      message: 'Do you want to exit the app?',
      buttons: [{
        text: 'No',
        role: 'cancel',
        cssClass: 'icon-color',
        handler: (blah) => {}
      }, {
        text: 'Yes',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    });

    await alert.present();
  }
}
