import {HostBinding, Directive, HostListener} from "@angular/core";

@Directive({
  selector: '[appDropDown]'
})
export class DropdownDirective {

  @HostBinding('class.open') isOpen = false;

  @HostListener('click') onClick() {
    this.isOpen = !this.isOpen;
  }
}