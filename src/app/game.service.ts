import { Injectable, inject } from '@angular/core';
import { ConfigService } from './config.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  configService: ConfigService = inject(ConfigService);
  router: Router = inject(Router);

  tests: number[][][] = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],

    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],

    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [2, 0],
      [1, 1],
      [0, 2],
    ],
  ];

  game: any = {
    player: this.configService.player,
    opponent: this.configService.opponent,
    turn:
      this.configService.player == 'O' && this.configService.opponent == 'COM'
        ? false
        : true,
    scoreX: 0,
    scoreO: 0,
    ties: 0,
    game: false,
    modalConfig: {
      modal: '', // 'WIN', 'TIE', 'RE', 'OFF'
      winner: null,
    },
    count:
      this.configService.player == 'O' && this.configService.opponent == 'COM'
        ? 1
        : 0,
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],

    tests: this.tests,
  };

  createGame(): void {
    this.game = {
      player: this.configService.player,
      opponent: this.configService.opponent,
      turn:
        this.configService.player == 'O' && this.configService.opponent == 'COM'
          ? false
          : true,
      scoreX: 0,
      scoreO: 0,
      ties: 0,
      game: false,
      modalConfig: {
        modal: '', // 'WIN', 'TIE', 'RE', 'OFF'
        winner: null,
      },
      count:
        this.configService.player == 'O' && this.configService.opponent == 'COM'
          ? 1
          : 0,
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],

      tests: this.tests,
    };

    if (
      this.configService.player == 'O' &&
      this.configService.opponent == 'COM'
    ) {
      let randRow = Math.floor(Math.random() * 2);
      let randCol = Math.floor(Math.random() * 2);

      this.game.board[randRow][randCol] = 'X';
    }
  }

  checkWin(char: 'X' | 'O', tests: number[][][], board: string[][]): boolean {
    for (let i = 0; i < tests.length; i++) {
      let test: number[][] = tests[i];

      let val1: string = board[test[0][0]][test[0][1]];
      let val2: string = board[test[1][0]][test[1][1]];
      let val3: string = board[test[2][0]][test[2][1]];

      if (val1 === char && val2 === char && val3 === char) {
        return true;
      }
    }

    return false;
  }

  declareWin(game: any, winner: boolean): void {
    game.modalConfig.modal = 'WIN';
    game.modalConfig.winner = winner;

    if (winner) game.scoreX++;
    if (!game.turn) game.scoreO++;
  }

  declareTie(game: any): void {
    game.modalConfig.modal = 'TIE';
    game.modalConfig.winner = null;
    game.ties++;
  }

  hideModal(game: any): void {
    game.modalConfig.modal = 'OFF';
  }

  quit(game: any): void {
    this.hideModal(game);
    this.router.navigate(['/']);
    console.clear();
  }

  nextRound(game: any): void {
    game.modalConfig.modal = 'OFF';
    game.turn = true;
    game.count = 0;
    game.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];

    if (
      this.configService.player == 'O' &&
      this.configService.opponent == 'COM'
    ) {
      let randRow = Math.floor(Math.random() * 2);
      let randCol = Math.floor(Math.random() * 2);

      this.game.board[randRow][randCol] = 'X';
      this.game.turn = false;
      this.game.count = 1;
    }
    console.clear();
    console.log('Next Round:');
  }

  home(game: any): void {
    const isConfirmed = window.confirm('Are you sure you want to quit?');

    if (isConfirmed) {
      this.hideModal(game);
      this.router.navigate(['/']);
      console.clear();
    }
  }

  resetGame(game: any): void {
    const isConfirmed = window.confirm(
      'Are you sure you want to reset the game?'
    );

    if (isConfirmed) {
      game.modalConfig.modal = 'OFF';
      game.turn = true;
      game.count = 0;
      game.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ];
      this.game.scoreX = 0;
      this.game.scoreO = 0;
      this.game.ties = 0;

      if (
        this.configService.player == 'O' &&
        this.configService.opponent == 'COM'
      ) {
        let randRow = Math.floor(Math.random() * 2);
        let randCol = Math.floor(Math.random() * 2);

        this.game.board[randRow][randCol] = 'X';
        this.game.turn = false;
        this.game.count = 1;
      }
      console.clear();
      console.log('New Game:');
    }
  }

  constructor(private routeer: Router) {
    this.checkForReload();
  }

  private checkForReload() {
    const isReload = localStorage.getItem('isReload');

    if (isReload) {
      this.routeer.navigate(['/']);
    } else {
      localStorage.setItem('isReload', 'true');
    }
  }
}
