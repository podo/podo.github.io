(function(){
  var pi = Math.PI;
  var sin = Math.sin;
  var floor = Math.floor;
  var abs = Math.abs;
  var pow = Math.pow;

  var epoch = function() { return new Date().getTime()/2000; }

  function clip(min, n, max) {
  	if (min > n) { return min; }
  	if (max < n) { return max; }
  	return n;
  }

  function K(h) {
  	h *= -1;
  	var r = sin(pi * h);
  	var g = sin(pi * (h + 1/3));
  	var b = sin(pi * (h + 2/3));
  	return [r, g, b].map(function (c) {
  		c = c*c;
  		c = 0.85 + (c*0.15);
  		return floor(c * 255);
  	});
  }

  function recolor(plus) {
  	var cycle = ((epoch()/75) + plus) % 1;
  	var color = K(cycle);
  	color = 'rgba(' + color.join(',') + ', 0.5)';
  	$('body').css({'background-color': color});
  }

  $(document).ready(function(){
  	recolor(0);
  	a = function() { setInterval(function() { recolor(0) }, 16); }
  	a();
  });

})();
