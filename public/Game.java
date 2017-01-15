
/*
utolsó dolgok amiken dolgoztunk:
Patrick: Rotate()
Ádám: n.a.
bug: End vector out of bounds


 */
package game;

import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.Vector;

class Player1 {

    public void run() {
        //player1 program
    }
}

class Player2 {

    public void run() {
        //player1 program
    }
}

public class Game {

    //enum Directions{UP,DOWN,LEFT,RIGHT};
    //enum Rotations{LEFT,RIGHT};
    public static class Love {

        private Love() {
        }
    }
    private static Love love = new Love();

    public static class Command {

        private int playerHp[] = {3, 3};
        private boolean firstThreadDone = false;
        private boolean secondThreadDone = false;

        public class Directions {

            public static final int UP = 0;
            public static final int RIGHT = 1;
            public static final int DOWN = 2;
            public static final int LEFT = 3;
        }

        public boolean getFirstThreadDone() {
            return firstThreadDone;
        }

        public boolean getSecondThreadDone() {
            return secondThreadDone;
        }

        Command() {
            set_map();
            player1X = 0;
            player1Y = 0;
            player1Direction = Directions.DOWN;
            player2X = MAP_SIZE - 1;
            player2Y = MAP_SIZE - 1;
            player2Direction = Directions.UP;
        }

        public void Wait() {
            while (turnEnded == false) {
                try {
                    TimeUnit.MILLISECONDS.sleep(5);
                } catch (InterruptedException ex) {
                    Logger.getLogger(Game.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
            currentRound++;
        }

        private class missile {

            public int X;
            public int Y;
            public int dir;
        };
        Vector<missile> missiles = new Vector<>();

        private boolean canMove(int currentDirection) {
            int playerX, playerY;
            if (Thread.currentThread().getName().equals("thread1")) {
                playerX = player1X;
                playerY = player1Y;
            } else {
                playerX = player2X;
                playerY = player2Y;
            }
            switch (currentDirection) {
                case Directions.UP:
                    switch (map.get(currentRound).get(playerX).get(playerY++)) {
                        case 0:
                            return false;
                        case 1:
                            return false;
                        case 2:
                            return false;
                        default:
                            return true;
                    }
                case Directions.DOWN:
                    switch (map.get(currentRound).get(playerX).get(playerY--)) {
                        case 0:
                            return false;
                        case 1:
                            return false;
                        case 2:
                            return false;
                        default:
                            return true;
                    }
                case Directions.RIGHT:
                    switch (map.get(currentRound).get(playerX++).get(playerY)) {
                        case 0:
                            return false;
                        case 1:
                            return false;
                        case 2:
                            return false;
                        default:
                            return true;
                    }
                case Directions.LEFT:
                    switch (map.get(currentRound).get(playerX--).get(playerY)) {
                        case 0:
                            return false;
                        case 1:
                            return false;
                        case 2:
                            return false;
                        default:
                            return true;
                    }
                default:
                    break;
            }
            return false;
        }

        public void Move() {
            //move current robot
            int currentDirection;
            if (Thread.currentThread().getName().equals("thread1")) {
                currentDirection = player1Direction;
            } else {
                currentDirection = player2Direction;
            }
            if (currentDirection == Directions.RIGHT && canMove(currentDirection)) {
                if (Thread.currentThread().getName().equals("thread1")) {
                    player1XNext = player1X + 1;
                } else {
                    player2XNext = player2X + 1;
                }
            } else if (currentDirection == Directions.LEFT && canMove(currentDirection)) {
                if (Thread.currentThread().getName().equals("thread1")) {
                    player1XNext = player1X - 1;
                } else {
                    player2XNext = player2X - 1;
                }
            } else if (currentDirection == Directions.UP && canMove(currentDirection)) {
                if (Thread.currentThread().getName().equals("thread1")) {
                    player1YNext = player1Y + 1;
                } else {
                    player2YNext = player2Y + 1;
                }
            } else if (currentDirection == Directions.DOWN && canMove(currentDirection)) {
                if (Thread.currentThread().getName().equals("thread1")) {
                    player1YNext = player1Y - 1;
                } else {
                    player2YNext = player2Y - 1;
                }
            }
            Wait();
        }

        public void Rotate(String direction) {
            if (Thread.currentThread().getName().equals("thread1")) {
                if (direction.equals("RIGHT")) {
                    if (player1Direction == Directions.LEFT) {
                        player1DirectionNext = player1Direction - 3;
                    } else {
                        player1DirectionNext = player1Direction++;
                    }
                } else if (direction.equals("LEFT")) {
                    if (player1Direction == Directions.UP) {
                        player1DirectionNext = player1Direction + 3;
                    } else {
                        player1DirectionNext = player1Direction--;
                    }
                }
            } else {
                if (direction.equals("RIGHT")) {
                    if (player2Direction == Directions.LEFT) {
                        player2DirectionNext = player2Direction - 3;
                    } else {
                        player2DirectionNext = player2Direction++;
                    }
                } else if (direction.equals("LEFT")) {
                    if (player2Direction == Directions.UP) {
                        player2DirectionNext = player2Direction + 3;
                    } else {
                        player2DirectionNext = player2Direction--;
                    }
                }
            }
            Wait();
        }

        public void Shoot() {
            //shoot with current robot
            Wait();
        }

        public int What_I_See() {
            if (Thread.currentThread().getName().equals("thread1")) {
                return getPlayer1See();
            } else if (Thread.currentThread().getName().equals("thread2")) {
                return getPlayer2See();
            }
            return 0; //no data yet
        }

        private boolean gameEnd = false;
        private int winner;
        private final int MAP_SIZE = 6;
        private int starting_map[][] = new int[MAP_SIZE][MAP_SIZE];
        private Vector<Vector<Vector<Integer>>> map = new Vector<Vector<Vector<Integer>>>();
        private int currentRound = 0;

        private int player1X;
        private int player1Y;
        private int player1Direction;
        private int player2X;
        private int player2Y;
        private int player2Direction;

        private int player1XNext;
        private int player1YNext;
        private int player1DirectionNext;
        private int player2XNext;
        private int player2YNext;
        private int player2DirectionNext;

        private void set_map() {
            int a[][] = {{0, 0, 0, 0, 0, 0}, {0, 1, 1, 0, 1, 1}, {0, 1, 0, 0, 0, 0}, {0, 0, 0, 0, 1, 0}, {1, 1, 0, 1, 1, 0}, {0, 0, 0, 0, 0, 0}};
            starting_map = a;
        }

        public int getPlayer1X() {
            return player1X;
        }

        public int getPlayer1Y() {
            return player1Y;
        }

        public int getPlayer1See() {
            return 0;
        }

        public int getPlayer2X() {
            return player2X;
        }

        public int getPlayer2Y() {
            return player2Y;
        }

        public int getPlayer2See() {
            return 0;
        }

        private void Damage(boolean player, int damage) {
            playerHp[(player) ? 1 : 0] -= damage;
            if (playerHp[(player) ? 1 : 0] <= 1) {
                Die(player);
            }
            return;
        }

        private void Die(boolean player) {
            /* Die */

            End(this);
        }

        public void end_turn(Game.Love l) {
            l.hashCode();

            int x_d[] = {-1, 0, 1, 0};
            int y_d[] = {0, -1, 0, 1};
            for (int x = 0; x < missiles.size(); x++) {
                if (starting_map[missiles.get(x).X + x_d[missiles.get(x).dir]][missiles.get(x).Y + y_d[missiles.get(x).dir]] == 0) {
                    starting_map[missiles.get(x).X][missiles.get(x).Y] = 0;
                    starting_map[missiles.get(x).X + x_d[missiles.get(x).dir]][missiles.get(x).Y + y_d[missiles.get(x).dir]] = 4;
                    missiles.get(x).X += x_d[missiles.get(x).dir];
                    missiles.get(x).Y += y_d[missiles.get(x).dir];

                } else {
                    if (starting_map[missiles.get(x).X + x_d[missiles.get(x).dir]][missiles.get(x).Y + y_d[missiles.get(x).dir]] == 2) {
                        Damage(false, 1);
                    }
                    if (starting_map[missiles.get(x).X + x_d[missiles.get(x).dir]][missiles.get(x).Y + y_d[missiles.get(x).dir]] == 3) {
                        Damage(true, 1);
                    }
                    if (starting_map[missiles.get(x).X + x_d[missiles.get(x).dir]][missiles.get(x).Y + y_d[missiles.get(x).dir]] == 4) {
                        for (int z = 0; z < missiles.size(); z++) {
                            if (missiles.get(z).X == missiles.get(x).X + x_d[missiles.get(x).dir] && missiles.get(z).Y == missiles.get(x).Y + y_d[missiles.get(x).dir]) {
                                missiles.remove(z);
                                if (z < x) {
                                    x--;
                                }
                            }
                        }
                    }
                    missiles.remove(x);
                    x--;
                }
            }

            turnEnded = true;
            firstThreadDone = false;
            secondThreadDone = false;

        }

        private boolean turnEnded;

    }

    public static class CreateThread extends Thread {

        private Thread t;
        private String threadName;
        Command command;

        CreateThread(String name, Command cmd) {
            threadName = name;
            command = cmd;
        }

        public void run() {
            synchronized (command) {
                if (Thread.currentThread().getName().equals("thread1")) {
                    Player1 player = new Player1();
                } else if (Thread.currentThread().getName().equals("thread2")) {
                    Player2 player = new Player2();
                }
                /*player.run();*/
            }
        }

        public void start() {
            if (t == null) {
                t = new Thread(this, threadName);
                t.start();
            }
        }
    }

    static void End(Command command) {

        for (int x = 0; x < 6; x++) {
            for (int y = 0; y < 6; y++) {
                System.out.print(command.map.get(x).get(y) + " ");
            }
            System.out.println();
        }
        System.exit(0);
    }

    public static void main(String[] args) {
        Command command = new Command();
        CreateThread thread1 = new CreateThread("thread1", command);
        CreateThread thread2 = new CreateThread("thread2", command);
        thread1.start();
        thread2.start();
        while (command.gameEnd == false) {
            command.turnEnded = false;
            try {
                TimeUnit.MILLISECONDS.sleep(1000);
            } catch (InterruptedException ex) {
                Logger.getLogger(Game.class.getName()).log(Level.SEVERE, null, ex);
            }
            if (command.getFirstThreadDone() == false) {
                if (command.getSecondThreadDone() == false) {
                    command.winner = 3;
                } else {
                    command.winner = 2;
                }
                End(command);
            }
            if (command.getSecondThreadDone() == false) {
                command.winner = 1;
                End(command);
            }
            command.end_turn(love);

        }
        End(command);

    }
}
