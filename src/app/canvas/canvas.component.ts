import { Component, ViewChild,OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FabricjsEditorComponent } from 'projects/angular-editor-fabric-js/src/public-api';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  allSharedCanvas = [];
  username;
   
  @ViewChild('canvas', {static: false}) canvas: FabricjsEditorComponent;

  constructor(private routerBtn:Router, private authService: AuthService) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('user'));
    console.log(localStorage.getItem('userId'));
    alert("Welcome : "+ JSON.parse(localStorage.getItem('user'))['name']);
    this.username = JSON.parse(localStorage.getItem('user'))['name'];
   
    setTimeout(()=>{
      this.loadCanvasFromJSON();
    },1000)


    // setInterval(()=>{
    //   this.saveCanvasToJSON();
    // },2000)
    this.authService.get_all_employee().subscribe(data=>{
      
      data.map(e=>{
        if(e.payload.doc.id == localStorage.getItem('userId'))
        {
          this.allSharedCanvas = e.payload.doc.data()['sharedCanvas'];

          console.log("Shared Canvas : "+this.allSharedCanvas);
        }
       
      })
     
    })
   
  }

  showRecievedCanvas(json)
  {
    // console.log("Recieved Canvas : ",json);
    
    this.canvas.saveCanvasToJSON();
    setTimeout(()=>{
      this.canvas.loadRecievedCanvasFromJSON(json);
    },1000)
   
  }

  shareCanvas(form:NgForm)
  {
    if(localStorage.getItem('recievedCanvasType')=='true')
    {
     
      this.canvas.sharedCanvasOther(form.value.email);
    }
    else{
      this.saveCanvasToJSON();
      this.canvas.sharedCanvasOther(form.value.email);
    }
    
  }


  public rasterize() {
    this.canvas.rasterize();
  }

  public rasterizeSVG() {
    this.canvas.rasterizeSVG();
  }

  public saveCanvasToJSON() {
    this.canvas.saveCanvasToJSON();
  }

  public loadCanvasFromJSON() {
    // console.log("Load")
    this.canvas.loadCanvasFromJSON();
  }

  public confirmClear() {
    const json = '';

    this.authService.updateCanvas(localStorage.getItem('userId'),{myCanvas:json});

    localStorage.setItem('Kanvas', json);
    setTimeout(()=>{
      this.canvas.confirmClear();
    },1000)
    
  }

  public changeSize() {
    this.canvas.changeSize();
  }

  public addText() {
    this.canvas.addText();
  }

  public getImgPolaroid(event) {
    this.canvas.getImgPolaroid(event);
  }

  public addImageOnCanvas(url) {
    this.canvas.addImageOnCanvas(url);
  }

  public readUrl(event) {
    this.canvas.readUrl(event);
  }

  public removeWhite(url) {
    this.canvas.removeWhite(url);
  }

  public addFigure(figure) {
    this.canvas.addFigure(figure);
  }

  public removeSelected() {
    this.canvas.removeSelected();
  }

  public sendToBack() {
    this.canvas.sendToBack();
  }

  public bringToFront() {
    this.canvas.bringToFront();
  }

  public clone() {
    this.canvas.clone();
  }

  public cleanSelect() {
    this.canvas.cleanSelect();
  }

  public setCanvasFill() {
    this.canvas.setCanvasFill();
  }

  public setCanvasImage() {
    this.canvas.setCanvasImage();
  }

  public setId() {
    this.canvas.setId();
  }

  public setOpacity() {
    this.canvas.setOpacity();
  }

  public setFill() {
    this.canvas.setFill();
  }

  public setFontFamily() {
    this.canvas.setFontFamily();
  }

  public setTextAlign(value) {
    this.canvas.setTextAlign(value);
  }

  public setBold() {
    this.canvas.setBold();
  }

  public setFontStyle() {
    this.canvas.setFontStyle();
  }

  public hasTextDecoration(value) {
    this.canvas.hasTextDecoration(value);
  }

  public setTextDecoration(value) {
    this.canvas.setTextDecoration(value);
  }

  public setFontSize() {
    this.canvas.setFontSize();
  }

  public setLineHeight() {
    this.canvas.setLineHeight();
  }

  public setCharSpacing() {
    this.canvas.setCharSpacing();
  }

  public rasterizeJSON() {
    this.canvas.rasterizeJSON();
  }

  logout()
  {    
    this.loadCanvasFromJSON();
    this.canvas.saveCanvasToJSON();
    setTimeout(()=>{
      this.canvas.saveCanvasToJSON();
    this.routerBtn.navigate(['/login']);
    },1000)
    
  }

  //  //to save the canvas at end
  // ngOnDestroy()
  // {
  //   this.canvas.saveCanvasToJSON();
  // }

}
