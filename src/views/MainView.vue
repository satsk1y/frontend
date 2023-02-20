<template>
  <div class="wrapper">
          <div id="app">
              <!-- Left sidebar -->
              <div class="sidebar-left">
                  <div class="sidebar-items">
                      <div class="sidebar-item" @click="changeContent('singleButton')" >
                          <img src="@/img/just/icons8-target-64.png" alt="">
                        </div>
                        <div class="sidebar-item" @click="changeContent('twoInputs')">
                          <img src="@/img/just/icons8-link-64.png" alt="">
                        </div>
                        <div class="sidebar-item" @click="changeContent('groupOfNodes')">
                          <img src="@/img/just/icons8-complexity-64.png" alt="">
                        </div>
                        <div class="sidebar-item" @click="changeContent('allOfNodes')">
                          <img src="@/img/just/icons8-survey-64.png" alt="">
                        </div>
                  </div>
                
              </div>
          
              <!-- Right sidebar -->
              <div class="sidebar-right">
                <template v-if="content === 'singleButton'">
                  <h2>Find One node</h2>
                  <div class="selected_model">
                    <select v-model="selectedNodeType" class="select">
                    <option value="Movie">Movie</option>
                    <option value="Person">Person</option>
                    <option value="User">User</option>
                    <option value="Genre">Genre</option>
                  </select>
                </div>
                  
                  
                  <input v-if="selectedNodeType === 'Movie'" type="text" placeholder="title" v-model="title">
                  <input v-if="selectedNodeType === 'Person'" type="text" placeholder="name" v-model="name">
                  <input v-if="selectedNodeType === 'User'" type="text" placeholder="name" v-model="name">
                  <input v-if="selectedNodeType === 'Genre'" type="text" placeholder="name" v-model="name">
                  <div class="selected_model">
                    <select v-if="selectedNodeType" v-model="selectedLevel" class="select">
                    <option value="1">1 level</option>
                    <option value="2">2 level</option>
                    <option v-if="selectedNodeType === 'Person' || selectedNodeType === 'Movie'" value="3">3 level</option>
                  </select>
                  </div>
                  <div v-if="selectedNodeType === 'Genre' && selectedLevel === '2'" class="slider">
                        <div class="slider__title">
                          Objects
                        </div>
                        <input type="range" min="0" max="100" v-model="sliderValue" class="slider" />
                      <span class="slider-value">{{ sliderValue }}</span>
                      </div>
                      <div v-if="selectedNodeType === 'Genre' && selectedLevel === '2'" class="slider">
                        <div class="slider__title">
                          Rating
                        </div>
                        <input type="range" min="0" max="10" v-model="sliderValue1" class="slider" />
                      <span class="slider-value">{{ sliderValue1 }}</span>
                      </div>
                 
                  
                  <button v-if="selectedNodeType && selectedLevel" @click="findNode">Find</button>
                
                </template>
                <template v-if="content === 'twoInputs'">
                  <h2>Find Two node</h2>
                  <div class="selected_model">
                    <select v-model="selectedNodeType" class="select">
                    <option value="Movie">Movie</option>
                    <option value="Person">Person</option>
                  </select>
                  </div>
                  
                  
                  <input v-if="selectedNodeType === 'Movie'" type="text" placeholder="title" v-model="title">
                  <input v-if="selectedNodeType === 'Person'" type="text" placeholder="name" v-model="name">
                  <div class="selected_model">
                    <select v-model="selectedNodeType1" class="select">
                    <option value="Movie">Movie</option>
                    <option value="Person">Person</option>
                  </select>
                  </div>
                  
                  
                  <input v-if="selectedNodeType1 === 'Movie' " type="text" placeholder="title" v-model="title1">
                  <input v-if="selectedNodeType1 === 'Person' " type="text" placeholder="name" v-model="name1">

                  <button v-if="selectedNodeType && selectedNodeType1" @click="findPath">Find</button>
                </template>
                <template v-if="content === 'groupOfNodes'">
                  <h2>Group of Nodes</h2>
                  <div class="groups">
                      <div class="selected_model">
                        <select v-model="selectedNodeType" class="select">
                    <option value="Movie">Movie</option>
                    <option value="Person">Person</option>
                    <option value="Genre">Genre</option>
                    <option value="Director">Director</option>
                    <option value="Actor">Actor</option>
                    
                  </select>
                      </div>
                      <div v-if="selectedNodeType" class="slider">
                        <input type="range" min="0" max="100" v-model="sliderValue" class="slider" />
                      <span class="slider-value">{{ sliderValue }}</span>
                      </div>
                      
                      
                  </div>
                  <button @click = "findGroup" class="btn">Display</button>
                </template>
                <template v-if="content === 'allOfNodes'">
                  <h2>Display all</h2>

                  <button style="margin-top: 15px;">Display</button>
                </template>
              </div>
          
          </div>
  
          <div id="mynetwork">
            
          </div>

      </div>
</template>

<script>

import axios from 'axios'
import vis from 'vis'


function parse(info, node_infs, ids, rels){
  console.log('here is info', info)
  var item
for(let j = 0; j < info.length; j++){
  item = info[j]
  

for(let i = 0; i < item.keys.length; i++){
if(item.keys[i][0] === 'p'){
  if(!ids.includes(item._fields[i].elementId)){
    if(item._fields[i].properties.poster !== undefined){
      node_infs.push({id: item._fields[i].elementId, shape:'circularImage',  title: item._fields[i].labels[0], label: item._fields[i].properties.name, image:item._fields[i].properties.poster})
ids.push(item._fields[i].elementId)
    }
    else{
      node_infs.push({id: item._fields[i].elementId, shape:'circularImage',  title: item._fields[i].labels[0], label: item._fields[i].properties.name, image:"https://static.vecteezy.com/system/resources/previews/006/675/489/original/actor-line-circle-background-icon-vector.jpg"})
ids.push(item._fields[i].elementId)
    }

}
}
if(item.keys[i][0] === 'm'){
  if(!ids.includes(item._fields[i].elementId)){
    if(item._fields[i].properties.poster !== undefined ){
      node_infs.push({id: item._fields[i].elementId,  shape:'circularImage', title: item._fields[i].labels[0], label: item._fields[i].properties.title,image :item._fields[i].properties.poster})
ids.push(item._fields[i].elementId)
    }
    else{
      node_infs.push({id: item._fields[i].elementId,  shape:'circularImage', title: item._fields[i].labels[0], label: item._fields[i].properties.title, image:"https://images.freecreatives.com/wp-content/uploads/2017/10/flat-clapperboard-icon_1063-38.jpg"})
ids.push(item._fields[i].elementId)
    }

}
}
if(item.keys[i][0] === 'g' || item.keys[i][0] === 'u'){
if(!ids.includes(item._fields[i].elementId)){
  if(item._fields[i].properties.image !== undefined ){
    node_infs.push({id: item._fields[i].elementId, shape:'circularImage', title: item._fields[i].labels[0], label: item._fields[i].properties.name, image:item._fields[i].properties.image })
ids.push(item._fields[i].elementId)
  }
  else{
    node_infs.push({id: item._fields[i].elementId, shape:'dot', title: item._fields[i].labels[0], label: item._fields[i].properties.name })
ids.push(item._fields[i].elementId)
  }
  
    
  

}
}
if(item.keys[i][0] === 'r'){
  if(!ids.includes(item._fields[i].elementId))
  rels.push({from: item._fields[i].startNodeElementId, to: item._fields[i].endNodeElementId, color: 'red', label:item._fields[i].type, id:item._fields[i].elementId})
  ids.push(item._fields[i].elementId)
}
}


}
}




let info = '';
export default({
  name: 'Main',
data() {
  return {
      content: '',
selectedNodeType: '',
selectedNodeType1:'',
selectedLevel: '',
title:'',
name:'',
title1:'',
name1:'',
Name:[],
sliderValue: 50,
sliderValue1: 5,
node_info: []

  }

},
methods: {
  changeContent(content) {
    this.content = content;
  },

  findGroup(){
    axios.get('http://localhost:3000/group-nodes/', {
      params: {
        selectedNodeType: this.selectedNodeType,
        sliderValue: this.sliderValue,
      }
    })
    .then(response => {
      this.node_info
      var node_infs = [];
    var ids = []
    var rels = []
    parse(response.data, node_infs, ids, rels)
    var nodes = new vis.DataSet(node_infs);

    var edges = new vis.DataSet(rels);
    var container = document.getElementById("mynetwork");
    var data = {
      nodes: nodes,
      edges: edges,
    };
    var options = {
      nodes: {
          
          size: 30,
        },
        layout: {
          randomSeed: 34,
        },
        
      };
    var network = new vis.Network(container, data, options);   
  console.log(typeof(network))
  network.on('click', function(properties) {
    var ids = properties.nodes;
    
  var clickedNodes = nodes.get(ids);
  this.selectedNode = clickedNodes;
  console.log('clicked nodes:', clickedNodes);
  
  
  })


  network.on( 'doubleClick', function(properties) {
    
    var ids = properties.nodes;
  var clickedNodes = nodes.get(ids);
  console.log('clicked nodes:', clickedNodes);
  var datafor = {label: clickedNodes[0].label, title: clickedNodes[0].title }
  this.Name = datafor
  axios.get('http://localhost:3000/expand-node/', { 
        params: {
          label: datafor.label,
          title: datafor.title
        }
  })
  .then(response => {
    console.log(response.data)
    var node_infs = [];
    var ids = []
    var rels = []
    const info = response.data
    parse(response.data, node_infs, ids, rels)
nodes.update(node_infs)
edges.update(rels)
    
  })
  // console.log('clicked nodes:', clickedNodes[0].label, clickedNodes[0].title);
  
  // nodes.update(expanded_Node.nodes)

  
});     // network.on
    })
      
    
  },
  findNode() {
      
      axios.get('http://localhost:3000/find-node/', { 
        params: {
          selectedNodeType: this.selectedNodeType,
          selectedLevel: this.selectedLevel,
          name: this.name,
          title:this.title,
          sliderValue: this.sliderValue,
          sliderValue1: this.sliderValue1
        }
      })
      .then(response => {
        info = response.data
    console.log(info)
    var node_infs = [];
    var ids = []
    var rels = []
    parse(info, node_infs, ids, rels)
    // console.log(response.data)
    


    
    // console.log(node_infs)
    var nodes = new vis.DataSet(node_infs);

    var edges = new vis.DataSet(rels);

    var options = {
      nodes: {
          
          size: 30,
        },
        
        
      };
      


    // create a network
    var container = document.getElementById("mynetwork");
    var data = {
      nodes: nodes,
      edges: edges,
    };
    
  
  
  
  var network = new vis.Network(container, data, options);   
  
  console.log(typeof(network))
  network.on( 'doubleClick', function(properties) {
    
    var ids = properties.nodes;
  var clickedNodes = nodes.get(ids);
  console.log('clicked nodes:', clickedNodes);
  var datafor = {label: clickedNodes[0].label, title: clickedNodes[0].title }
  this.Name = datafor
  axios.get('http://localhost:3000/expand-node/', { 
        params: {
          label: datafor.label,
          title: datafor.title
        }
  })
  .then(response => {
    console.log(response.data)
    var node_infs = [];
    var ids = []
    var rels = []
    const info = response.data
    parse(response.data, node_infs, ids, rels)
nodes.update(node_infs)
edges.update(rels)
    
  })
  // console.log('clicked nodes:', clickedNodes[0].label, clickedNodes[0].title);
  
  // nodes.update(expanded_Node.nodes)

  
});     // network.on
      })

      
}, // findnode


findPath(){
  axios.get('http://localhost:3000/find-path/', {

    params: {
          selectedNodeType1: this.selectedNodeType1,
          selectedNodeType: this.selectedNodeType,
          name: this.name,
          title:this.title,
          name1: this.name1,
          title1:this.title1
        }
  }).then(response => {
    var nodes = []
    var rels = []
    var ids = []
    var info = response.data
    var segments = ''
    console.log('this is response data for path' ,info)
    for(let j = 0; j < info.length; j++){
      segments = info[j]._fields[0].segments
      console.log('segments',segments)
      for(let i = 0; i < segments.length; i++){
      if(!ids.includes(segments[i].start.elementId)){
        if(segments[i].start.labels[0] === 'Movie'){
          if(segments[i].start.properties.poster !== undefined){
          nodes.push({shape: 'circularImage', id: segments[i].start.elementId, label: segments[i].start.properties.title, title: segments[i].start.labels[0], image:segments[i].start.properties.poster})
      ids.push(segments[i].start.elementId)
        }
        else{
          nodes.push({shape: 'circularImage', id: segments[i].start.elementId, label: segments[i].start.properties.title, title: segments[i].start.labels[0], image:'https://static.vecteezy.com/system/resources/previews/006/675/489/original/actor-line-circle-background-icon-vector.jpg'})
        }
        }
        else{
          if(segments[i].start.properties.poster !== undefined){
          nodes.push({shape: 'circularImage', id: segments[i].start.elementId, label: segments[i].start.properties.name, title: segments[i].start.labels[0], image:segments[i].start.properties.poster})
      ids.push(segments[i].start.elementId)
        }
        else{
          nodes.push({shape: 'circularImage', id: segments[i].start.elementId, label: segments[i].start.properties.name, title: segments[i].start.labels[0], image:'https://static.vecteezy.com/system/resources/previews/006/675/489/original/actor-line-circle-background-icon-vector.jpg'})
        }
        }
        
                // start node
    }

    if(!ids.includes(segments[i].end.elementId)){
        if(segments[i].end.labels[0] === 'Movie'){
          if(segments[i].end.properties.poster !== undefined){
          nodes.push({shape: 'circularImage', id: segments[i].end.elementId, label: segments[i].end.properties.title, title: segments[i].end.labels[0], image:segments[i].end.properties.poster})
      ids.push(segments[i].end.elementId)
        }
        else{
          nodes.push({shape: 'circularImage', id: segments[i].end.elementId, label: segments[i].end.properties.title, title: segments[i].end.labels[0], image:'https://static.vecteezy.com/system/resources/previews/006/675/489/original/actor-line-circle-background-icon-vector.jpg'})
        }
        }
        else{
          if(segments[i].end.properties.poster !== undefined){
          nodes.push({shape: 'circularImage', id: segments[i].end.elementId, label: segments[i].end.properties.name, title: segments[i].end.labels[0], image:segments[i].end.properties.poster})
      ids.push(segments[i].end.elementId)
        }
        else{
          nodes.push({shape: 'circularImage', id: segments[i].end.elementId, label: segments[i].end.properties.name, title: segments[i].end.labels[0], image:'https://static.vecteezy.com/system/resources/previews/006/675/489/original/actor-line-circle-background-icon-vector.jpg'})
        }
        }
      }
    
    
      if(!ids.includes(segments[i].relationship.elementId))
      rels.push({from: segments[i].relationship.startNodeElementId, to: segments[i].relationship.endNodeElementId, id: segments[i].relationship.elementId} )
      ids.push(segments[i].relationship.elementId)
    }
    }
    
    for(let i = 0; i < nodes.length; i++){
      console.log(nodes[i])
    }
    console.log('')
    for(let i = 0; i < rels.length; i++){
      console.log(rels[i])
    }
    console.log('this is from video', response)
    
    var container = document.getElementById("mynetwork");
    var nodes = new vis.DataSet(nodes);

    var edges = new vis.DataSet(rels);

    var data = {
      nodes: nodes,
      edges: edges,
    };
    console.log('data', data)
    var options = {
      nodes: {
          
          size: 30,
        },
        layout: {
          randomSeed: 34,
        },
        
      };
    var container = document.getElementById("mynetwork");


  var network = new vis.Network(container, data, options);  
  
  network.on('click', function(properties) {
    var ids = properties.nodes;
  var clickedNodes = nodes.get(ids);
  console.log('clicked nodes:', clickedNodes);
  })
  network.on('doubleClick', function(properties) {
    
    var ids = properties.nodes;
  var clickedNodes = nodes.get(ids);

  console.log('clicked nodes:', clickedNodes);  
  var datafor = {label: clickedNodes[0].label, title: clickedNodes[0].title }
  // Name = datafor.title
  // Label = datafor.label
  console.log(datafor)
  axios.get('http://localhost:3000/expand-node/', { 
        params: {
          title: datafor.title,
          label: datafor.label
          
        }
  })
  .then(response => {
    var nodess = []
    var ids = []
    var rels = []
    console.log('this is response',response.data)
    
    const info = response.data
    parse(response.data, nodess, ids, rels)
nodes.update(nodess)
edges.update(rels)
    
  })
  // console.log('clicked nodes:', clickedNodes[0].label, clickedNodes[0].title);
  
  // nodes.update(expanded_Node.nodes)

  
}); 
  
  })

  
  

},
}   // methods


});  // vue







// here it is





</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

html, body {
  font: 16pt arial;
}
#mynetwork {
  width: 1000px;
  height: 100vh;
  border: 1px solid lightgray;
}

#viz {
  width: 900px;
  height: 700px;
  border: 1px solid lightgray;
  font: 22pt arial;
}

.body, *{
margin:0;
padding:0;
font-family: Arial, Helvetica, sans-serif;
}
.sidebar-left {
float: left;
width: 50px;
background-color: #323652;
height: 100%;
}

.sidebar-left .sidebar-item {
padding: 5px 0 5px 2px;
cursor: pointer;
border-radius: 15px;
margin-top: 15px;
}
.sidebar-left .sidebar-item:hover{
  background-color: #8B95EA;
}

/* Right sidebar styles */
.sidebar-right {
float: left;
width: 200px;
background-color: #222430;
padding: 50px 50px 50px 20px;
}

.sidebar-right h2 {
margin: 0;
color:#fff;
margin-bottom: 15px;
font-size: 26px;
}

.sidebar-right input[type="text"] {
padding: 10px;
width: 100%;
margin-bottom: 10px;
border-radius: 5px;
border: 1px solid #ccc;
}

.sidebar-right button {
padding: 10px 20px;
background-color: #F02DF4;
color: #fff;
border: none;
border-radius: 5px;
cursor: pointer;
}
.sidebar-items{
  background-color: #0A3790;
  padding: 30px 0;
  border-radius: 15px;
  margin-top: 100px;
}
.wrapper{
display: flex;
justify-content: start;
}
#app{
display: flex;
}
.group_row{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
  
}
.groups{
  margin: 10px 0;
}
.group{
  padding: 2px 5px 2px 10px;
  font-size: 15px;
  color:#000;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #fff;
  border-radius: 20px;
  margin-right: 10px;
}
.group:active{
  background-color: red;
}
.info-node{
  position: absolute;
  z-index: 10;
  top: 20px;
  right:10px;
  font-size: 100px;
}

.slider-value{
  color:#fff;
  padding-left: 10px;
}

.select{
  padding:6px 0;
  width:221px;
  border-radius: 10px;
}
.option{
  border-radius: 1px;
}
.selected_model{
  padding-bottom: 10px;
}
button{
  width: 220px;
  color: #F02DF4;
}
.slider__title{
  color:#fff;
  font-family: 'Roboto', sans-serif;
}



</style>