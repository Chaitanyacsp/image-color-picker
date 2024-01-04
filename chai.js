var img = _('.thumb img'),
    cv = _('#canv'),
    colorVal = _('.colorVal'),
    bgview = _('.bgview'),
    x = '',
    y = '';

// img click function
img.addEventListener('click', function(e){
  // for chrome
  if(e.offsetX) {
    x = e.offsetX;
    y = e.offsetY; 
  }
  // for firefox
  else if(e.layerX) {
    x = e.layerX;
    y = e.layerY;
  }
  grabCanvas(cv,img,function(){
    // image data
    var $ = cv.getContext('2d')
    .getImageData(x, y, 1, 1).data;
    // show info
    colorVal.innerHTML = '<span>HEX: '+rgbToHex($[0],$[1],$[2])+'</span>'+
     '<span>RGB: rgb('+
      $[0]+','+
      $[1]+','+
      $[2]+')</span>';
    
    // place chosen color as body background
    document.body.style.background =rgbToHex($[0],$[1],$[2]);
  });
},false);

// preview color possibilities as mouse moves over image
img.addEventListener('mousemove', function(e){
  // chrome
  if(e.offsetX) {
    x = e.offsetX;
    y = e.offsetY; 
  }
  // firefox
  else if(e.layerX) {
    x = e.layerX;
    y = e.layerY;
  }
  
  grabCanvas(cv,img,function(){
    
    // image data
    var $ = cv.getContext('2d')
    .getImageData(x, y, 1, 1).data;
    // preview color
    bgview.style.background = rgbToHex($[0],$[1],$[2]);
  });
},false);


// canvas function
function grabCanvas(el,image,callback){
  el.width = image.width; // element / img width
  el.height = image.height; // element /img height
  // draw image in canvas tag
  el.getContext('2d')
  .drawImage(image, 0, 0, image.width, image.height);
  return callback();
}
// querySelector
function _(el){
  return document.querySelector(el);
};

/* convert rgba to hex > reference http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb */
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}