const projects = [
  ["glove","Glove Vocaliser","Assistive hardware"],
  ["clariflow","ClariFlow","AI & browser tools"],
  ["library","AIILSG Digital Library","Full-stack development"],
  ["disaster","Disaster Management Portal","Public-sector web development"],
  ["game","Game Hub","Network programming"]
];
const canvas = document.querySelector("canvas");
const g = canvas.getContext("2d");
const white = "#f2efff", orange = "#ffbb88", lilac = "#c4bafa";
function path(points, color = white, width = 4) {
  g.beginPath();
  points.forEach(([x,y], i) => i ? g.lineTo(x,y) : g.moveTo(x,y));
  g.lineJoin = "round"; g.lineCap = "round"; g.strokeStyle = color; g.lineWidth = width; g.stroke();
}
function dot(x,y,r,color) {
  g.beginPath(); g.arc(x,y,r,0,2*Math.PI); g.fillStyle=color; g.fill();
}
function box(x,y,w,h,color) {
  g.fillStyle=color; g.beginPath(); g.roundRect(x,y,w,h,8); g.fill();
}
function glove() {
  g.save(); g.translate(202,14); g.rotate(-.12);
  const outline=[[58,265],[55,224],[13,161],[6,139],[14,130],[28,134],[53,166],[53,69],[61,60],[70,65],[77,134],[78,34],[86,25],[96,31],[99,129],[108,17],[119,13],[128,21],[123,131],[142,46],[152,40],[161,48],[151,150],[148,194],[128,235],[127,265],[58,265]];
  g.beginPath();outline.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.fillStyle="#5653a8";g.fill();path(outline);
  [[63,84],[87,47],[117,36],[150,62],[21,146]].forEach(([x,y],i)=>{path([[x,y],[x,145+i*5],[91,194]],lilac,2);dot(x,y,6,orange)});
  box(72,183,44,30,orange);g.restore();
  path([[319,192],[380,192],[411,160],[458,160]],orange,3);
  [12,27,43,67,93,54,31,63,40,18].forEach((h,i)=>path([[465+i*9,160-h/2],[465+i*9,160+h/2]],white,5));
}
function documents(){
  [[184,92,lilac],[281,64,"#d9d4ff"],[378,35,white]].forEach(([x,y,c])=>{
    box(x,y,168,195,c);for(let i=0;i<5;i++)path([[x+24,y+32+i*24],[x+116-(i%2)*30,y+32+i*24]],"#56529c",4);
  });box(461,176,95,45,orange);path([[482,198],[493,208],[526,186]],"#3e3569",5);
}
function library(){
  [0,1,2,3,4,5].forEach((i)=>{const h=[137,181,155,198,168,146][i],x=220+i*51;box(x,247-h,44,h,[lilac,white,orange][i%3]);path([[x+8,228],[x+35,228]],"#524e96",4);path([[x+20,262-h],[x+20,290-h]],"#524e96",4)});path([[190,253],[556,253]],white,5);
}
function flow(){
  path([[380,103],[380,153],[215,153],[215,195]],white);path([[380,153],[543,153],[543,195]],white);path([[380,153],[380,195]],white);
  box(314,52,132,54,orange);[215,380,543].forEach(x=>{box(x-60,195,120,58,lilac);path([[x-29,222],[x+29,222]],"#514786",4)});path([[349,78],[412,78]],"#514786",4);
}
function game(){
  [1,2].forEach(i=>{path([[266+i*70,48],[266+i*70,256]],lilac);path([[266,48+i*70],[476,48+i*70]],lilac)});
  [[301,83],[371,153],[441,223]].forEach(([x,y])=>{path([[x-16,y-16],[x+16,y+16]],orange,8);path([[x-16,y+16],[x+16,y-16]],orange,8)});
  [[371,83],[301,223]].forEach(([x,y])=>{g.beginPath();g.arc(x,y,18,0,2*Math.PI);g.lineWidth=7;g.strokeStyle=white;g.stroke()});
}
const scenes=[glove,documents,library,flow,game];
const controls=[...document.querySelectorAll(".selectors button")];
const featured=document.querySelector("#featured");
function select(index){
  const [id,name,category]=projects[index];
  document.querySelector(".explorer").dataset.project=id;
  featured.href="#"+id;featured.textContent=name;
  document.querySelector("#kind").textContent=category;
  document.querySelector("#counter").textContent=String(index+1).padStart(2,"0")+" / 05";
  controls.forEach((b,i)=>b.setAttribute("aria-pressed",String(i===index)));
  g.clearRect(0,0,canvas.width,canvas.height);scenes[index]();
}
controls.forEach((b,i)=>b.addEventListener("click",()=>select(i)));
featured.addEventListener("click",()=>{document.querySelector(featured.hash).open=true});
function revealLinkedProject(){
  const target=document.getElementById(location.hash.slice(1));
  if(target instanceof HTMLDetailsElement)target.open=true;
}
window.addEventListener("hashchange",revealLinkedProject);
revealLinkedProject();select(0);
