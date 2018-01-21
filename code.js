



var mapi;
var widd = window.innerWidth;
var wid = widd - 100
//var hei = window.innerHeight;
var wid = 1024;
var hei = innerHeight;
//var hei = 512;
var zoomlevel;

var centerlat = 0;
var centerlon = 0;


var lat;
var lon;

var quakes;


var maplink;
var mapi;

function preload() {
  quakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
}

function loadmap() {
  var val = slider.value();
  zoomlevel = val
  var xx = sliderx.value();
  lat = xx - 180
  var yy = slidery.value();
  lon = yy - 90
  maplink = "https://api.mapbox.com/styles/v1/mapbox/navigation-preview-night-v2/static/" + lat + "," + lon + "," + zoomlevel + ",0,0/" + wid + "x" + hei + "?access_token=pk.eyJ1IjoiY2hlZXNlY29ubm9pc3NldXIiLCJhIjoiY2pjbnNmenFtMW51cjJ4czN5eTRmMDQ4MCJ9.xH4MU6UnJzlHGVT8dEC6Bw" ;
  mapi = loadImage(maplink, setcalc);
}





function setup(){
  createCanvas(wid,hei);
  translate(width / 2, height / 2);
  createP("zoom:")
  slider = createSlider(1, 15, 1, 1);
  createP("lattitude")
  sliderx = createSlider(1, 360, 180, 0.2);
  createP("longitude")
  slidery = createSlider(1, 180, 90, 0.2);
  slider.style('width', '400px');
  sliderx.style('width', '400px');
  rotate(HALF_PI)
  slidery.style('width', '400px');
  var val = slider.value();
  var xx = sliderx.value();
  var yy = slidery.value();
  zoomlevel = val;
  lat = xx
  lon = yy

  loadmap()
  setcalc()
}


function setcalc() {
  //var ctx = (a canvas context);
  //ctx.canvas.width  = window.innerWidth;
  //ctx.canvas.height = window.innerHeight;

  //loadmap()



  var centerx = mapx(centerlon);
  var centery = mapy(centerlat);

  colorMode(HSB,360,100,100,255);


  for (var i = 0; i <quakes.length; i++) {
    var data = quakes[i].split(/,/) //gay regular expression
    //console.log(data);
    var lat = data[1];
    var lon = data[2];
    var scale = data[4];
    var scalecol = data[4];
    var x = mapx(lon) - centerx;
    var y = mapy(lat) - centery;

    scale = pow(10, scale) // richter scale is logarithemic, each one is ten times the previois this is like an inverse logarithemic
    scale = sqrt(scale) //need the square root because of pi r squared uno

    var magmax = sqrt(pow(10, 10))



    var col = map(scalecol, 0 , 10 , 0 , 255)
    var d = map(scale, 0 , 180 , 0 , 6);
    //var d = map(scale, 0, 10, 0, 180);
    //stroke(255,0,0);

    //fill(255,0,0,200);
    fill(col,col,col, 125);
    ellipse(x,y,d,d);

  }




}

function draw() {
  frameRate(1)
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapi, 0 ,0);
  loadmap();
  setcalc();

  //console.log(zoomlevel)
  //image(mapi, 0, height/2, img.width/2, img.height/2);

}





//equationsss ---> https://en.wikipedia.org/wiki/Web_Mercator
function mapx(long) {
  long = radians(long);
  var part1 = (256 / PI) * pow(2,zoomlevel);
  var part2 = long + PI;
  var part3 = part1 * part2;
  return part3;
}

function mapy(lat) {
  lat = radians(lat);
  var part1 = (256 / PI) * pow(2,zoomlevel);
  var part2 = tan(PI / 4 + lat / 2);
  // natural log, base e
  var part3 = PI - log(part2);
  var part4 = part1 * part3;
  return part4;
}
