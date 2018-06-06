import { Directive, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appIstyping]'
})
export class IsTypingDirective {
  
  @Output("onTyping") onTyping: EventEmitter<any> = new EventEmitter();

  constructor(private elRef: ElementRef) { }

  @HostListener("input", ["$event"])
  onkeyup(evt){
  	if(evt.target.value.length > 0){
  		this.onTyping.emit(true);
  	}else{
      this.onTyping.emit(false);
  	}
  }
}
