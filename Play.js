function start(){

	var level = [
	  [0,0,1,1,0,0],
	  [0,0,1,0,0,0],
	  [0,0,1,1,0,0],
	  [0,0,0,0,0,1],
	  [0,0,0,1,1,1],
	  [0,1,0,1,1,0]
	];


	var l = level.length
	var board = document.getElementById("board");;
	for(var x=0;x<l;x++)
	{
		for(var y=0;y<l;y++)
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
			}else{
				piece.setAttribute("class",piece.getAttribute("class") +" not_box"); 
			}

			piece.setAttribute("style","top: "+ (2+y*(100-2)/6) +"%; left: "+ (2+x*(100-2)/6) +"%;");

		}
	}
}