import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ConfigService } from '../config.service';
import { GameService } from '../game.service';
import { ComService } from '../com.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  configService: ConfigService = inject(ConfigService);
  gameService: GameService = inject(GameService);
  comService: ComService = inject(ComService);
  player = this.configService.player;
  router: Router = inject(Router);

  play(com: boolean) {
    this.configService.opponent = com ? 'COM' : 'VS';
    this.comService.updateVariables();
    this.gameService.createGame();
    setTimeout(() => {
      this.router.navigate(['./play']);
    }, 800);
  }
}
