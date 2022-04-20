import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";

@Directive({
    selector: '[requireRule]'
  })
export class RequireRuleDirective implements OnInit {
    @Input('requireRule') requireRule: string;
  
    constructor(
        private elRef: ElementRef,
        private authService: AuthService) {
        this.elRef.nativeElement.style.display = 'none';

    }
    ngOnInit(): void {
        this.checkAccess();
        this.authService.loggedInSubject.subscribe(
            () => {
              this.checkAccess();
            }
          );
    }

    checkAccess() {
        if(this.authService.hasRules(this.requireRule)) {
            this.elRef.nativeElement.style.display = 'initial';
        }
    }

}