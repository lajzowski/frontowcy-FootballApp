import { Team } from './team.interface.ts';
import { Player } from './player.interface.ts';

export interface TeamWithPlayers extends Team {
  players: Player[];
}
