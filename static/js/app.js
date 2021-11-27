function bellyButton(id) {

  d3.json("samples.json").then((data) => {


    let samplesFiltered = data.samples.filter(obj => obj.id == id);



    let otu_ids_OTU = samplesFiltered[0].otu_ids.map(otu => "OTU " + otu);
    let otu_labels = samplesFiltered[0].otu_labels;
    let sample_values = samplesFiltered[0].sample_values;
    let otu_ids = samplesFiltered[0].otu_ids;


    let otu_ids_slice = otu_ids_OTU.slice(0, 10).reverse();
    let otu_labels_slice = otu_labels.slice(0, 10).reverse();
    let sample_values_slice = sample_values.slice(0, 10).reverse();


    var barTrace = {
      x: sample_values_slice,
      y: otu_ids_slice,
      orientation: 'h',
      type:'bar',
      text: otu_labels
    };
    
    var barData = [barTrace];

    var layout = {
      width: 1000
     }
    Plotly.newPlot('bar', barData, layout); 

    var bubbleTrace = {
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values
      }
    };
    
    var bubbleData = [bubbleTrace];
    
    var layout = {
      
      showlegend: false,
      height: 600,
      width: 1000
    };
    
    Plotly.newPlot('bubble', bubbleData, layout);
  
   
    let metaDataFiltered = data.metadata.filter(obj => obj.id == id);

    console.log(metaDataFiltered);

    let dataBox = d3.select("#sample-metadata");
    
    dataBox.html("")
    Object.entries(metaDataFiltered[0]).forEach(([key, value]) => {
      
    
      dataBox.append("h5").text(key + ":" + value)
    });
    
  })
}

d3.json("samples.json").then((data) => {

  let dropdown = d3.select("#selDataset");

  data.names.forEach((id) => {

    dropdown.append("option").text(id).property("value", id);

  })

  bellyButton(data.names[0])

})


function optionChanged(selectedID) {

  bellyButton(selectedID)
}