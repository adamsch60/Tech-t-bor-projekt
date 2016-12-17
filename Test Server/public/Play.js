var match=0;
var level = [
	[
	  [2,0,0,0,0,0],
	  [0,1,1,0,1,1],
	  [0,1,0,0,0,0],
	  [0,0,0,0,1,0],
	  [1,1,0,1,1,0],
	  [0,0,0,0,0,2]
	],
	 [
	  [0,2,0,0,0,0],
	  [0,1,1,0,1,1],
	  [0,1,0,0,0,0],
	  [0,0,0,0,1,0],
	  [1,1,0,1,1,2],
	  [0,0,0,0,0,0]
	],
	[
	  [0,0,2,0,0,0],
	  [0,1,1,0,1,1],
	  [0,1,0,0,0,0],
	  [0,0,0,0,1,2],
	  [1,1,0,1,1,0],
	  [0,0,0,0,0,0]
	],
	 [
	  [0,0,0,2,0,0],
	  [0,1,1,0,1,1],
	  [0,1,0,0,0,2],
	  [0,0,0,0,1,0],
	  [1,1,0,1,1,0],
	  [0,0,0,0,0,0]
	],
	    [
	  [0,0,0,0,0,0],
	  [0,1,1,2,1,1],
	  [0,1,0,0,2,0],
	  [0,0,0,0,1,0],
	  [1,1,0,1,1,0],
	  [0,0,0,0,0,0]
	],
	 [
	  [0,0,0,2,0,0],
	  [0,1,1,0,1,1],
	  [0,1,0,2,0,0],
	  [0,0,0,0,1,0],
	  [1,1,0,1,1,0],
	  [0,0,0,0,0,0]
	],
	  [
	  [2,0,0,2,0,0],
	  [0,1,1,3,1,1],
	  [0,1,0,3,0,0],
	  [0,0,0,2,1,0],
	  [1,1,0,1,1,0],
	  [0,0,0,0,0,0]
	],
	 [
	  [0,0,0,2,0,0],
	  [0,1,1,0,1,1],
	  [0,1,0,3,0,0],
	  [0,0,0,2,1,0],
	  [1,1,0,1,1,0],
	  [0,0,0,0,0,2]
	],
	  [
	  [0,0,0,2,0,0],
	  [0,1,1,0,1,1],
	  [0,1,0,0,0,0],
	  [0,0,0,0,1,0],
	  [1,1,0,1,1,0],
	  [0,0,0,0,0,2]
	]
	];


var piece=
	  [
	  [document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div")],
	  [document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div")],
	  [document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div")],
	  [document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div")],
	  [document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div")],
	  [document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div")],
	  ];

var board = document.getElementById("board");;

function plus(){

match++;
refresh();
}

function refresh(){

	var l = level.length
	
	for(var x=0;x<l;x++)
	{
		for(var y=0;y<l;y++)
		{
			if(level[x][y]==1){
				piece[x][y].setAttribute("class",piece[x][y].getAttribute("class") +" box");
			}
			else
			{
				piece[x][y].setAttribute("class",piece[x][y].getAttribute("class") +" not_box");
			}
	  		if(level[match][x][y]==2)
			{
				robot1.setAttribute("style","top: "+ (2+y*(100-2)/6) +"%; left: "+ (2+x*(100-2)/6) +"%;");	
			}
			
			if(level[match][x][y]==3)
			{
				robot2.setAttribute("style","top: "+ (2+y*(100-2)/6) +"%; left: "+ (2+x*(100-2)/6) +"%;");	
			}
			
		}
	}

}


function start(){
	var l = level.length
	
	for(var x=0;x<l;x++)
	{
		for(var y=0;y<l;y++)
		{
	  		if(level[match][x][y]==0 || level[match][x][y]==1 || level[match][x][y]==2 || level[match][x][y]==3)
	  		{
	  			
	  			board.appendChild(piece);
	  			piece[x][y].setAttribute("class","piece wall");

	  			var box_wall_1=document.createElement("div");
	  			piece[x][y].appendChild(box_wall_1);
				box_wall_1.setAttribute("class","box-wall box-wall-1");

				var box_wall_2=document.createElement("div");
				piece[x][y].appendChild(box_wall_2);
				box_wall_2.setAttribute("class","box-wall box-wall-2");

				var box_wall_3=document.createElement("div");
				piece[x][y].appendChild(box_wall_3);
				box_wall_3.setAttribute("class","box-wall box-wall-3");

				var box_wall_4=document.createElement("div");
				piece[x][y].appendChild(box_wall_4);  
				box_wall_4.setAttribute("class","box-wall box-wall-4");

				var box_roof=document.createElement("div");
				box_wall_1.appendChild(box_roof);
				box_roof.setAttribute("class","box-roof");

				var box_floor=document.createElement("div");
				piece[x][y].appendChild(box_floor);
				box_floor.setAttribute("class","box-floor");

				if(level[x][y]==1){
					piece[x][y].setAttribute("class",piece[x][y].getAttribute("class") +" box");
				}
				else
				{
					piece[x][y].setAttribute("class",piece[x][y].getAttribute("class") +" not_box");
				}
			}
			if(level[match][x][y]==2)
			{
				
	  			board.appendChild(robot1);
	  			robot1.setAttribute("class","piece wall");

	  			var robot_wall_1=document.createElement("div");
	  			robot1.appendChild(robot_wall_1);
				robot_wall_1.setAttribute("class","robot-wall robot-wall-1");

				var robot_wall_2=document.createElement("div");
				robot1.appendChild(robot_wall_2);
				robot_wall_2.setAttribute("class","robot-wall robot-wall-2");

				var robot_wall_3=document.createElement("div");
				robot1.appendChild(robot_wall_3);
				robot_wall_3.setAttribute("class","robot-wall robot-wall-3");

				var robot_wall_4=document.createElement("div");
				robot1.appendChild(robot_wall_4);  
				robot_wall_4.setAttribute("class","robot-wall robot-wall-4");

				var robot_roof=document.createElement("div");
				robot_wall_1.appendChild(robot_roof);
				robot_roof.setAttribute("class","robot-roof");

				var robot_floor=document.createElement("div");
				robot1.appendChild(robot_floor);
				robot_floor.setAttribute("class","robot-floor");

				robot1.setAttribute("class",robot1.getAttribute("class") +" robot");
			robot1.setAttribute("style","top: "+ (2+y*(100-2)/6) +"%; left: "+ (2+x*(100-2)/6) +"%;");	
			}
			
			
			if(level[match][x][y]==3)
			{
				
	  			board.appendChild(robot2);
	  			robot2.setAttribute("class","piece wall");

	  			var robot_wall_1=document.createElement("div");
	  			robot2.appendChild(robot_wall_1);
				robot_wall_1.setAttribute("class","robot-wall robot-wall-1");

				var robot_wall_2=document.createElement("div");
				robot2.appendChild(robot_wall_2);
				robot_wall_2.setAttribute("class","robot-wall robot-wall-2");

				var robot_wall_3=document.createElement("div");
				robot2.appendChild(robot_wall_3);
				robot_wall_3.setAttribute("class","robot-wall robot-wall-3");

				var robot_wall_4=document.createElement("div");
				robot2.appendChild(robot_wall_4);  
				robot_wall_4.setAttribute("class","robot-wall robot-wall-4");

				var robot_roof=document.createElement("div");
				robot_wall_1.appendChild(robot_roof);
				robot_roof.setAttribute("class","robot-roof");

				var robot_floor=document.createElement("div");
				robot2.appendChild(robot_floor);
				robot_floor.setAttribute("class","robot-floor");

				robot2.setAttribute("class",robot2.getAttribute("class") +" robot");
			robot2.setAttribute("style","top: "+ (2+y*(100-2)/6) +"%; left: "+ (2+x*(100-2)/6) +"%;");	
			}
			
			piece[x][y].setAttribute("style","top: "+ (2+y*(100-2)/6) +"%; left: "+ (2+x*(100-2)/6) +"%;");
		}
	}
}
