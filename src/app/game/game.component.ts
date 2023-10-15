import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, inject } from '@angular/core';
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
export class GameComponent implements AfterViewInit {
  configService: ConfigService = inject(ConfigService);
  gameService: GameService = inject(GameService);

  titleX = '';
  titleO = '';
  game = this.gameService.game;

  gs: VsService | ComService =
    this.configService.opponent == 'COM'
      ? inject(ComService)
      : inject(VsService);

  setPlayerNames(): void {
    if (this.configService.opponent == 'COM') {
      this.titleX = prompt('Enter Player 1 Name') || 'Player 1';
      this.titleO = 'COM';
    } else {
      this.titleX = prompt('Enter Player 1 Name') || 'Player 1';
      this.titleO = prompt('Enter Player 2 Name') || 'Player 2';
    }
  }

  ngAfterViewInit() {
    this.setPlayerNames();
  }
}
