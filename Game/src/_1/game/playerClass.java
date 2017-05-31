package _1.game;
 import src.game.PlayerCommands;
 import src.game.Player;

public class playerClass implements Player {

    public playerClass() {
    }

    public void run(PlayerCommands command) {
       //command.getStartingMap(); aaaaa
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