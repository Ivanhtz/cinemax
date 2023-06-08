import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[appHighlightDate]'
})
export class HighlightDateDirective implements OnInit {

    constructor(private elementRef: ElementRef) { }

    ngOnInit(): void {
        const dateElement: HTMLElement = this.elementRef.nativeElement;
        dateElement.style.background = 'yellow'; // Establece el color del texto en amarillo
    }
}
