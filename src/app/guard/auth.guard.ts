import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  //const currentPath = route.url[0].path;
  const router = inject(Router);
  const service = inject(AuthService);

  if (service.isLoggedIn()) {
    const userRole = service.getUserRole();

    console.log(route.data['role']);
    console.log(userRole);

    if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
      alert('access denied');
      router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  } else {
    alert('access denied');
    router.navigate(['/login']);
    return false;
  }
};
