async function buildMetadata(sample) {

  let sampleMetadata = d3.select("#sample-metadata");
  sampleMetadata.html("");
  metadata = await d3.json("/metadata/".concat(sample));
  for ( var key in metadata){
    sampleMetadata.append("tr").text(key.concat(": ").concat(metadata[key].toString()));
  };
  
  // Build the Gauge Chart
  buildGauge(metadata.WFREQ);
}

async function buildGauge(frequency){
console.log(frequency);

let data = [{
  values: [1,1,1,1,1,1,1,1,1,9],
  rotation: 90,
  //text: ['8-9','7-8','6-7','5-6','4-5','3-4','2-3','1-2','0-1'],
  text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
  textinfo: 'text',
  textposition: 'inside',
  marker: {
    colors: [ 'rgba(110, 154, 22, .5)',
              'rgba(14, 127, 0, .5)',
              'rgba(110, 154, 22, .5)',
              'rgba(14, 127, 0, .5)',
              'rgba(110, 154, 22, .5)',
              'rgba(14, 127, 0, .5)',
              'rgba(110, 154, 22, .5)',
              'rgba(14, 127, 0, .5)',
              'rgba(110, 154, 22, .5)',
              'rgba(0, 0, 0, 0)'
    ]
  },
  hoverinfo: false,
  hole: .5,
  type: 'pie',
  showlegend: false,
  direction: "clockwise"
}];

let layout = {
  title: '<b>Belly Button Washing Frequency</b><br>Scrubs per Week',
  height: 600,
  width: 600,
  xaxis: {
    zeroline: false,
    showticklabels: false,
    showgrid: false,
    fixedrange: true,
    range: [-1, 1]
  },

  yaxis: {
    zeroline: false,
    showticklabels: false,
    showgrid: false,
    fixedrange: true,
    range: [-1, 1]
  }
};

Plotly.newPlot('gauge', data, layout);
s = d3.select("#gauge.pielayer").selectAll(".slice")
    .filter(d3.matcher("1-2"));
console.log(s.select("path.surface"))
 
// add the gauge pointer
// use the frequency value to figure out the slice to point to
// find the center of the guage arccircle.
// The draw a svg line from the center of the arc to the slicetext.
// or to the path of the slice.

}

async function buildCharts(sample) {

  // Using `d3.json` to fetch the sample data for the plots
  sampledata = await d3.json("/samples/".concat(sample));
  metadata = await d3.json("/metadata/".concat(sample));

  // // Bubble Chart for the sample data
  var trace = {
    x: sampledata.otu_ids,
    y: sampledata.sample_values,
    text: sampledata.otd_labels,
    mode: 'markers',
    marker: {
      color: sampledata.otu_ids,
      size: sampledata.sample_values
    }
  };
  
  var data = [trace];
  
  var layout = {
    title: 'Bubble Chart',
    showlegend: true,
    height: 600,
    width: 600
  };
  
  Plotly.newPlot('bubble', data, layout);

  //Pie Chart
  data = [{
    "labels": sampledata.otu_ids.slice(0,9),
    "values": sampledata.sample_values.slice(0,9),
    "type": "pie"}]
  var layout = {title : "Pie chart"}
  Plotly.plot("pie", data, layout);

    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

async function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
