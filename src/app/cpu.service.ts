import { inject, Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { GameService } from './game.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CpuService {
  configService: ConfigService = inject(ConfigService);
  gameService: GameService = inject(GameService);
  router: Router = inject(Router);

  game = this.gameService.game;

  player: 'X' | 'O' = this.configService.player;
  cpu: 'X' | 'O' = this.player == 'X' ? 'O' : 'X';

  updateVariables() {
    this.player = this.configService.player;
    this.cpu = this.player == 'X' ? 'O' : 'X';
  }

  async play(row: number, col: number, game: any) {
    console.log(this.player);
    if (game.board[row][col] != '') return;
    if (game.turn && this.player == 'O') return;
    if (!game.turn && this.player == 'X') return;

    game.board[row][col] = this.player;
    game.count++;

    if (this.gameService.checkWin(this.player, game.tests, game.board)) {
      this.gameService.declareWin(game, game.turn);
      return;
    }

    if (game.count >= 9) {
      this.gameService.declareTie(game);
      return;
    }

    game.turn = !game.turn;

    await this.playCpu(row, col, game);
    game.count++;

    if (this.gameService.checkWin(this.cpu, game.tests, game.board)) {
      this.gameService.declareWin(game, game.turn);
      return;
    }

    game.turn = !game.turn;
  }

  async playCpu(row: number, col: number, game: any) {
    await this.sleep(700);
    for (let i = 1; i <= 2; i++) {
      let x = this.evaluate(game, i);

      if (x) return;
    }

    let available: number[][] = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (game.board[i][j] == '') {
          available.push([i, j]);
        }
      }
    }

    let rand: number = Math.floor(Math.random() * available.length);
    game.board[available[rand][0]][available[rand][1]] = this.cpu;
    return;
  }

  async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  evaluate(game: any, stage: number): boolean {
    for (let i = 0; i < game.tests.length; i++) {
      let test: number[][] = game.tests[i];

      let cell1: string = game.board[test[0][0]][test[0][1]];
      let cell2: string = game.board[test[1][0]][test[1][1]];
      let cell3: string = game.board[test[2][0]][test[2][1]];

      let valCpu1: number = cell1 == this.cpu ? 1 : 0;
      let valCpu2: number = cell2 == this.cpu ? 1 : 0;
      let valCpu3: number = cell3 == this.cpu ? 1 : 0;

      let sumCpu: number = valCpu1 + valCpu2 + valCpu3;

      let valPlayer1: number = cell1 == this.player ? 1 : 0;
      let valPlayer2: number = cell2 == this.player ? 1 : 0;
      let valPlayer3: number = cell3 == this.player ? 1 : 0;

      let sumPlayer: number = valPlayer1 + valPlayer2 + valPlayer3;

      // let case: number;

      if (stage == 1 && sumCpu == 2 && sumPlayer == 0) {
        let empty: number = valCpu1 == 0 ? 1 : valCpu2 == 0 ? 2 : 3;
        let row: number = test[empty - 1][0];
        let col: number = test[empty - 1][1];

        game.board[row][col] = this.cpu;
        return true;
      } else if (stage == 2 && sumPlayer == 2 && sumCpu == 0) {
        let empty: number = valPlayer1 == 0 ? 1 : valPlayer2 == 0 ? 2 : 3;
        let row: number = test[empty - 1][0];
        let col: number = test[empty - 1][1];

        game.board[row][col] = this.cpu;
        return true;
      }
    }

    return false;
  }

  constructor() {
    // let randIntRow = Math.floor(Math.random()*2);
    // let randIntCol = Math.floor(Math.random()*2);
    // this.game.board[row][col] = this.configService.player=='O' && this.configService.opponent=='CPU' ? 'X' : '';
  }
}
