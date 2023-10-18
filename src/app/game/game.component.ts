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

    if (this.configService.opponent == 'COM') {
      do {
        this.titleX = capitalizeFirstLetter(prompt('Enter Your Name')!);
      } while (!Regex.test(this.titleX.trim()));
      this.titleO = 'COM';
    } else {
      do {
        this.titleX = capitalizeFirstLetter(prompt('Enter Player 1 Name')!);
      } while (!Regex.test(this.titleX.trim()));

      do {
        this.titleO = capitalizeFirstLetter(prompt('Enter Player 2 Name')!);
      } while (!Regex.test(this.titleO.trim()));
    }
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    this.setPlayerNames();
  }
}
