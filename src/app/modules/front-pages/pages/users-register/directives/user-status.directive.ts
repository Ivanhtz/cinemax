import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[appUserStatus]'
})
export class UserStatusDirective implements OnInit {
    @Input('appUserStatus') isActive: boolean = false;

    constructor(private elementRef: ElementRef) { }

    ngOnInit() {
        this.updateColor();
    }

    //Método para controlar el color que se muestra en función de si la propiedad "isActive" está en true o en false
    private updateColor() {
        if (this.isActive) {
            this.elementRef.nativeElement.style.backgroundColor = 'green';
        } else {
            this.elementRef.nativeElement.style.backgroundColor = 'red';
        }
    }
}
