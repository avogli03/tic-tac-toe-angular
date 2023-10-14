import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { GameService } from '../game.service';
import { ConfigService } from '../config.service';
import { VsService } from '../vs.service';
import { ComService } from '../com.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  configService: ConfigService = inject(ConfigService);
  gameService: GameService = inject(GameService);

  game = this.gameService.game;

  gs: VsService | ComService =
    this.configService.opponent == 'COM'
      ? inject(ComService)
      : inject(VsService);

  titleX =
    this.game.player == 'X'
      ? 'YOU'
      : this.game.opponent == 'COM'
      ? 'COM'
      : 'P1';

  titleO =
    this.game.player == 'O'
      ? 'YOU'
      : this.game.opponent == 'COM'
      ? 'COM'
      : 'P2';
}
