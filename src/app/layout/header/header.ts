import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { Auth, loginStatus } from '../../services/auth';
import { Router } from '@angular/router';
import { supabase } from '../../app.config';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  private authS = inject(Auth);
  private router = inject(Router);
  private userDetails = this.authS.userData;
  private toastr = inject(ToastrService);
  private desroyRef = inject(DestroyRef);

  constructor() {}

  ngOnInit(): void {}

  logOut() {
    this.authS
      .signOut()
      .pipe(takeUntilDestroyed(this.desroyRef))
      .subscribe({
        next: (res) => {
          if (!res.error) {
            this.router.navigate(['/sign-in']);
            this.showSuccess();
          }
        },
        error: () => {
          this.showError();
        },
      });
  }

  showSuccess() {
    this.toastr.success('See you later! Your tasks will wait… impatiently.');
  }
  showError() {
    this.toastr.error('Logout failed. The app is’t ready to let you go ');
  }
}
