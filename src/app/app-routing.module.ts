import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'play', component: GameComponent },
  { path: 'menu', component: MenuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
