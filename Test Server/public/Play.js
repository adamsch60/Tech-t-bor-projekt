var match=-1;



function start(){
match++;
	var level = [
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
	];


	var l = level.length
	var board = document.getElementById("board");;
	for(var x=0;x<l;x++)
	{
		for(var y=0;y<l;y++)
		{
	  		if(level[match][x][y]==0 || level[match][x][y]==1)
	  		{
	  			var piece=document.createElement("div");
	  			board.appendChild(piece);
	  			piece.setAttribute("class","piece wall");

	  			var box_wall_1=document.createElement("div");
	  			piece.appendChild(box_wall_1);
				box_wall_1.setAttribute("class","box-wall box-wall-1");

				var box_wall_2=document.createElement("div");
				piece.appendChild(box_wall_2);
				box_wall_2.setAttribute("class","box-wall box-wall-2");

				var box_wall_3=document.createElement("div");
				piece.appendChild(box_wall_3);
				box_wall_3.setAttribute("class","box-wall box-wall-3");

				var box_wall_4=document.createElement("div");
				piece.appendChild(box_wall_4);  
				box_wall_4.setAttribute("class","box-wall box-wall-4");

				var box_roof=document.createElement("div");
				box_wall_1.appendChild(box_roof);
				box_roof.setAttribute("class","box-roof");

				var box_floor=document.createElement("div");
				piece.appendChild(box_floor);
				box_floor.setAttribute("class","box-floor");

				if(level[x][y]==1){
					piece.setAttribute("class",piece.getAttribute("class") +" box");
				}
				else
				{
					piece.setAttribute("class",piece.getAttribute("class") +" not_box");
				}
			}
			else
			{
				var piece=document.createElement("div");
	  			board.appendChild(piece);
	  			piece.setAttribute("class","piece wall");

	  			var robot_wall_1=document.createElement("div");
	  			piece.appendChild(robot_wall_1);
				robot_wall_1.setAttribute("class","robot-wall robot-wall-1");

				var robot_wall_2=document.createElement("div");
				piece.appendChild(robot_wall_2);
				robot_wall_2.setAttribute("class","robot-wall robot-wall-2");

				var robot_wall_3=document.createElement("div");
				piece.appendChild(robot_wall_3);
				robot_wall_3.setAttribute("class","robot-wall robot-wall-3");

				var robot_wall_4=document.createElement("div");
				piece.appendChild(robot_wall_4);  
				robot_wall_4.setAttribute("class","robot-wall robot-wall-4");

				var robot_roof=document.createElement("div");
				robot_wall_1.appendChild(robot_roof);
				robot_roof.setAttribute("class","robot-roof");

				var robot_floor=document.createElement("div");
				piece.appendChild(robot_floor);
				robot_floor.setAttribute("class","robot-floor");

				piece.setAttribute("class",piece.getAttribute("class") +" robot");
			}
			
			piece.setAttribute("style","top: "+ (2+y*(100-2)/6) +"%; left: "+ (2+x*(100-2)/6) +"%;");
		}
	}
}
