
/*
 utolsó dolgok amiken dolgoztunk:
 Patrick: Shoot()
 Ádám: n.a.
 bug: End vector out of bounds
 bool a move-nak
 egy mezőre lépés!
 */
package thread;

import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.Vector;

interface Player {

    void run(Game.Command command);
}

class Player1 implements Player {

    public void run(Game.Command command) {
        if (command.What_I_See().what == 3) {
            command.Shoot();
        }
        command.Rotate("LEFT");
        if (command.What_I_See().what == 3) {
            command.Shoot();
        }
        for (int x = 0; x < 3; x++) {
            if (command.What_I_See().what == 3) {
                command.Shoot();
            }
            command.Move();
        }
        if (command.What_I_See().what == 3) {
            command.Shoot();
        }
        command.Rotate("RIGHT");
        if (command.What_I_See().what == 3) {
            command.Shoot();
        }
        for (int x = 0; x < 2; x++) {
            command.Move();
            if (command.What_I_See().what == 3) {
                command.Shoot();
            }
        }
        if (command.What_I_See().what == 3) {
            command.Shoot();
        }
        command.Rotate("LEFT");
        if (command.What_I_See().what == 3) {
            command.Shoot();
        }
        for (int x = 0; x < 2; x++) {
            if (command.What_I_See().what == 3) {
                command.Shoot();
            }
            command.Move();
        }
        if (command.What_I_See().what == 3) {
            command.Shoot();
        }
        command.Rotate("RIGHT");
        if (command.What_I_See().what == 3) {
            command.Shoot();
        }
        for (int x = 0; x < 3; x++) {
            if (command.What_I_See().what == 3) {
                command.Shoot();
            }
            command.Move();
        }
        if (command.What_I_See().what == 3) {
            command.Shoot();
        }
        command.Rotate("RIGHT");
        if (command.What_I_See().what == 3) {
            command.Shoot();
        }
        for (int x = 0; x < 3; x++) {
            if (command.What_I_See().what == 3) {
                command.Shoot();
            }
            command.Move();
        }
        if (command.What_I_See().what == 3) {
            command.Shoot();
        }
        command.Rotate("RIGHT");
        if (command.What_I_See().what == 3) {
            command.Shoot();
        }
        while (true) {
            if (command.What_I_See().what == 3) {
                command.Shoot();
            }
            for (int x = 0; x < 3; x++) {
                if (command.What_I_See().what == 3) {
                    command.Shoot();
                }
                command.Move();
            }
            if (command.What_I_See().what == 3) {
                command.Shoot();
            }
            command.Rotate("RIGHT");
            if (command.What_I_See().what == 3) {
                command.Shoot();
            }
        }

        //player1 program
    }
}

class Player2 implements Player {

    public void run(Game.Command command) {

        while (true) {
            command.What_I_See();
            if (command.What_I_See().what != 1) {
                command.Shoot();
                continue;
            }
            if (command.What_I_See().howFar == 1) {
                command.Rotate("RIGHT");
                continue;
            }
            command.Move();
            //player1 program
        }
    }
}

public class Game {

    //enum Directions{UP,DOWN,LEFT,RIGHT};
    //enum Rotations{LEFT,RIGHT};
    public static class Love {

        private Love() {
        }
    }

    public static class see {

        public int what;
        public int howFar;

        public see(int a, int b) {
            what = b;
            howFar = a;
        }
    }

    private static Love love = new Love();

    public static class Command {

        private int playerHp[] = {3, 3};
        private boolean firstThreadDone = false;
        private boolean secondThreadDone = false;

        private boolean gameEnd = false;
        private int winner;
        private int MAP_SIZE = 6;
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

        private boolean player1IsShooting = false;
        private boolean player2IsShooting = false;
        private Vector<missile> missiles = new Vector<>();

        private boolean turnEnded;

        private int y_d[] = {0, 1, 0, -1};
        private int x_d[] = {-1, 0, 1, 0};

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
            player1DirectionNext = Directions.DOWN;
            MAP_SIZE = 6;
            player2X = MAP_SIZE - 1;
            player2Y = MAP_SIZE - 1;
            player2Direction = Directions.UP;
            player2DirectionNext = Directions.UP;

        }

        public void Wait() {
            System.out.println("Before");
            if (isPlayer1FromThread()) {
                firstThreadDone = true;
                System.out.println("firstThreadDone");

                while (firstThreadDone == true) {
                    //System.out.println("Inside");
                    try {
                        TimeUnit.MILLISECONDS.sleep(5);
                    } catch (InterruptedException ex) {
                        Logger.getLogger(Game.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
            } else {
                secondThreadDone = true;
                System.out.println("secondThreadDone");
                while (secondThreadDone == true) {
                    //System.out.println("Inside");
                    try {
                        TimeUnit.MILLISECONDS.sleep(5);
                    } catch (InterruptedException ex) {
                        Logger.getLogger(Game.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
            }
            System.out.println("After");
        }

        private class missile {

            public int X;
            public int Y;
            public int dir;
            public String player;
        }

        private boolean canMove(int currentDirection) {
            int playerX, playerY;
            if (isPlayer1FromThread()) {
                playerX = player1X;
                playerY = player1Y;
            } else {
                playerX = player2X;
                playerY = player2Y;
            }
            int new_x = playerX + x_d[currentDirection];
            int new_y = playerY + y_d[currentDirection];
            if (new_x >= MAP_SIZE || new_x < 0) {
                return false;
            }
            if (new_y >= MAP_SIZE || new_y < 0) {
                return false;
            }
            return map.get(currentRound).get(new_x).get(new_y) != 1;
        }

        public boolean Move() {
            //move current robot
            int currentDirection;
            System.out.println("Move!1");
            if (isPlayer1FromThread()) {
                System.out.println("Move!1_1 " + player1Direction);
                currentDirection = player1Direction;
            } else {
                System.out.println("Move!1_2 " + player2Direction);
                currentDirection = player2Direction;
            }
            System.out.println("Move!2");
            if (canMove(currentDirection)) {
                System.out.println("Move!3");
                if (isPlayer1FromThread()) {
                    player1XNext = player1X + x_d[currentDirection];
                    player1YNext = player1Y + y_d[currentDirection];
                    System.out.println("Move!3_1 " + player1XNext + " " + player1YNext);
                } else if (Thread.currentThread().getName().equals("thread2")) {
                    player2XNext = player2X + x_d[currentDirection];
                    player2YNext = player2Y + y_d[currentDirection];
                    System.out.println("Move!3_2 " + player2XNext + " " + player2YNext);
                }
            }
            System.out.println("Move!4");
            Wait();
            if (player1XNext == player2XNext && player1YNext == player2YNext) {
                return false;
            } else {
                return true;
            }
        }

        public void Rotate(String direction) {
            int rotation;
            if (direction.equals("RIGHT")) {
                rotation = 1;
            } else {
                rotation = -1;
            }
            if (isPlayer1FromThread()) {
                player1DirectionNext = (player1Direction + rotation + 4) % 4;
            } else {
                player2DirectionNext = (player2Direction + rotation + 4) % 4;
            }
            Wait();
        }

        public void Shoot() {
            //shoot with current robot
            if (isPlayer1FromThread()) {
                player1IsShooting = true;
            } else if (Thread.currentThread().getName().equals("thread2")) {
                player2IsShooting = true;
            }
            Wait();
        }

        public see What_I_See() {
            if (isPlayer1FromThread()) {
                return player1See;
            } else if (Thread.currentThread().getName().equals("thread2")) {
                return player2See;
            }
            return new see(0, 0); //no data yet
        }

        private boolean isPlayer1FromThread() {
            return Thread.currentThread().getName().equals("thread1");
        }

        private void set_map() {
            int a[][] = {{0, 0, 0, 0, 0, 0}, {0, 1, 1, 0, 1, 1}, {0, 1, 0, 0, 0, 0}, {0, 0, 0, 0, 1, 0}, {1, 1, 0, 1, 1, 0}, {0, 0, 0, 0, 0, 0}};
            starting_map = a;
            map.add(new Vector<Vector<Integer>>());
            for (int x = 0; x < MAP_SIZE; x++) {
                map.get(0).add(new Vector<Integer>());
            }
            for (int x = 0; x < MAP_SIZE; x++) {
                for (int y = 0; y < MAP_SIZE; y++) {
                    map.get(0).get(x).add(a[x][y]);
                }
            }
            map.get(0).get(player1X).set(player1Y, 2);
            map.get(0).get(MAP_SIZE - 1).set(MAP_SIZE - 1, 3);
        }

        public int getPlayerX() {
            if (isPlayer1FromThread()) {
                return player1X;
            } else {
                return player2X;
            }
        }

        public int getPlayerY() {
            if (isPlayer1FromThread()) {
                return player1Y;
            } else {
                return player2Y;
            }
        }

        public int[][] getStartingMap() {
            return starting_map;
        }

        see player1See;
        see player2See;

        public void getPlayer1See() {
            int distance = 1;
            int new_x;
            int new_y;
            while (true) {
                distance++;
                System.out.println(distance);
                new_x = player1X + x_d[player1Direction] * distance;
                new_y = player1Y + y_d[player1Direction] * distance;
                if (new_x >= MAP_SIZE || new_x < 0) {
                    player1See = new see(distance, 1);
                    return;
                }
                if (new_y >= MAP_SIZE || new_y < 0) {
                    player1See = new see(distance, 1);
                    return;
                }
                if (map.get(currentRound).get(new_x).get(new_y) != 0) {
                    if (map.get(currentRound).get(new_x).get(new_y) == 3) {
                        player1See = new see(distance, 2);
                        return;
                    }
                    player1See = new see(distance, map.get(currentRound).get(new_x).get(new_y));
                    return;
                }
            }
        }

        public void getPlayer2See() {
            int distance = 1;
            int new_x;
            int new_y;
            while (true) {
                distance++;
                new_x = player2X + x_d[player2Direction] * distance;
                new_y = player2Y + y_d[player2Direction] * distance;
                if (new_x >= MAP_SIZE || new_x < 0) {
                    player2See = new see(distance, 1);
                    return;
                }
                if (new_y >= MAP_SIZE || new_y < 0) {
                    player2See = new see(distance, 1);
                    return;
                }
                if (map.get(currentRound).get(new_x).get(new_y) != 0) {
                    player2See = new see(distance, map.get(currentRound).get(new_x).get(new_y));
                    return;
                }
            }
        }

        private void Damage(boolean player, int damage) {
            playerHp[(player) ? 1 : 0] -= damage;
            return;
        }

        public void end_turn(Game.Love l) {
            l.hashCode();
            map.add(new Vector<Vector<Integer>>(map.get(map.size() - 1)));
               System.out.println("missile: "+missiles.size()+" Health: "+playerHp[0]);
               for (int x = 0; x < MAP_SIZE; x++) {
                for (int y = 0; y < MAP_SIZE; y++) {
                    System.out.print(map.get(currentRound).get(x).get(y) + " ");
                }
                System.out.println();
            }
            System.out.println();
               
            for (int x = 0; x < missiles.size(); x++) {
                map.get(currentRound + 1).get(missiles.get(x).X).set(missiles.get(x).Y, 0);
                if (missiles.get(x).X + x_d[missiles.get(x).dir] >= 0 && missiles.get(x).X + x_d[missiles.get(x).dir] < MAP_SIZE && missiles.get(x).Y + y_d[missiles.get(x).dir] >= 0 && missiles.get(x).Y + y_d[missiles.get(x).dir] < MAP_SIZE) {

                    if (map.get(currentRound + 1).get(missiles.get(x).X + x_d[missiles.get(x).dir]).get(missiles.get(x).Y + y_d[missiles.get(x).dir]) == 0) {

                        map.get(currentRound + 1).get(missiles.get(x).X + x_d[missiles.get(x).dir]).set(missiles.get(x).Y + y_d[missiles.get(x).dir], 4);
                        missiles.get(x).X += x_d[missiles.get(x).dir];
                        missiles.get(x).Y += y_d[missiles.get(x).dir];

                    } else {
                        switch (map.get(currentRound + 1).get(missiles.get(x).X + x_d[missiles.get(x).dir]).get(missiles.get(x).Y + y_d[missiles.get(x).dir])) {
                            case 1:
                                break;
                            case 2:
                                Damage(false, 1);System.out.println("whut0");
                                break;
                            case 3:
                                Damage(true, 1);System.out.println("whut0");
                                break;
                            case 4:
                                for (int z = 0; z < missiles.size(); z++) {
                                    if (x != z && (missiles.get(z).X + x_d[missiles.get(z).dir] == missiles.get(x).X + x_d[missiles.get(x).dir] && missiles.get(z).Y + y_d[missiles.get(z).dir] == missiles.get(x).Y + y_d[missiles.get(x).dir])) {
                                       
                                        map.get(currentRound + 1).get(missiles.get(z).X + x_d[missiles.get(z).dir]).set(missiles.get(z).Y + y_d[missiles.get(z).dir], 5);
                                        missiles.remove(z);
                                        if (z < x) {
                                            x--;
                                        }
                                        break;
                                    }
                                }
                            case 5:
                                break;
                        }

                        missiles.remove(x);
                        x--;
                    }
                } else {

                    missiles.remove(x);
                    x--;
                }
            }

            if (player1IsShooting) {
                switch (map.get(currentRound + 1).get(player1X + x_d[player1Direction]).get(player1Y + y_d[player1Direction])) {
                    case 0:
                        missiles.add(new missile());
                        missiles.get(missiles.size() - 1).X = player1X + x_d[player1Direction];
                        missiles.get(missiles.size() - 1).Y = player1Y + y_d[player1Direction];
                        missiles.get(missiles.size() - 1).dir = player1Direction;
                        map.get(currentRound + 1).get(player1X + x_d[player1Direction]).set(player1Y + y_d[player1Direction], 4);
                        break;
                    case 2:
                        Damage(true, 1);System.out.println("whut1");
                        break;
                    case 3:
                        Damage(false, 1);System.out.println("whut1");
                        break;
                    case 4:
                        for (int z = 0; z < missiles.size(); z++) {
                            if (missiles.get(z).X + x_d[missiles.get(z).dir] == player1X + x_d[player1Direction] && missiles.get(z).Y + y_d[missiles.get(z).dir] == player1Y + y_d[player1Direction]) {
                                missiles.remove(z);
                                map.get(currentRound + 1).get(missiles.get(z).X + x_d[missiles.get(z).dir]).set(missiles.get(z).Y + y_d[missiles.get(z).dir], 5);
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
            if (player2IsShooting) {
                switch (map.get(currentRound + 1).get(player2X + x_d[player2Direction]).get(player2Y + y_d[player2Direction])) {
                    case 0:
                        missiles.add(new missile());
                        missiles.get(missiles.size() - 1).X = player2X + x_d[player2Direction];
                        missiles.get(missiles.size() - 1).Y = player2Y + y_d[player2Direction];
                        missiles.get(missiles.size() - 1).dir = player2Direction;
                        map.get(currentRound + 1).get(player2X + x_d[player2Direction]).set(player2Y + y_d[player2Direction], 4);
                        break;
                    case 2:
                        Damage(true, 1);System.out.println("whut2");
                        break;
                    case 3:
                        Damage(false, 1);System.out.println("whut2");
                        break;
                    case 4:
                        for (int z = 0; z < missiles.size(); z++) {
                            if (missiles.get(z).X + x_d[missiles.get(z).dir] == player2X + x_d[player2Direction] && missiles.get(z).Y + y_d[missiles.get(z).dir] == player2Y + y_d[player2Direction]) {
                                missiles.remove(z);
                                map.get(currentRound + 1).get(missiles.get(z).X + x_d[missiles.get(z).dir]).set(missiles.get(z).Y + y_d[missiles.get(z).dir], 5);
                            }
                        }
                        break;
                    default:
                        break;
                }
            }

            System.out.println(player1X + " " + player1Y + " " + player1XNext + " " + player1YNext);
            if (player1XNext == player2XNext && player1YNext == player2YNext) {
                player1XNext = player1X;
                player2XNext = player2X;
                player1YNext = player1Y;
                player2YNext = player2Y;
            }
            if (map.get(currentRound + 1).get(player1XNext).get(player1YNext) == 4) {
                for (int z = 0; z < missiles.size(); z++) {
                    if (missiles.get(z).X + x_d[missiles.get(z).dir] == player1XNext && missiles.get(z).Y + y_d[missiles.get(z).dir] == player1YNext) {
                        missiles.remove(z);
                    }
                }
                Damage(false, 1);System.out.println("whut5");
            }
            if (map.get(currentRound + 1).get(player2XNext).get(player2YNext) == 4) {
                for (int z = 0; z < missiles.size(); z++) {
                    if (missiles.get(z).X + x_d[missiles.get(z).dir] == player2XNext && missiles.get(z).Y + y_d[missiles.get(z).dir] == player2YNext) {
                        missiles.remove(z);
                    }
                }
                Damage(true, 1);System.out.println("whut5");
            }
            if (map.get(currentRound + 1).get(player1XNext).get(player1YNext) == 5) {
                Damage(false, 1);System.out.println("whut5");
            }
            if (map.get(currentRound + 1).get(player2XNext).get(player2YNext) == 5) {
                Damage(true, 1);System.out.println("whut5");
            }

            map.get(currentRound + 1).get(player1X).set(player1Y, 0);
            map.get(currentRound + 1).get(player2X).set(player2Y, 0);
            player1X = player1XNext;
            player2X = player2XNext;
            player1Y = player1YNext;
            player2Y = player2YNext;
            player1Direction = player1DirectionNext;
            player2Direction = player2DirectionNext;
            map.get(currentRound + 1).get(player1X).set(player1Y, 2);
            map.get(currentRound + 1).get(player2X).set(player2Y, 3);

            for (int x = 0; x < map.get(currentRound + 1).size(); x++) {
                for (int y = 0; y < map.get(currentRound + 1).get(0).size(); y++) {
                    if (map.get(currentRound + 1).get(x).get(y) == 5) {
                        map.get(currentRound + 1).get(x).set(y, 0);
                    }
                }
            }

            getPlayer1See();
            getPlayer2See();

            if(playerHp[0]==0){
                if(playerHp[1]==0){
                winner=3;
                End(this);
                }else{
                winner=2;
                End(this);
                }
            }else{
                if(playerHp[1]==0){
            winner=1;System.out.println("www");
            End(this);
                }
            }
            
            
            turnEnded = true;
            firstThreadDone = false;
            secondThreadDone = false;
            player1IsShooting = false;
            player2IsShooting = false;
            currentRound++;

        }

    }

    //<editor-fold defaultstate="collapsed" desc="Creating Thread class">
    public static class CreateThread extends Thread {

        private Thread t;
        private String threadName;
        Command command;

        CreateThread(String name, Command cmd) {
            threadName = name;
            command = cmd;
        }

        public void run() {
            Player player;
            if (Thread.currentThread().getName().equals("thread1")) {
                player = new Player1();
                System.out.println("Player1 start!");
                player.run(command);
            } else if (Thread.currentThread().getName().equals("thread2")) {
                player = new Player2();
                System.out.println("Player2 start!");
                player.run(command);
            }
        }

        public void start() {
            if (t == null) {
                t = new Thread(this, threadName);
                t.start();
            }
        }
    }
//</editor-fold>

    static void End(Command command) {
        System.out.println(command.winner);
        for (int i = 0; i < command.map.size(); i++) {
            for (int x = 0; x < command.MAP_SIZE; x++) {
                for (int y = 0; y < command.MAP_SIZE; y++) {
                    System.out.print(command.map.get(i).get(x).get(y) + " ");
                }
                System.out.println();
            }
            System.out.println();
        }
        System.exit(0);
    }

    public static void main(String[] args) {
        Command command = new Command();
        command.getPlayer1See();
        System.out.println("a");
        command.getPlayer2See();
        CreateThread thread1 = new CreateThread("thread1", command);
        CreateThread thread2 = new CreateThread("thread2", command);
        thread1.start();
        thread2.start();

        while (command.gameEnd == false) {
            command.turnEnded = false;
            for (int x = 0; x < 5000; x++) {
                try {
                    TimeUnit.MILLISECONDS.sleep(1);
                } catch (InterruptedException ex) {
                    Logger.getLogger(Game.class.getName()).log(Level.SEVERE, null, ex);
                }
                if (command.getFirstThreadDone() == true && command.getSecondThreadDone() == true) {
                    break;
                }
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
            if (command.currentRound == 300) {
                command.winner = 3;
                End(command);
            }
            command.end_turn(love);

        }
        End(command);   

    }
}



