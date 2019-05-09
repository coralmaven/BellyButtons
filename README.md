# Belly Button Biodiversity

![Bacteria by filterforge.com](Images/bacteria_by_filterforgedotcom.jpg)

An interactive dashboard to explore the [Belly Button Biodiversity DataSet](http://robdunnlab.com/projects/belly-button-biodiversity/).

Using Plotly.js to build interactive charts for the dashboard.

* The PIE chart using data from the samples route (`/samples/<sample>`) to display the top 10 samples.
* The Bubble Chart  using data from the samples route (`/samples/<sample>`) to display each sample.
* The sample metadata from the route `/metadata/<sample>` Each key/value pair from the metadata JSON object  on the page
* The Gauge Chart plots the Weekly Washing Frequency obtained from the route `/wfreq/<sample>`
* All of the plots update at any time that a new sample is selected.

Deployed the Flask app to Heroku.

- - -

### Copyright

Data Boot Camp © 2018. All Rights Reserved.
