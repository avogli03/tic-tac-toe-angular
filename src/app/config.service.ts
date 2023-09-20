import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  player: 'X' | 'O' = 'X';
  opponent: 'CPU' | 'VS' | '' = '';

  changePlayer(x: boolean): void {
    this.player = x ? 'X' : 'O';
    console.log(this.player);
  }

  // setOpponent(cpu: boolean): void {
  //   this.opponent = cpu ? 'CPU' : 'VS';
  //   setTimeout(() => {
  //     this.router.navigate(['/play']);
  //   }, 800);
  // }

  constructor() {
    this.player = 'X';
  }
}
