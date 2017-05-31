package _1.game;
 import src.game.PlayerCommands;
 import src.game.Player;

public class playerClass implements Player {

    public playerClass() {
    }

    public void run(PlayerCommands command) {
        if (command.What_I_See().what != 1) {
            command.Shoot();
        }
        command.Rotate("LEFT");
        if (command.What_I_See().what != 1) {
            command.Shoot();
        }
        for (int x = 0; x < 3; x++) {
            if (command.What_I_See().what != 1) {
                command.Shoot();
            }
            command.Move();
        }
        if (command.What_I_See().what != 1) {

            command.Shoot();
        }
        command.Rotate("RIGHT");
        if (command.What_I_See().what != 1) {

            command.Shoot();
        }
        for (int x = 0; x < 2; x++) {
            command.Move();
            if (command.What_I_See().what != 1) {

                command.Shoot();
            }
        }
        if (command.What_I_See().what != 1) {
            command.Shoot();
        }
        command.Rotate("LEFT");
        if (command.What_I_See().what != 1) {

            command.Shoot();
        }
        for (int x = 0; x < 2; x++) {
            if (command.What_I_See().what != 1) {

                command.Shoot();
            }
            command.Move();
        }
        if (command.What_I_See().what != 1) {

            command.Shoot();
        }
        command.Rotate("RIGHT");
        if (command.What_I_See().what != 1) {

            command.Shoot();
        }
        for (int x = 0; x < 3; x++) {
            if (command.What_I_See().what != 1) {

                command.Shoot();
            }
            command.Move();
        }
        if (command.What_I_See().what != 1) {

            command.Shoot();
        }
        command.Rotate("RIGHT");
        if (command.What_I_See().what != 1) {

            command.Shoot();
        }
        for (int x = 0; x < 3; x++) {
            if (command.What_I_See().what != 1) {

                command.Shoot();
            }
            command.Move();
        }
        if (command.What_I_See().what != 1) {

            command.Shoot();
        }
        command.Rotate("RIGHT");
        if (command.What_I_See().what != 1) {

            command.Shoot();
        }
        while (true) {
            if (command.What_I_See().what != 1) {

                command.Shoot();
            }
            for (int x = 0; x < 3; x++) {
                if (command.What_I_See().what != 1) {

                    command.Shoot();
                }
                command.Move();
            }
            if (command.What_I_See().what != 1) {

                command.Shoot();
            }
            command.Rotate("RIGHT");
            if (command.What_I_See().what != 1) {

                command.Shoot();
            }
        }
    }
}