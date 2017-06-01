package src.game;

import src.game.*;

public interface PlayerCommands {

        public class Directions {

            public static final int UP = 0;
            public static final int RIGHT = 1;
            public static final int DOWN = 2;
            public static final int LEFT = 3;
        }
        
        public void Wait();
        public boolean Move();
        public void Rotate(String direction);
        public void Shoot();
        public int getHealth();
        public int getPlayerX();
        public int getPlayerY();
        public int getPlayerDirection();
        public int[][] getStartingMap();
        public static class see {
            public int what;
            public int howFar;

            public see(int a, int b) {
                what = b;
                howFar = a;
            }
        }
        public see What_I_See();
}
