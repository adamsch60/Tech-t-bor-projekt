package src.game;

import java.io.FilePermission;
import java.lang.reflect.Constructor;
import java.net.URL;
import java.net.URLClassLoader;
import java.security.AllPermission;
import java.security.Permission;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.Vector;
import src.game.Game.Command.MySecurityManager;

public class Game {

    public static class Love {

        private Love() {
        }
    }

    private static Love love = new Love();

    public static class Command implements PlayerCommands {

        private int playerHp[] = {3, 3};
        private boolean firstThreadDone = false;
        private boolean secondThreadDone = false;

        private boolean gameEnd = false;
        private int winner;
        private int MAP_SIZE = 6;
        private int starting_map[][] = new int[MAP_SIZE][MAP_SIZE];
        private static Vector<Vector<Vector<Integer>>> map = new Vector<Vector<Vector<Integer>>>();
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
        private List<Integer[]> muzzle = new ArrayList<>();
        

        private boolean turnEnded;

        private int y_d[] = {0, 1, 0, -1};
        private int x_d[] = {-1, 0, 1, 0};

        public boolean getFirstThreadDone() {
            return firstThreadDone;
        }

        public boolean getSecondThreadDone() {
            return secondThreadDone;
        }

        Command() {
            player1X = 0;
            player1Y = 0;
            player1XNext = 0;
            player1YNext = 0;
            player1Direction = Directions.DOWN;
            player1DirectionNext = Directions.DOWN;
            MAP_SIZE = 6;
            player2X = MAP_SIZE - 1;
            player2Y = MAP_SIZE - 1;
            player2XNext = MAP_SIZE - 1;
            player2YNext = MAP_SIZE - 1;
            player2Direction = Directions.UP;
            player2DirectionNext = Directions.UP;
            set_map();
        }

        @Override
        public void Wait() {
            if (isPlayer1FromThread()) {
                firstThreadDone = true;

                while (firstThreadDone == true) {
                    //System.err.println("Inside");
                    try {
                        TimeUnit.MILLISECONDS.sleep(5);
                    } catch (InterruptedException ex) {
                        Logger.getLogger(Game.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
            } else {
                secondThreadDone = true;
                while (secondThreadDone == true) {
                    //System.err.println("Inside");
                    try {
                        TimeUnit.MILLISECONDS.sleep(5);
                    } catch (InterruptedException ex) {
                        Logger.getLogger(Game.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
            }
        }

        private class missile {

            public int X;
            public int Y;
            public int dir;
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
            int currentDirection;
            if (isPlayer1FromThread()) {
                currentDirection = player1Direction;
            } else {
                currentDirection = player2Direction;
            }
            if (canMove(currentDirection)) {
                if (isPlayer1FromThread()) {
                    player1XNext = player1X + x_d[currentDirection];
                    player1YNext = player1Y + y_d[currentDirection];
                } else if (isPlayer2FromThread()) {
                    player2XNext = player2X + x_d[currentDirection];
                    player2YNext = player2Y + y_d[currentDirection];
                }
            }
            
            if(isPlayer1FromThread()) {
                System.err.println("Player1 is Moving");
                System.err.println("Player1 at moving sees: "+player1See.what);
            } else {
                System.err.println("Player2 is Moving");
                System.err.println("Player2 at moving sees: "+player2See.what);
            }
            
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
            
            if(isPlayer1FromThread()) {
                System.err.println("Player1 is Rotating");
            } else {
                System.err.println("Player2 is Rotating");
            }
            
            Wait();
        }

        public void Shoot() {
            //shoot with current robot
            if (isPlayer1FromThread()) {
                player1IsShooting = true;
            } else if (isPlayer2FromThread()) {
                player2IsShooting = true;
            }
            int currentDirection;
            if (isPlayer1FromThread()) {
                currentDirection = player1Direction;
            } else {
                currentDirection = player2Direction;
            }
            
            if(isPlayer1FromThread()) {
                System.err.println("Player1 is Shooting");
            } else {
                System.err.println("Player2 is Shooting");
            }
            
            muzzle.get(currentRound)[(isPlayer1FromThread()?4:0)+currentDirection]=1;

            Wait();
        }

        public see What_I_See() {
            int what;
            int howFar;
            if (isPlayer1FromThread()) {
                what = player1See.what;
                howFar = player1See.howFar;
                return new see(howFar,what);
            } else if (isPlayer2FromThread()) {
                what = player2See.what;
                howFar = player2See.howFar;
                return new see(howFar,what);
            }
            return new see(0, 0); //no data yet
        }
        
        public int getHealth() {
            if(isPlayer1FromThread()) {
                return playerHp[0];
            } else if(isPlayer2FromThread()) {
                return playerHp[1];
            }
            return -1;
        }

        private static boolean isPlayer1FromThread() {
            return Thread.currentThread().getName().equals("thread1");
        }
        
        private static boolean isPlayer2FromThread() {
            return Thread.currentThread().getName().equals("thread2");
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
            map.get(0).get(player2X).set(player2Y, 3);
            getPlayer1See();
            getPlayer2See();
            muzzle.add(new Integer[]{0,0,0,0,0,0,0,0});
        }

        public int getPlayerX() {
            if (isPlayer1FromThread()) {
                return player1X;
            } else {
                return MAP_SIZE-player2X-1;
            }
        }

        public int getPlayerY() {
            if (isPlayer1FromThread()) {
                return player1Y;
            } else {
                return MAP_SIZE-player2Y-1;
            }
        }

        public int getPlayerDirection() {
            if (isPlayer1FromThread()) {
                return player1Direction;
            } else {
                int temp=(player2Direction-2);
                if(temp>0)temp+=4;
                return temp;
            }
        }

        public int[][] getStartingMap() {
            return starting_map;
        }

        see player1See;
        see player2See;

        private void getPlayer1See() {
            int distance = 0;
            int new_x;
            int new_y;
            while (true) {
                distance++;
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
                if(currentRound == 0) {
                    if (map.get(currentRound).get(new_x).get(new_y) != 0) {
                        if (map.get(currentRound).get(new_x).get(new_y) == 3) {
                            player1See = new see(distance, 2);
                            return;
                        }
                        player1See = new see(distance, map.get(currentRound).get(new_x).get(new_y));
                        return;
                    }
                } else {
                    if (map.get(currentRound+1).get(new_x).get(new_y) != 0) {
                        if (map.get(currentRound+1).get(new_x).get(new_y) == 3) {
                            player1See = new see(distance, 2);
                            return;
                        }
                        player1See = new see(distance, map.get(currentRound+1).get(new_x).get(new_y));
                        return;
                    }
                }
            }
        }

        private void getPlayer2See() {
            int distance = 0;
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
                if(currentRound == 0) {
                    if (map.get(currentRound).get(new_x).get(new_y) != 0) {
                        player2See = new see(distance, map.get(currentRound).get(new_x).get(new_y));
                        return;
                    }
                } else {
                    if (map.get(currentRound+1).get(new_x).get(new_y) != 0) {
                        player2See = new see(distance, map.get(currentRound+1).get(new_x).get(new_y));
                        return;
                    }
                }
            }
        }

        private void Damage(boolean player, int damage) {
            playerHp[(player) ? 1 : 0] -= damage;
        }

        public void end_turn(Game.Love l) {
            l.hashCode();
            
            //<editor-fold defaultstate="collapsed" desc="Adding next map">
            map.add(new Vector<Vector<Integer>>());
            for (int x = 0; x < MAP_SIZE; x++) {
                map.get(map.size()-1).add(new Vector<Integer>());
            }
            for (int x = 0; x < MAP_SIZE; x++) {
                for (int y = 0; y < MAP_SIZE; y++) {
                    map.get(map.size()-1).get(x).add(0+map.get(map.size()-2).get(x).get(y));
                }
            }
            muzzle.add(new Integer[]{0,0,0,0,0,0,0,0});
            //</editor-fold>
            
            //<editor-fold defaultstate="collapsed" desc="Writing out err message (map layout 1.pt)">
            System.err.println("Current round is: "+currentRound);
            System.err.println("Player1 sees this: "+player1See.what);
            System.err.println("Player2 sees this: "+player2See.what);
            System.err.println("Health1: " + playerHp[0] + " Player1 direction: "+player1Direction);
            System.err.println("Health2: "+playerHp[1] + " Player2 direction: "+player2Direction);
            System.err.println("missile: " + missiles.size());
            System.err.print("Missiles are { ");
            for(int x=0;x<missiles.size();x++) {
                System.err.print(missiles.get(x).X+" "+missiles.get(x).Y+" "+missiles.get(x).dir+"; ");
            }
            System.err.println("}");
            for (int x = 0; x < MAP_SIZE; x++) {
                for (int y = 0; y < MAP_SIZE; y++) {
                    System.err.print(map.get(currentRound).get(x).get(y) + " ");
                }
                System.err.println();
            }
            System.err.println();
            //</editor-fold>
            
            //<editor-fold defaultstate="collapsed" desc="Missile movement">
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
                                System.err.println("Missile collides with the wall");
                                System.err.println(missiles.get(x).X+" "+missiles.get(x).Y);
                                System.err.println(missiles.get(x).X + x_d[missiles.get(x).dir]+" "+missiles.get(x).Y + y_d[missiles.get(x).dir]);
                                break;
                            case 2:
                                System.err.println("Damage case 2(missile movement)");
                                if(player1IsShooting && missiles.get(x).X + x_d[missiles.get(x).dir] == player1X && missiles.get(x).Y + y_d[missiles.get(x).dir] == player1Y) {
                                    player1IsShooting = false;
                                } else {
                                    Damage(false, 1);
                                    System.err.println("missile hit player1");
                                }
                                break;
                            case 3:
                                System.err.println("Damage case 3(missile movement)");
                                if(player2IsShooting && missiles.get(x).X + x_d[missiles.get(x).dir] == player2X && missiles.get(x).Y + y_d[missiles.get(x).dir] == player2Y) {
                                    player2IsShooting = false;
                                } else {
                                    Damage(true, 1);
                                    System.err.println("missile hit player2");
                                }
                                break;
                            case 4:
                                System.err.println("Missiles collide!");
                                for (int z = 0; z < missiles.size(); z++) {
                                    if (x != z && (missiles.get(z).X == missiles.get(x).X + x_d[missiles.get(x).dir] && missiles.get(z).Y == missiles.get(x).Y + y_d[missiles.get(x).dir])) {
                                        map.get(currentRound + 1).get(missiles.get(x).X + x_d[missiles.get(x).dir]).set(missiles.get(x).Y + y_d[missiles.get(x).dir], 5);
                                        missiles.remove(z);
                                        if (z < x) {
                                            x--;
                                        }
                                        break;
                                    }
                                }
                            case 5:
                                System.err.println("Another missile collides");
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
//</editor-fold>

            //<editor-fold defaultstate="collapsed" desc="Player movements">
            if ((player1XNext == player2XNext && player1YNext == player2YNext) || (player1XNext == player2X && player1YNext == player2Y && player2XNext == player1X && player2YNext == player1Y)) {
                player1XNext = player1X;
                player2XNext = player2X;
                player1YNext = player1Y;
                player2YNext = player2Y;
            }
            if (map.get(currentRound + 1).get(player1XNext).get(player1YNext) == 4) {
                for (int z = 0; z < missiles.size(); z++) {
                    if (missiles.get(z).X == player1XNext && missiles.get(z).Y == player1YNext) {
                        missiles.remove(z);
                    }
                }
                Damage(false, 1);
                System.err.println("player1 stepped in missile");
            }
            if (map.get(currentRound + 1).get(player2XNext).get(player2YNext) == 4) {
                for (int z = 0; z < missiles.size(); z++) {
                    if (missiles.get(z).X == player2XNext && missiles.get(z).Y == player2YNext) {
                        missiles.remove(z);
                    }
                }
                Damage(true, 1);
                System.err.println("player2 stepped in missile");
            }
            if (map.get(currentRound + 1).get(player1XNext).get(player1YNext) == 5) {
                Damage(false, 1);
                System.err.println("player1 stepped in missile collision");
            }
            if (map.get(currentRound + 1).get(player2XNext).get(player2YNext) == 5) {
                Damage(true, 1);
                System.err.println("player2 stepped in missile collision");
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
//</editor-fold>
            
            //<editor-fold defaultstate="collapsed" desc="Players shooting">
            if(player1IsShooting && player2IsShooting && player1X + x_d[player1Direction] == player2X && player1Y + y_d[player1Direction] == player2Y && player2X + x_d[player2Direction] == player1X && player2Y + y_d[player2Direction] == player1Y) {
                //they deflected each other
            } else {
                //<editor-fold defaultstate="collapsed" desc="Player1 shooting">
            if (player1IsShooting) {
                if(player1X + x_d[player1Direction] < 0 || player1X + x_d[player1Direction] >= MAP_SIZE || player1Y + y_d[player1Direction] < 0 || player1Y + y_d[player1Direction] >= MAP_SIZE) {
                    //out of bounds
                } else {
                    switch (map.get(currentRound + 1).get(player1X + x_d[player1Direction]).get(player1Y + y_d[player1Direction])) {
                        case 0:
                            missiles.add(new missile());
                            missiles.get(missiles.size() - 1).X = player1X + x_d[player1Direction];
                            missiles.get(missiles.size() - 1).Y = player1Y + y_d[player1Direction];
                            missiles.get(missiles.size() - 1).dir = player1Direction;
                            map.get(currentRound + 1).get(player1X + x_d[player1Direction]).set(player1Y + y_d[player1Direction], 4);
                            break;
                        case 2:
                            Damage(false, 1);
                            System.err.println("player1 shot himself in the face");
                            break;
                        case 3:
                            Damage(true, 1);
                            System.err.println("player1 shot player2 in the face");
                            break;
                        case 4:
                            for (int z = 0; z < missiles.size(); z++) {
                                if (missiles.get(z).X == player1X + x_d[player1Direction] && missiles.get(z).Y == player1Y + y_d[player1Direction]) {
                                    map.get(currentRound + 1).get(player1X + x_d[player1Direction]).set(player1Y + y_d[player1Direction], 5);
                                    missiles.remove(z);
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
//</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Player2 shooting">
            if (player2IsShooting) {
                if(player2X + x_d[player2Direction] < 0 || player2X + x_d[player2Direction] >= MAP_SIZE || player2Y + y_d[player2Direction] < 0 || player2Y + y_d[player2Direction] >= MAP_SIZE) {
                    //out of bounds
                } else {
                    switch (map.get(currentRound + 1).get(player2X + x_d[player2Direction]).get(player2Y + y_d[player2Direction])) {
                        case 0:
                            missiles.add(new missile());
                            missiles.get(missiles.size() - 1).X = player2X + x_d[player2Direction];
                            missiles.get(missiles.size() - 1).Y = player2Y + y_d[player2Direction];
                            missiles.get(missiles.size() - 1).dir = player2Direction;
                            map.get(currentRound + 1).get(player2X + x_d[player2Direction]).set(player2Y + y_d[player2Direction], 4);
                            break;
                        case 2:
                            Damage(false, 1);
                            System.err.println("player2 shot player1 in the face");
                            break;
                        case 3:
                            Damage(true, 1);
                            System.err.println("player2 shot himself in the face");
                            break;
                        case 4:
                            for (int z = 0; z < missiles.size(); z++) {
                                if (missiles.get(z).X == player2X + x_d[player2Direction] && missiles.get(z).Y == player2Y + y_d[player2Direction]) {
                                    map.get(currentRound + 1).get(player2X + x_d[player2Direction]).set(player2Y + y_d[player2Direction], 5);
                                    missiles.remove(z);
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
//</editor-fold>
            }
            
            //</editor-fold>

            for (int x = 0; x < map.get(currentRound + 1).size(); x++) {
                for (int y = 0; y < map.get(currentRound + 1).get(0).size(); y++) {
                    if (map.get(currentRound + 1).get(x).get(y) == 5) {
                        map.get(currentRound + 1).get(x).set(y, 0);
                    }
                }
            }
            
            //<editor-fold defaultstate="collapsed" desc="Writing out err message (map layout 2.pt)">
            System.err.println("New Map: ");
            for (int x = 0; x < MAP_SIZE; x++) {
                for (int y = 0; y < MAP_SIZE; y++) {
                    System.err.print(map.get(currentRound+1).get(x).get(y) + " ");
                }
                System.err.println();
            }
            System.err.println("Player1 now sees: "+player1See.what);
            System.err.println("Player2 now sees: "+player2See.what);
            getPlayer1See();
            getPlayer2See();
            System.err.println("Player1 now sees: "+player1See.what);
            System.err.println("Player2 now sees: "+player2See.what);
            System.err.println();
            System.err.println();
            //</editor-fold>

            if(playerHp[0]<=0){
                if(playerHp[1]<=0){
                winner=3;
                End(this);
                }else{
                winner=2;
                End(this);
                }
            }else{
                if(playerHp[1]<=0){
            winner=1;System.err.println("www");
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
        
        static class MySecurityManager extends SecurityManager {
            private Object secret;
            public MySecurityManager(Object pass) { secret = pass; }
            private void disable(Object pass) {
                if (pass == secret) secret = null;
            }
            /*
            @Override
            public void checkPermission(Permission perm) {
                if(isPlayer1FromThread()) {
                    java.security.AccessController.checkPermission(perm);
                }
                
            }*/
            // ... override checkXXX method(s) here.
            // Always allow them to succeed when secret==null
        }

    }

    
    
    //<editor-fold defaultstate="collapsed" desc="Creating Thread class">
    public static class CreateThread extends Thread {

        private Thread t;
        private String threadName;
        private String playerId;
        private String classPath;
        private String classPackage;
        PlayerCommands command;
        
        private Object pass = new Object();
        private MySecurityManager sm = new MySecurityManager(pass);

        CreateThread(String name, Command cmd, String pi) {
            threadName = name;
            playerId = pi;
            command = cmd;
        }

        public void run() {
            SecurityManager old = System.getSecurityManager();
            System.setSecurityManager(sm);
            Permission perm = new FilePermission("hello.txt","write");
            sm.checkPermission(perm);
            Player player;
            classPath = "file://src/";
            classPackage = playerId + ".game.playerClass";
            if (Thread.currentThread().getName().equals("thread1")) {
                // Getting the jar URL which contains target class
                URL[] classLoaderUrls;
                try {
                    classLoaderUrls = new URL[]{new URL(classPath)};
                    // Create a new URLClassLoader
                    URLClassLoader urlClassLoader = new URLClassLoader(classLoaderUrls);       
                    // Load the target class
                    Class<?> player1Class = urlClassLoader.loadClass(classPackage);
                    //player1Class.implement(Player);
                    // Create a new instance from the loaded class
                    Constructor<?> constructor = player1Class.getConstructor();
                    Object player1Obj = constructor.newInstance();
                    player = (Player)player1Obj;
                    System.err.println("Player1 start!");
                    player.run(command);
                } catch (Exception ex) {
                    Logger.getLogger(Game.class.getName()).log(Level.SEVERE, null, ex);
                }
            } else if (Thread.currentThread().getName().equals("thread2")) {
                // Getting the jar URL which contains target class
                URL[] classLoaderUrls;
                try {
                    classLoaderUrls = new URL[]{new URL(classPath)};
                    // Create a new URLClassLoader
                    URLClassLoader urlClassLoader = new URLClassLoader(classLoaderUrls);       
                    // Load the target class
                    Class<?> player2Class = urlClassLoader.loadClass(classPackage);
                    //player1Class.implement(Player);
                    // Create a new instance from the loaded class
                    Constructor<?> constructor = player2Class.getConstructor();
                    Object player2Obj = constructor.newInstance();
                    player = (Player)player2Obj;
                    System.err.println("Player2 start!");
                    player.run(command);
                } catch (Exception ex) {
                    Logger.getLogger(Game.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
            sm.disable(pass);
            System.setSecurityManager(old);
            
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
            System.out.print("["+command.winner+",[");
            for (int i = 0; i < command.map.size(); i++) {
                System.out.print("[");
                for (int x = 0; x < command.MAP_SIZE; x++) {
                    System.out.print("[");
                    for (int y = 0; y < command.MAP_SIZE; y++) {
                        System.out.print(command.map.get(i).get(x).get(y) + " ");
                        if(y!=command.MAP_SIZE-1)System.out.print(",");
                    }
                    System.out.print("]");
                    if(x!=command.MAP_SIZE-1)System.out.print(",");
                }
                System.out.print("]");
                if(i!=command.map.size()-1)System.out.print(",");
            }
            System.out.print("],[");
            for(int x=0;x<command.map.size();x++){
                System.out.print("[");
                for(int y=0;y<8;y++){
                    System.out.print(command.muzzle.get(x)[y] + " ");
                    if(y!=7)System.out.print(",");
                }
                System.out.print("]");
                if(x!=command.map.size()-1)System.out.print(",");
            }
            System.out.print("]]");
            switch(command.winner) {
                case 1:
                    System.err.println("Player1 wins!");
                    break;
                case 2:
                    System.err.println("Player2 wins!");
                    break;
                case 3:
                    System.err.println("It's a Tie!");
                    break;
            }
            System.exit(0);
    }

    public static void main(String[] args) {
        Command command = new Command();
        String playerId1 = args[0];
        String playerId2 = args[1];
        CreateThread thread1 = new CreateThread("thread1", command, playerId1);
        CreateThread thread2 = new CreateThread("thread2", command, playerId2);
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