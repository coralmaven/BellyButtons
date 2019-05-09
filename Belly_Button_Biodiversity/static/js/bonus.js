function buildGauge(frequency){

    level = frequency * 20;
    console.log(level);
    
    // Trig to calc meter point
    var degrees = 180 - level,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    let data = [{ type: 'scatter',
    x: [0], y:[0],
        marker: {size: 28, color:'850000'},
        showlegend: false,
        name: 'frequency',
        text: level,
        hoverinfo: 'text+name'},
    { values: [1,1,1,1,1,1,1,1,1,9],
    rotation: 90,
    //text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
    text: ['8-9','7-8','6-7','5-6','4-5','3-4','2-3','1-2','0-1'],
    textinfo: 'text',
    textposition:'inside',

    marker: {colors:['rgba(110, 154, 22, .5)',
    'rgba(14, 127, 0, .5)',
    'rgba(110, 154, 22, .5)',
    'rgba(14, 127, 0, .5)',
    'rgba(110, 154, 22, .5)',
    'rgba(14, 127, 0, .5)',
    'rgba(110, 154, 22, .5)',
    'rgba(14, 127, 0, .5)',
    'rgba(110, 154, 22, .5)',
    'rgba(0, 0, 0, 0)']},

    labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
    hoverinfo: 'label',
    hole: .5,
    type: 'pie',
    showlegend: false
    }];

    var layout = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
            color: '850000'
        }
        }],
    title: '<b>Belly Button Washing Frequency</b><br>Scrubs per Week',
    xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot('gauge', data, layout);
}
