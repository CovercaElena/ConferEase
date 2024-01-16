// src/app/logout/logout.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login'; // Import the SocialAuthService

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private socialAuthService: SocialAuthService, private router: Router) { }

  ngOnInit(): void {
    this.socialAuthService.signOut().then(() => {
      this.router.navigate(['']); // Redirect to login after successful sign out
    }).catch(error => {
      console.error('Error during sign out:', error);
    });
  }
}
