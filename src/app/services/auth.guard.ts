import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    console.log('AuthGuard: isAuthenticated =', isAuthenticated);

    if (isAuthenticated) {
      return true;
    } else {
      console.log('AuthGuard: Not authenticated, redirecting to /auth');
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
