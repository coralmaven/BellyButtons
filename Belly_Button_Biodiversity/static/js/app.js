async function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

  let sampleMetadata = d3.select("#sample-metadata");
  sampleMetadata.html("");
  metadata = await d3.json("/metadata/".concat(sample));
  for ( var key in metadata){
    sampleMetadata.append("tr")
    .text(key.concat(": ")
    .concat(metadata[key].toString()));
  };
  console.log(metadata);

  // BONUS: Build the Gauge Chart
  buildGauge(metadata.WFREQ);
}

async function buildCharts(sample) {

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
   
  var layout = {
    title: 'Bubble Chart',
    showlegend: true
  };
  
  Plotly.newPlot('bubble', [trace], layout);

  //Pie Chart
  data = [{
    "labels": sampledata.otu_ids.slice(0,10),
    "values": sampledata.sample_values.slice(0,10),
    "type": "pie"}]
  var layout = {title : "Pie chart"}
  Plotly.plot("pie", data, layout);
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
