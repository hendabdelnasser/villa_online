import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

@Injectable()
export class GuardService implements CanActivate{
  constructor(private userService:UserService,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot): boolean{

    if(this.userService.isLogged()){
      return true
    }else{
      this.router.navigateByUrl('/login')
      throw console.error();

    }
  }
}
