import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Platform, IonContent, NavController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit  {
  private param1 : string ;
  @ViewChild(IonContent, {static: true}) ionContent: IonContent;

  @ViewChild('panel1', {static: true}) panel1: ElementRef;
  @ViewChild('panel2', {static: true}) panel2: ElementRef;
  @ViewChild('panel3', {static: true}) panel3: ElementRef;
  @ViewChild('panel4', {static: true}) panel4: ElementRef;
  @ViewChild('panel5', {static: true}) panel5: ElementRef;
  @ViewChild('panel6', {static: true}) panel6: ElementRef;
  @ViewChild('panel7', {static: true}) panel7: ElementRef;

public fgh:any;
public panel_number: number;

/**
    * @name panelPos1
    * @type {number}
    * @public
    * @description     Object for storing the y-axis position of the first 'page'
    */
   public panelPos1 : number;

   /**
    * @name panelPos2
    * @type {number}
    * @public
    * @description     Object for storing the y-axis position of the second 'page'
    */
   public panelPos2 : number;

   /**
    * @name panelPos3
    * @type {number}
    * @public
    * @description     Object for storing the y-axis position of the third 'page'
    */
   public panelPos3 : number;

   /**
    * @name panelPos4
    * @type {number}
    * @public
    * @description     Object for storing the y-axis position of the fourth 'page'
    */
   public panelPos4 : number;

   /**
    * @name panelPos5
    * @type {number}
    * @public
    * @description     Object for storing the y-axis position of the fifth 'page'
    */
   public panelPos5 : number;

   /**
    * @name panelPos4
    * @type {number}
    * @public
    * @description     Object for storing the y-axis position of the fourth 'page'
    */
   public panelPos6 : number;

   /**
    * @name panelPos5
    * @type {number}
    * @public
    * @description     Object for storing the y-axis position of the fifth 'page'
    */
   public panelPos7 : number;

   /**
    * @name panels
    * @type {number}
    * @public
    * @description     Array for storing each 'page' (which will be created dynamically
                       inside the template view)
    */
   public panels: any  = [1,2,3,4,5,6,7];

subscribe:any;
  constructor(
       public platform: Platform, private router: Router, private location: Location, public navCtrl: NavController
    ) {
      this.subscribe =  this.platform.backButton.subscribe(async () => {
        this.location.back();
        });
     }

  /**
    * Determine the y-axis position for each 'page' once the view has loaded
    * and assign these values to properties for later reference
    *
    * @public
    * @method ionViewDidLoad
    * @return {none}
    */
   ionViewDidEnter () : void
  {
    // this.init(this.fgh, this.panel_number[0]);
    this.panelPos1 = 0;
    // this.panelPos1 = this.panel1.nativeElement.getBoundingClientRect().top ;
    this.panelPos2 = this.panel2.nativeElement.getBoundingClientRect().top - 60;
    this.panelPos3 = this.panel3.nativeElement.getBoundingClientRect().top - 60;
    this.panelPos4 = this.panel4.nativeElement.getBoundingClientRect().top - 60;
    this.panelPos5 = this.panel5.nativeElement.getBoundingClientRect().top - 60;
    this.panelPos6 = this.panel6.nativeElement.getBoundingClientRect().top - 60;
    this.panelPos7 = this.panel7.nativeElement.getBoundingClientRect().top - 60;

    var urlParams = new URLSearchParams(window.location.search);
    this.fgh = urlParams.getAll('fgh');
    this.panel_number = Number(urlParams.getAll('panel_number')[0]);

    this.scrollToPanel(this.panel_number);
    ;
  }

  /**
    * Scrolls to a specified point on the x/y axes
    *
    * @public
    * @method scrollTo
    * @param x            {Number}         The amount of pixels to scroll on the x axis
    * @param y            {Number}         The amount of pixels to scroll on the y axis
    * @param duration     {Number}         The scroll duration (in milliseconds)
    * @return {none}
    */
   scrollToPoint(x         : number,
          y         : number,
          duration  : number) : void
  {
  this.ionContent.scrollToPoint(x, y, duration);
  }

  /**
  * Scrolls to the specified 'page'
  *
  * @public
  * @method scrollToPanel
  * @param num            {Number}         The number of the 'page' to scroll to
  * @return {none}
  */

  scrollToPanel(num : number) : void
  {
    console.log(this.panelPos2);
    switch(num)
    {
        case 1:
          this.scrollToPoint(0, this.panelPos1, 100);
        break;

        case 2:
          this.scrollToPoint(0, this.panelPos2, 100);
        break;

        case 3:
          this.scrollToPoint(0, this.panelPos3, 100);
        break;

        case 4:
          this.scrollToPoint(0, this.panelPos4, 100);
        break;

        case 5:
          this.scrollToPoint(0, this.panelPos5, 100);
        break;

        case 6:
          this.scrollToPoint(0, this.panelPos6, 100);
        break;

        case 7:
          this.scrollToPoint(0, this.panelPos7, 100);
        break;
    }

  }

  // ionViewWillEnter() {
  //   var urlParams = new URLSearchParams(window.location.search);
  //   let fgh = urlParams.getAll('fgh');
  //   let panel_number = urlParams.getAll('panel_number');

  //   this.init(fgh, panel_number[0]);
  // }
  ngOnInit() {
    // var urlParams = new URLSearchParams(window.location.search);
    // this.fgh = urlParams.getAll('fgh');
    // this.panel_number = Number(urlParams.getAll('panel_number')[0]);
  }

  // init(fgh, panel_number){
  //   this.fgh = fgh;
  //   this.panel_number = panel_number;
  //   // this.scrollToPanel(this.panel_number);
  // }
  scrollContent(scroll) {
    if (scroll === 'top') {
      this.ionContent.scrollToTop(300); //300 for animate the scroll effect.
    } else {
      this.ionContent.scrollToBottom(300);  //300 for animate the scroll effect.
    }
  }
}
