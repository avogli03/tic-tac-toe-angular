import { CommonModule } from '@angular/common';
import {
  Component,
  AfterViewInit,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
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

  constructor(private cdr: ChangeDetectorRef) {}

  setPlayerNames(): void {
    const Regex = /^[A-Za-z]+$/;

    const capitalizeFirstLetter = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1);

    let enteredName: string;

    do {
      enteredName = capitalizeFirstLetter(
        prompt('Enter Player 1 Name')! || 'Player 1'
      );
    } while (!Regex.test(enteredName.trim()));

    if (this.configService.opponent == 'COM') {
      if (this.configService.player == 'X') {
        this.titleX = enteredName;
        this.titleO = 'COM';
      } else {
        this.titleX = 'COM';
        this.titleO = enteredName;
      }
    } else {
      this.titleX = enteredName;

      let secondPlayerName: string;
      do {
        secondPlayerName = capitalizeFirstLetter(
          prompt('Enter Player 2 Name')! || 'Player 2'
        );
      } while (!Regex.test(secondPlayerName.trim()));

      this.titleO = secondPlayerName;
    }

    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    this.setPlayerNames();
  }
}
