import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loader } from './services/loader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('todoWithsignalForm');
  loaderServices = inject(Loader);
  ngOnInit(): void {
    this.loaderServices.loading$.subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
}
