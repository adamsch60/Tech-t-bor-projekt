package _2.game;

import src.game.Player;
import src.game.PlayerCommands;

public class playerClass implements Player {

    public playerClass() {
    }

    public void run(PlayerCommands command) {
        while (true) {
            if (command.What_I_See().what != 1) {
                command.Shoot();
                continue;
            }
            if (command.What_I_See().howFar == 1) {
                command.Rotate("LEFT");
                continue;
            }
            command.Move();
        }
    }
}