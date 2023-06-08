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

    private updateColor() {
        if (this.isActive) {
            this.elementRef.nativeElement.classList.add('active-status');
            this.elementRef.nativeElement.classList.remove('inactive-status');
        } else {
            this.elementRef.nativeElement.classList.add('inactive-status');
            this.elementRef.nativeElement.classList.remove('active-status');
        }
    }
}
