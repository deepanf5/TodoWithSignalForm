import { Component, inject } from '@angular/core';
import { Header } from '../header/header';
import { Aside } from '../aside/aside';
import { Footer } from '../footer/footer';
import { RouterOutlet } from '@angular/router';
import { Loader } from '../../services/loader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [Header, Aside, Footer, RouterOutlet, CommonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  loaderServices = inject(Loader);
}
