
var match=0;

var level;
var winner;


var robot1=document.createElement("div");
var robot2=document.createElement("div");

var missiles=
	  [
	  [document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div")],
	  [document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div")],
	  [document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div")],
	  [document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div")],
	  [document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div")],
	  [document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div")],
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


function plus(){
if(match<(level.length-1))match++;
refresh();
}
function minus(){

if(match>0)match--;
refresh();
}

function skip(){

match=level.length-1;
refresh();
}

function refresh(){
var board = document.getElementById("board");
	var l = level[0].length
	
	for(var x=0;x<l;x++)
	{
		for(var y=0;y<l;y++)
		{
			if(level[match][x][y]==1 || level[match][x][y]==2 || level[match][x][y]==3 || level[match][x][y]==0){
				if(level[match][x][y]==1){
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
				if(level[match][x][y]==4){
					piece[x][y].setAttribute("class",missiles[x][y].getAttribute("class") +" missile");
				}
				else
				{
					piece[x][y].setAttribute("class",missiles[x][y].getAttribute("class") +" not_missile");
				}
			}
		}
	}
	if(match==level.length-1){
		var massage = document.getElementById("end_screen");
		massage.setAttribute("style","visibility: visible");
	}
}


function start(){console.log("NNNNNNNNN");
//!töltő képernyő
//editor.setValue("OHOHOHOHOHOHOOOO");
	   $.ajax({
type: "POST",
url: "/get_code",
data: "",
success: function(res) {
editor.setValue(res);
//editor.setValue("OHOHOHOHOHOHOOOO");
}
});
console.log('after get_code');
       $.ajax({
type: "POST",
url: "/get_elo",
data: "",
success: function(res) {
$("#elo").text(Math.round(res.elo));
console.log('completed get_elo');
//editor.setValue("OHOHOHOHOHOHOOOO");
}
});
console.log('after get_elo');

	   $.ajax({
type: "POST",
url: "/match",
data: "",
success: function(res) {
	//res = typeof res ==
var sthh="";sthh=res.std;
//sthh = "[2,[[2 ,4 ,0 ,0 ,0 ,0 ],[0 ,1 ,1 ,0 ,1 ,1 ],[0 ,1 ,0 ,0 ,0 ,0 ],[0 ,0 ,0 ,0 ,1 ,0 ],[1 ,1 ,4 ,1 ,1 ,0 ],[0 ,0 ,0 ,0 ,4 ,3 ]],[[2 ,0 ,4 ,0 ,0 ,0 ],[0 ,1 ,1 ,0 ,1 ,1 ],[0 ,1 ,0 ,0 ,0 ,0 ],[0 ,0 ,0 ,0 ,1 ,0 ],[1 ,1 ,0 ,1 ,1 ,3 ],[0 ,0 ,0 ,4 ,0 ,0 ]],[[0 ,2 ,0 ,0 ,0 ,0 ],[0 ,1 ,1 ,0 ,1 ,1 ],[0 ,1 ,0 ,0 ,0 ,0 ],[0 ,0 ,0 ,0 ,1 ,3 ],[1 ,1 ,0 ,1 ,1 ,0 ],[0 ,0 ,0 ,0 ,0 ,0 ]],[[0 ,0 ,2 ,0 ,0 ,0 ],[0 ,1 ,1 ,0 ,1 ,1 ],[0 ,1 ,0 ,0 ,0 ,3 ],[0 ,0 ,0 ,0 ,1 ,0 ],[1 ,1 ,0 ,1 ,1 ,0 ],[0 ,0 ,0 ,0 ,0 ,0 ]],[[0 ,0 ,0 ,2 ,0 ,0 ],[0 ,1 ,1 ,0 ,1 ,1 ],[0 ,1 ,0 ,0 ,0 ,3 ],[0 ,0 ,0 ,0 ,1 ,0 ],[1 ,1 ,0 ,1 ,1 ,0 ],[0 ,0 ,0 ,0 ,0 ,0 ]],[[0 ,0 ,0 ,2 ,0 ,0 ],[0 ,1 ,1 ,0 ,1 ,1 ],[0 ,1 ,0 ,0 ,3 ,0 ],[0 ,0 ,0 ,0 ,1 ,0 ],[1 ,1 ,0 ,1 ,1 ,0 ],[0 ,0 ,0 ,0 ,0 ,0 ]],[[0 ,0 ,0 ,0 ,0 ,0 ],[0 ,1 ,1 ,2 ,1 ,1 ],[0 ,1 ,0 ,3 ,0 ,0 ],[0 ,0 ,0 ,0 ,1 ,0 ],[1 ,1 ,0 ,1 ,1 ,0 ],[0 ,0 ,0 ,0 ,0 ,0 ]],[[0 ,0 ,0 ,0 ,0 ,0 ],[0 ,1 ,1 ,2 ,1 ,1 ],[0 ,1 ,3 ,0 ,0 ,0 ],[0 ,0 ,0 ,0 ,1 ,0 ],[1 ,1 ,0 ,1 ,1 ,0 ],[0 ,0 ,0 ,0 ,0 ,0 ]],[[0 ,0 ,0 ,0 ,0 ,0 ],[0 ,1 ,1 ,0 ,1 ,1 ],[0 ,1 ,3 ,2 ,0 ,0 ],[0 ,0 ,0 ,0 ,1 ,0 ],[1 ,1 ,0 ,1 ,1 ,0 ],[0 ,0 ,0 ,0 ,0 ,0 ]],[[0 ,0 ,0 ,0 ,0 ,0 ],[0 ,1 ,1 ,0 ,1 ,1 ],[0 ,1 ,0 ,2 ,0 ,0 ],[0 ,0 ,3 ,0 ,1 ,0 ],[1 ,1 ,0 ,1 ,1 ,0 ],[0 ,0 ,0 ,0 ,0 ,0 ]],[[0 ,0 ,0 ,0 ,0 ,0 ],[0 ,1 ,1 ,0 ,1 ,1 ],[0 ,1 ,0 ,0 ,2 ,0 ],[0 ,0 ,0 ,0 ,1 ,0 ],[1 ,1 ,3 ,1 ,1 ,0 ],[0 ,0 ,0 ,0 ,0 ,0 ]],[[0 ,0 ,0 ,0 ,0 ,0 ],[0 ,1 ,1 ,0 ,1 ,1 ],[0 ,1 ,0 ,0 ,0 ,2 ],[0 ,0 ,0 ,0 ,1 ,0 ],[1 ,1 ,0 ,1 ,1 ,0 ],[0 ,0 ,3 ,0 ,0 ,0 ]],[[0 ,0 ,0 ,0 ,0 ,0 ],[0 ,1 ,1 ,0 ,1 ,1 ],[0 ,1 ,0 ,0 ,0 ,2 ],[0 ,0 ,0 ,0 ,1 ,0 ],[1 ,1 ,0 ,1 ,1 ,0 ],[0 ,0 ,3 ,0 ,0 ,0 ]],[[0 ,0 ,0 ,0 ,0 ,0 ],[0 ,1 ,1 ,0 ,1 ,1 ],[0 ,1 ,0 ,0 ,0 ,0 ],[0 ,0 ,0 ,0 ,1 ,2 ],[1 ,1 ,0 ,1 ,1 ,0 ],[0 ,0 ,0 ,3 ,0 ,0 ]],[[0 ,0 ,0 ,0 ,0 ,0 ],[0 ,1 ,1 ,0 ,1 ,1 ],[0 ,1 ,0 ,0 ,0 ,0 ],[0 ,0 ,0 ,0 ,1 ,0 ],[1 ,1 ,0 ,1 ,1 ,2 ],[0 ,0 ,0 ,0 ,3 ,0 ]],[[0 ,0 ,0 ,0 ,0 ,0 ],[0 ,1 ,1 ,0 ,1 ,1 ],[0 ,1 ,0 ,0 ,0 ,0 ],[0 ,0 ,0 ,0 ,1 ,0 ],[1 ,1 ,0 ,1 ,1 ,2 ],[0 ,0 ,0 ,0 ,3 ,0 ]],[[0 ,0 ,0 ,0 ,0 ,0 ],[0 ,1 ,1 ,0 ,1 ,1 ],[0 ,1 ,0 ,0 ,0 ,0 ],[0 ,0 ,0 ,0 ,1 ,0 ],[1 ,1 ,0 ,1 ,1 ,2 ],[0 ,0 ,0 ,0 ,0 ,3 ]],[[0 ,0 ,0 ,0 ,0 ,0 ],[0 ,1 ,1 ,0 ,1 ,1 ],[0 ,1 ,0 ,0 ,0 ,0 ],[0 ,0 ,0 ,0 ,1 ,0 ],[1 ,1 ,0 ,1 ,1 ,2 ],[0 ,0 ,0 ,0 ,0 ,3 ]],[[0 ,0 ,0 ,0 ,0 ,0 ],[0 ,1 ,1 ,0 ,1 ,1 ],[0 ,1 ,0 ,0 ,0 ,0 ],[0 ,0 ,0 ,0 ,1 ,0 ],[1 ,1 ,0 ,1 ,1 ,2 ],[0 ,0 ,0 ,0 ,0 ,3 ]],[[0 ,0 ,0 ,0 ,0 ,0 ],[0 ,1 ,1 ,0 ,1 ,1 ],[0 ,1 ,0 ,0 ,0 ,0 ],[0 ,0 ,0 ,0 ,1 ,0 ],[1 ,1 ,0 ,1 ,1 ,2 ],[0 ,0 ,0 ,0 ,0 ,3 ]],[[0 ,0 ,0 ,0 ,0 ,0 ],[0 ,1 ,1 ,0 ,1 ,1 ],[0 ,1 ,0 ,0 ,0 ,0 ],[0 ,0 ,0 ,0 ,1 ,0 ],[1 ,1 ,0 ,1 ,1 ,2 ],[0 ,0 ,0 ,0 ,0 ,3 ]]]";
	var sth =JSON.parse(sthh);
	console.log("sssssssuccess"+res);
  	winner = sth[0];
  	if(0<Math.round(res.elo_diff)) $("#elo_diff_count").text('+'+Math.round(res.elo_diff)+' LP');
  	else $("#elo_diff_count").text(Math.round(res.elo_diff)+' LP');
  	if(winner==1){$("#winner").text("Winner");$("#winner").css('color','green');		 }
  	if(winner==2){$("#winner").text("Lose");$("#winner").css('color','red');}
  	if(winner==3){$("#winner").text("Tie");$("#winner").css('color','#dacd23');}

  	level = sth[1];
  	//console.log(sth[1]);
  	
	var l = level[0].length;
console.log(winner+" "+level+" "+l);
var board = document.getElementById("board");	
	for(var x=0;x<l;x++)
	{
		for(var y=0;y<l;y++)
		{
			console.log("append"+x+" "+y+": "+level[match][x][y]);
	  		if(level[match][x][y]==0 || level[match][x][y]==1 || level[match][x][y]==2 || level[match][x][y]==3)
	  		{
	  			
	  			board.appendChild(piece[x][y]);
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

				if(level[match][x][y]==1){
					piece[x][y].setAttribute("class",piece[x][y].getAttribute("class") +" box");
				}
				else
				{
					piece[x][y].setAttribute("class",piece[x][y].getAttribute("class") +" not_box");
				}
				piece[x][y].setAttribute("style","top: "+ (2+y*(100-2)/6) +"%; left: "+ (2+x*(100-2)/6) +"%;");
			}
			if(level[match][x][y]==2)
			{
				
	  			board.appendChild(robot1);
	  			robot1.setAttribute("class","piece wall");

	  			var robot_wall_1=document.createElement("div");
	  			robot1.appendChild(robot_wall_1);
				robot_wall_1.setAttribute("class","robot-wall robot-wall-1");
				robot_wall_1.setAttribute("style","background-color: #002D2D");

				var robot_wall_2=document.createElement("div");
				robot1.appendChild(robot_wall_2);
				robot_wall_2.setAttribute("class","robot-wall robot-wall-2");
				robot_wall_2.setAttribute("style","background-color: #002D2D");

				var robot_wall_3=document.createElement("div");
				robot1.appendChild(robot_wall_3);
				robot_wall_3.setAttribute("class","robot-wall robot-wall-3");
				robot_wall_3.setAttribute("style","background-color: #002D2D");

				var robot_wall_4=document.createElement("div");
				robot1.appendChild(robot_wall_4);  
				robot_wall_4.setAttribute("class","robot-wall robot-wall-4");
				robot_wall_4.setAttribute("style","background-color: #002D2D");

				var robot_roof=document.createElement("div");
				robot_wall_1.appendChild(robot_roof);
				robot_roof.setAttribute("class","robot-roof");
				robot_roof.setAttribute("style","background-color: #105D5D");

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
				robot_wall_1.setAttribute("style","background-color: #4C0000");

				var robot_wall_2=document.createElement("div");
				robot2.appendChild(robot_wall_2);
				robot_wall_2.setAttribute("class","robot-wall robot-wall-2");
				robot_wall_2.setAttribute("style","background-color: #4C0000");

				var robot_wall_3=document.createElement("div");
				robot2.appendChild(robot_wall_3);
				robot_wall_3.setAttribute("class","robot-wall robot-wall-3");
				robot_wall_3.setAttribute("style","background-color: #4C0000");

				var robot_wall_4=document.createElement("div");
				robot2.appendChild(robot_wall_4);  
				robot_wall_4.setAttribute("class","robot-wall robot-wall-4");
				robot_wall_4.setAttribute("style","background-color: #4C0000");

				var robot_roof=document.createElement("div");
				robot_wall_1.appendChild(robot_roof);
				robot_roof.setAttribute("class","robot-roof");
				robot_roof.setAttribute("style","background-color: #9C1B1B");

				var robot_floor=document.createElement("div");
				robot2.appendChild(robot_floor);
				robot_floor.setAttribute("class","robot-floor");

				robot2.setAttribute("class",robot2.getAttribute("class") +" robot");
				robot2.setAttribute("style","top: "+ (2+y*(100-2)/6) +"%; left: "+ (2+x*(100-2)/6) +"%;");	
			}

			if(true)
			{
				
	  			board.appendChild(missiles[x][y]);
	  			missile.setAttribute("class","piece wall");

	  			var missile_wall_1=document.createElement("div");
	  			missile.appendChild(missile_wall_1);
				missile_wall_1.setAttribute("class","missile-wall missile-wall-1");

				var missile_wall_2=document.createElement("div");
				missile.appendChild(missile_wall_2);
				missile_wall_2.setAttribute("class","missile-wall missile-wall-2");

				var missile_wall_3=document.createElement("div");
				missile.appendChild(missile_wall_3);
				missile_wall_3.setAttribute("class","missile-wall missile-wall-3");

				var missile_wall_4=document.createElement("div");
				missile.appendChild(robot_wall_4);  
				missile_wall_4.setAttribute("class","missile-wall missile-wall-4");

				var missile_roof=document.createElement("div");
				missile_wall_1.appendChild(missile_roof);
				missile_roof.setAttribute("class","missile-roof");

				var missile_floor=document.createElement("div");
				missile.appendChild(missile_floor);
				missile_floor.setAttribute("class","missile-floor");

				if(level[match][x][y]==3)missile.setAttribute("class",missile.getAttribute("class") +" missile");else missile.setAttribute("class",missile.getAttribute("class") +" not_missile");
				missile.setAttribute("style","top: "+ (2+y*(100-2)/6) +"%; left: "+ (2+x*(100-2)/6) +"%;");	
			}
			
			console.log("append"+x+" "+y+": "+level[match][x][y]);
		}
	}
}
});
}





















