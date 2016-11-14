var level = 
  [0,0,1,1,0,0,0,0,0,0],
  [0,0,1,0,0,0,1,0,0,0],
  [0,0,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,0,0,0],
  [0,0,0,1,1,1,0,0,0,0],
  [0,1,0,1,1,0,0,0,0,0],
  [0,1,0,1,1,0,0,0,1,1],
  [0,1,0,0,0,0,0,0,1,0],
  [0,1,1,1,0,0,1,1,1,0],
  [0,0,0,0,0,0,0,0,0,0]
];




var l = level.length
var board = getElementById("board")
for(int x=0;x<l;x++)
{
for(int y=0;y<l;y++)
{
  var piece=document.createElement("div");
  board.appendChild(elem);
  piece.setAttribute("class","piece wall");




  var box_wall_1=document.createElement("div");
  piece.appendChild(box_wall_1);
box_wall_1.setAttribute("class","box_wall box_wall_1");




var box_wall_2=document.createElement("div");
piece.appendChild(box_wall_2);
box_wall_2.setAttribute("class","box_wall box_wall_2");




var box_wall_3=document.createElement("div");
piece.appendChild(box_wall_3);
box_wall_3.setAttribute("class","box_wall box_wall_3");




var box_wall_4=document.createElement("div");
piece.appendChild(box_wall_4);  
box_wall_4.setAttribute("class","box_wall box_wall_4");




var box_roof=document.createElement("div");
  box_wall_1.appendChild(box_roof);
box_roof.setAttribute("class","box_roof");




var box_floor=document.createElement("div");
    piece.appendChild(box_floor);
    box_floor.setAttribute("class","box_floor");
if(level[x][y]==1){
piece.setAttribute("class",elem.getAttribute("class") +" box");
}else{
piece.setAttribute("class",elem.getAttribute("class") +” not_box"); 
}
} 


piece.setAtrribute("style","top: "+ VALAMI +"%; left: "+ VALAMI_MÁS +"%;")


}
