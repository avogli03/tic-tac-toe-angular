import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  player: 'X' | 'O' = 'X';
  opponent: 'COM' | 'VS' | '' = '';
  player1Name: string = '';
  player2Name: string = '';

  changePlayer(x: boolean): void {
    this.player = x ? 'X' : 'O';
    console.log(this.player);
  }

  setOpponent(
    isVsComputer: boolean,
    player1Name: string,
    player2Name?: string
  ): void {
    this.opponent = isVsComputer ? 'COM' : 'VS';
    this.player1Name = player1Name;
    this.player2Name = player2Name || ''; // Set the default value if not provided
  }

  constructor() {
    this.player = 'X';
  }
}
