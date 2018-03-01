# D3js tweaks source from Jason Davis repo
# this is specifically for Mode analytics visualization
<div class="mode-header embed-hidden">
  <h1>{{trial3}}</h1>
  <p>{{ description }}</p>
</div>

<div style="width: 800px; margin: 0 auto;" id="cloud"></div>

<script src="//cdn.rawgit.com/jasondavies/d3-cloud/master/build/d3.layout.cloud.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>

<script>(function() {

var columns = {
  wordColumn: "word",
  frequencyColumn: "frequency"
}

var textScale = d3.scale.linear()
    .domain(d3.extent(dataset.content,function(d) { return d[columns.frequencyColumn]; } ))
    .range([12,100]);
  
var fill = d3.scale.category20c();

var layout = d3.layout.cloud()
    .size([800, 500])
    .words(dataset.content.map(function(d) {
      return {text: d.word, size: textScale(d.frequency) };
    }))
    .padding(2)
    // .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .rotate(function() { return (~~(Math.random() * 6) - 3) *0; })
    .font("Algerian")
    .fontSize(function(d) { return d.size; })
    .on("end", draw);

layout.start();

function draw(words) {
  d3.select("#cloud").append("svg")
      .attr("width", layout.size()[0])
      .attr("height", layout.size()[1])
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
      .data(words)
    .enter().append("text")
      .style("font-size", function(d) { return d.size + "px"; })
      .style("font-family", "Algerian")
      .style("fill", function(d, i) { return fill(i); })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });
}
})();</script>
