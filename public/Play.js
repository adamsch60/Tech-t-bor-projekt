
var match=0;

var level;
var winner=10;
var muzzle;


var robot1=document.createElement("div");
var robot2=document.createElement("div");


function change(a,b){
for(var x=a.length-1;x>=0;x--){
	if(a[a.length-1]==" ")break;
	a=a.slice(0, a.length-1);
}
a+=b;
return a;
}



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


var apiece=
	  [
	  [document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div")],
	  [document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div")],
	  [document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div")],
	  [document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div")],
	  [document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div")],
	  [document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div"),document.createElement("div")],
	  ];




function animation(){

	var board = document.getElementById("board");	
	var l=6;
	for(var x=0;x<l;x++)
	{
		for(var y=0;y<l;y++)
		{  			
	  			board.appendChild(apiece[x][y]);
	  			apiece[x][y].setAttribute("class","piece wall");

	  			var box_wall_1=document.createElement("div");
	  			apiece[x][y].appendChild(box_wall_1);
				box_wall_1.setAttribute("class","animated_box box-wall box-wall-1");

				var box_wall_2=document.createElement("div");
				apiece[x][y].appendChild(box_wall_2);
				box_wall_2.setAttribute("class","animated_box box-wall box-wall-2");

				var box_wall_3=document.createElement("div");
				apiece[x][y].appendChild(box_wall_3);
				box_wall_3.setAttribute("class","animated_box box-wall box-wall-3");

				var box_wall_4=document.createElement("div");
				apiece[x][y].appendChild(box_wall_4);  
				box_wall_4.setAttribute("class","animated_box box-wall box-wall-4");

				var box_roof=document.createElement("div");
				box_wall_1.appendChild(box_roof);
				box_roof.setAttribute("class","animated_box box-roof");

				var box_floor=document.createElement("div");
				apiece[x][y].appendChild(box_floor);
				box_floor.setAttribute("class","animated_box box-floor");

				
				apiece[x][y].setAttribute("class",apiece[x][y].getAttribute("class") +" box"+" animated");
				

				apiece[x][y].setAttribute("style","top: "+ (2+y*(100-2)/6) +"%; left: "+ (2+x*(100-2)/6) +"%; animation-delay:"+Math.random()*2+"s;");
			}

		}
		console.log("anim done!")
	}







function plus(){
if(winner==10)return;
if(match<(level.length-1))match++;
refresh();
}
function minus(){
if(winner==10)return;
if(match>0)match--;
refresh();
}

function skip(){
if(winner==10)return;
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
			if(level[match][x][y]==1 || level[match][x][y]==2 || level[match][x][y]==3 || level[match][x][y]==0 || level[match][x][y]==4){
				if(level[match][x][y]==1){
					piece[x][y].setAttribute("class",change(piece[x][y].getAttribute("class")," box"));
				}
				else
				{
					piece[x][y].setAttribute("class",change(piece[x][y].getAttribute("class") ," not_box"));
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
					missiles[x][y].setAttribute("class",change(missiles[x][y].getAttribute("class"),"missile "));
				}
				else
				{
					missiles[x][y].setAttribute("class",change(missiles[x][y].getAttribute("class"),"not_missile"));
				}
			}
		}
	}

			/*RESET*/
	var robot1childs=robot1.childNodes;
	
	var robot2childs=robot2.childNodes;



	robot1childs[1].setAttribute("style","background-color: #002D2D");
	robot1childs[2].setAttribute("style","background-color: #002D2D");
	robot1childs[0].childNodes[0].setAttribute("style","background-color: #105D5D");
	robot2childs[1].setAttribute("style","background-color: #4C0000");
	robot2childs[2].setAttribute("style","background-color: #4C0000");
	robot2childs[0].childNodes[0].setAttribute("style","background-color: #9C1B1B");



	if(true){
		var robot_roof=robot2childs[0].childNodes[0];
		var robot_wall_2=robot2childs[1];
		var robot_wall_3=robot2childs[2];
		
		if(muzzle[match-1][1]==1){
			robot_wall_2.setAttribute("style","background-color:#f4aa42");
			robot_wall_3.setAttribute("style","background: radial-gradient(circle at 50% 100%, #f4aa42, #686868");
			robot_roof.setAttribute("style","background: radial-gradient(circle at 50% 100%, #f4aa42, #686868");
		}

		if(muzzle[match-1][2]==1){
			robot_wall_2.setAttribute("style","background: radial-gradient(circle at 100% 50%, #f4aa42, #686868");
			robot_roof.setAttribute("style","background: radial-gradient(circle at 100% 50%, #f4aa42, #686868");
		}

		if(muzzle[match-1][3]==1){
			robot_wall_3.setAttribute("style","background: radial-gradient(circle at 50% 0%, #f4aa42, #686868");
			robot_roof.setAttribute("style","background: radial-gradient(circle at 50% 0%, #f4aa42, #686868");
		}

		if(muzzle[match-1][0]==1){
			robot_wall_2.setAttribute("style","background: radial-gradient(circle at 0% 50%, #f4aa42, #686868");
			robot_wall_3.setAttribute("style","background-color:#f4aa42");
			robot_roof.setAttribute("style","background: radial-gradient(circle at 0% 50%, #f4aa42, #686868");
		}
	}


	if(true){
		var robot_roof=robot1childs[0].childNodes[0];
		var robot_wall_2=robot1childs[1];
		var robot_wall_3=robot1childs[2];
		
		if(muzzle[match-1][5]==1){
			robot_wall_2.setAttribute("style","background-color:#f4aa42");
			robot_wall_3.setAttribute("style","background: radial-gradient(circle at 50% 100%, #f4aa42, #686868");
			robot_roof.setAttribute("style","background: radial-gradient(circle at 50% 100%, #f4aa42, #686868");
		}

		if(muzzle[match-1][6]==1){
			robot_wall_2.setAttribute("style","background: radial-gradient(circle at 100% 50%, #f4aa42, #686868");
			robot_roof.setAttribute("style","background: radial-gradient(circle at 100% 50%, #f4aa42, #686868");
		}

		if(muzzle[match-1][7]==1){
			robot_wall_3.setAttribute("style","background: radial-gradient(circle at 50% 0%, #f4aa42, #686868");
			robot_roof.setAttribute("style","background: radial-gradient(circle at 50% 0%, #f4aa42, #686868");
		}

		if(muzzle[match-1][4]==1){
			robot_wall_2.setAttribute("style","background: radial-gradient(circle at 0% 50%, #f4aa42, #686868");
			robot_wall_3.setAttribute("style","background-color:#f4aa42");
			robot_roof.setAttribute("style","background: radial-gradient(circle at 0% 50%, #f4aa42, #686868");
		}
	}


	


	if(match==level.length-1){
		var massage = document.getElementById("end_screen");
		massage.setAttribute("style","visibility: visible");
	}
}


function start(){console.log("NNNNNNNNN");

animation();


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
        $.ajax({
type: "POST",
url: "/get_user",
data: "",
success: function(res) {
$("#username").text(res.username);
console.log('completed get_username');

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
if(res.no_enemy==true){
	var massage = document.getElementById("end_screen");
	massage.setAttribute("style","visibility: visible");
	$("#winner").css('font-size','19px');
$("#winner").text("There's no enemy that you haven't played against recently.");$("#winner").css('color','grey');
	return;
}

$('#enemy').toggleClass('in');
$('#enemy').text(res.enemy);
$('#enemy_elo').toggleClass('in');
$('#enemy_elo').text(Math.round(res.enemy_elo));


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
  	muzzle = sth[2];
  	//console.log(sth[1]);
  	
	var l = level[0].length;
console.log(winner+" "+level+" "+l);

$("#board").empty();
console.log("anim removed!");
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
	  			missiles[x][y].setAttribute("class","piece wall");

	  			var missile_wall_1=document.createElement("div");
	  			missiles[x][y].appendChild(missile_wall_1);
				missile_wall_1.setAttribute("class","missile-wall missile-wall-1");

				var missile_wall_2=document.createElement("div");
				missiles[x][y].appendChild(missile_wall_2);
				missile_wall_2.setAttribute("class","missile-wall missile-wall-2");

				var missile_wall_3=document.createElement("div");
				missiles[x][y].appendChild(missile_wall_3);
				missile_wall_3.setAttribute("class","missile-wall missile-wall-3");

				var missile_wall_4=document.createElement("div");
				missiles[x][y].appendChild(robot_wall_4);  
				missile_wall_4.setAttribute("class","missile-wall missile-wall-4");

				var missile_roof=document.createElement("div");
				missile_wall_1.appendChild(missile_roof);
				missile_roof.setAttribute("class","missile-roof");

				var missile_floor=document.createElement("div");
				missiles[x][y].appendChild(missile_floor);
				missile_floor.setAttribute("class","missile-floor");

				if(level[match][x][y]==3)missiles[x][y].setAttribute("class",missiles[x][y].getAttribute("class") +" missile");else missiles[x][y].setAttribute("class",missiles[x][y].getAttribute("class") +" not_missile");
				missiles[x][y].setAttribute("style","top: "+ (2+y*(100-2)/6) +"%; left: "+ (2+x*(100-2)/6) +"%;");	
			}
			
			console.log("append"+x+" "+y+": "+level[match][x][y]);
		}
	}
}
});
}





















