import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent {

  constructor(
    private router: Router
  ){}

  ngOnInit() {

  }

  public checkout(productId: string) {
    this.router.navigate([`/checkout/${productId}`]);
  }
}
