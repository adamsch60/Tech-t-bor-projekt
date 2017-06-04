package Player2.game;

import src.game.Player;
import src.game.PlayerCommands;

public class playerClass implements Player {

    public playerClass() {
    }

    public void run(PlayerCommands command) {
        for(int x=0;x<3;x++) {
            while (command.What_I_See().what != 1) {
                command.Shoot();
            }
            command.Move();
        }
        while (command.What_I_See().what != 1) {
            command.Shoot();
        }
        command.Rotate("RIGHT");
        for(int x=0;x<2;x++) {
            while (command.What_I_See().what != 1) {
                command.Shoot();
            }
            command.Move();
        }
        while (command.What_I_See().what != 1) {
            command.Shoot();
        }
        command.Rotate("LEFT");
        for(int x=0;x<2;x++) {
            while (command.What_I_See().what != 1) {
                command.Shoot();
            }
            command.Move();
        }
        while (command.What_I_See().what != 1) {
            command.Shoot();
        }
        command.Rotate("RIGHT");
        while (true) {
            if (command.What_I_See().what != 1) {
                command.Shoot();
                continue;
            }
            if (command.What_I_See().howFar == 1) {
                command.Rotate("RIGHT");
                continue;
            }
            command.Move();
        }
    }
}