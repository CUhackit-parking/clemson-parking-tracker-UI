

d3.json('../data/map.geojson').then(function(bb) {
  let width = 900, height = 600;

  // Create a unit projection.
  
  var projection = d3.geoMercator()
  // .scale(1)
  // .translate([0, 0]);

  // Create a path generator.
  var path = d3.geoPath()
  .projection(projection);

  let svg = d3.select("body").append('svg')
    .style("width", width).style("height", height);

  svg.append('g').selectAll('path')
    .data(bb.features)
    .join('path')
    .attr('d', path)
    .attr('fill', 'white')
    .attr('stroke', 'black');

  // // Compute the bounds of a feature of interest, then derive scale & translate.
  // var b = path.bounds(state),
  // s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
  // t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

  // // Update the projection to use computed scale & translate.
  // projection
  // .scale(s)
  // .translate(t);

  fetch('https://getpantry.cloud/apiv1/pantry/b3e96063-a141-4c97-8deb-ca7ae6b8fe83/basket/parking1')
    .then((response) => response.json())
    .then((data) => console.log(data));
});