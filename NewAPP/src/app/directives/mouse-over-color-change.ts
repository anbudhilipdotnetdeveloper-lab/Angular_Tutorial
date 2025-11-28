import { Directive,Input,ElementRef,Renderer2,HostListener } from '@angular/core';

@Directive({
  selector: '[appMouseOverColorChange]'
})
export class MouseOverColorChange {
 private _defaultColor='red';
 @Input('appMouseOverColorChange') highlightColor!:string;
  constructor(private elr: ElementRef, private ren:Renderer2 ) { }

  changeColor(color?:string):void{
    this.ren.setStyle(this.elr.nativeElement,'color',color);
  }

  @HostListener('mouseenter') onMouseEnter():void{
    this.changeColor(this.highlightColor||this._defaultColor);
  }

  @HostListener('mouseleave') onMouseLeave():void{
    this.changeColor('');
  }
}
