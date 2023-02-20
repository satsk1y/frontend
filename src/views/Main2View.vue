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
                    </div>
                  
                </div>
            
                <!-- Right sidebar -->
                <div class="sidebar-right">
                  <template v-if="content === 'singleButton'">
                    <h2>Find One node</h2>
                    <select v-model="selectedNodeType">
                      <option value="Movie">Movie</option>
                      <option value="Person">Person</option>
                    </select>
                    
                    <input v-if="selectedNodeType === 'Movie'" type="text" placeholder="title" v-model="title">
                    <input v-if="selectedNodeType === 'Person'" type="text" placeholder="name" v-model="name">
                    <select v-model="selectedLevel">
                      <option value="1">1 level</option>
                      <option value="2">2 level</option>
                      <option v-if="selectedNodeType === 'Person' || selectedNodeType === 'Movie'" value="3">3 level</option>
                    </select>
                    
                    <button v-if="selectedNodeType && selectedLevel" @click="findNode">Find</button>
                  
                  </template>
                  <template v-if="content === 'twoInputs'">
                    <h2>Find Two node</h2>
                    <select v-model="selectedNodeType">
                      <option value="Movie">Movie</option>
                      <option value="Person">Person</option>
                    </select>
                    
                    <input v-if="selectedNodeType === 'Movie'" type="text" placeholder="title" v-model="title">
                    <input v-if="selectedNodeType === 'Person'" type="text" placeholder="name" v-model="name">
                    
                    <select v-model="selectedNodeType1">
                      <option value="Movie">Movie</option>
                      <option value="Person">Person</option>
                    </select>
                    
                    <input v-if="selectedNodeType1 === 'Movie' " type="text" placeholder="title" v-model="title1">
                    <input v-if="selectedNodeType1 === 'Person' " type="text" placeholder="name" v-model="name1">
  
                    <button v-if="selectedNodeType && selectedNodeType1" @click="findPath">Find</button>
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
      if(item._fields[i].properties.poster === null){
        node_infs.push({id: item._fields[i].elementId, shape:'dot',  title: 'Person', label: item._fields[i].properties.name})
  ids.push(item._fields[i].elementId)
      }
      else{
        node_infs.push({id: item._fields[i].elementId, shape:'dot',  title: 'Person', label: item._fields[i].properties.name})
  ids.push(item._fields[i].elementId)
      }
  
  }
  }
  if(item.keys[i][0] === 'm'){
    if(!ids.includes(item._fields[i].elementId)){
      if(item._fields[i].properties.poster === null){
        node_infs.push({id: item._fields[i].elementId,  shape:'dot', title: item._fields[i].labels[0], label: item._fields[i].properties})
  ids.push(item._fields[i].elementId)
      }
      else{
        node_infs.push({id: item._fields[i].elementId,  shape:'dot', title: item._fields[i].labels[0], label: item._fields[i].properties.title})
  ids.push(item._fields[i].elementId)
      }
  
  }
  }
  if(item.keys[i][0] === 'g' || item.keys[i][0] === 'u'){
  if(!ids.includes(item._fields[i].elementId)){
  node_infs.push({id: item._fields[i].elementId, shape:'dot', title: item._fields[i].labels[0], label: item._fields[i].properties.name })
  ids.push(item._fields[i].elementId)
  }
  }
  if(item.keys[i][0] === 'r'){
    if(!ids.includes(item._fields[i].elementId))
    rels.push({from: item._fields[i].startNodeElementId, to: item._fields[i].endNodeElementId, color: 'Green', label:item._fields[i].type, id:item._fields[i].elementId})
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
  name1:''
    }
  
  },
  methods: {
    changeContent(content) {
      this.content = content;
    },
    findNode() {
        
        axios.get('http://localhost:3000/find-node/', { 
          params: {
            selectedNodeType: this.selectedNodeType,
            selectedLevel: this.selectedLevel,
            name: this.name,
            title:this.title
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
      
    node_infs.push()
    
    
    var network = new vis.Network(container, data, options);   
    console.log(typeof(network))
    network.on( 'click', function(properties) {
      
      var ids = properties.nodes;
    var clickedNodes = nodes.get(ids);
    console.log('clicked nodes:', clickedNodes);
    var datafor = {label: clickedNodes[0].label, title: clickedNodes[0].title }
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
        console.log(segments)
        for(let i = 0; i < segments.length; i++){
        if(!ids.includes(segments[i].start.elementId)){
        nodes.push({shape: 'dot', id: segments[i].start.elementId, label: segments[i].start.labels[0], title: segments[i].start.title})
        ids.push(segments[i].start.elementId)
      }
      if(!ids.includes(segments[i].end.elementId)){
        nodes.push({shape: 'dot', id: segments[i].end.elementId, label: segments[i].end.labels[0], title: segments[i].end.title})
        ids.push(segments[i].end.elementId)
      }
        rels.push({from: segments[i].relationship.startNodeElementId, to: segments[i].relationship.endNodeElementId, id: segments[i].relationship.elementId} )
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
      console.log(data)
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
    network.on( 'click', function(properties) {
      
      var ids = properties.nodes;
    var clickedNodes = nodes.get(ids);
    console.log('clicked nodes:', clickedNodes);
    var datafor = {label: clickedNodes[0].label, title: clickedNodes[0].title }
    axios.get('http://localhost:3000/expand-node/', { 
          params: {
            label: datafor.label,
            title: datafor.title
          }
    })
    .then(response => {
      console.log(response.data)
      const info = response.data
      parse(response.data, nodes, ids, rels)
  nodes.update(nodes)
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
  background-color: #007bff;
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
  
  </style>