var picsContArr = [], imageCount, toggleCounter = 0;
//Remove based on Position
function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}
//Random ID
function randId() {
  return Math.floor((Math.random() * 10000000) + 1);
}
// Task component - represents a single todo item
Link = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    link: React.PropTypes.object.isRequired
  },
  showDropdown: function(e,f) {
    e.preventDefault();
    for(var i=0; i<document.querySelectorAll('#choice-bar ul').length; i++){
      if (document.querySelectorAll('#choice-bar ul')[i].id !== this.props.link.id){
        document.querySelectorAll('#choice-bar ul')[i].style.display = 'none';
      }
    }
    if(document.querySelector('#choice-bar ul#'+this.props.link.id).style.display === 'block'){
      document.querySelector('#choice-bar ul#'+this.props.link.id).style.display = 'none';
    } else {
      document.querySelector('#choice-bar ul#'+this.props.link.id).style.display = 'block';
    }
  },
  render: function() {
    return (
      <a href="#" id={this.props.link.id} onClick={this.showDropdown}>{this.props.link.label}</a>
    );
  }
});
Hide = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    link: React.PropTypes.object.isRequired
  },
  toggleShow: function(e,f) {
    e.preventDefault();
    if(document.querySelector('#choice-bar a:last-of-type').id === 'hide-bar'){
      for(var i=0; i<document.querySelectorAll('#choice-bar > *:not(#custom-color)').length; i++){
        document.querySelectorAll('#choice-bar > *:not(#custom-color)')[i].style.display = 'none';
      }
      document.querySelector('#choice-bar #hide-bar').style.display='block';
      document.querySelector('#choice-bar #hide-bar').innerHTML = 'Resume Editing';
      document.querySelector('#choice-bar #hide-bar').id = 'show-bar';
    } else {
      for(var i=0; i<document.querySelectorAll('#choice-bar > *:not(#custom-color)').length; i++){
        document.querySelectorAll('#choice-bar > *:not(#custom-color)')[i].style.display = 'inline-block';
      }
      document.querySelector('#choice-bar #show-bar').style.display='block';
      document.querySelector('#choice-bar #show-bar').innerHTML = 'Hide Bar';
      document.querySelector('#choice-bar #show-bar').id = 'hide-bar';
    }
  },
  render: function() {
    return (
      <a href="#" id={this.props.link.id} onClick={this.toggleShow}>{this.props.link.label}</a>
    );
  }
});
Finished = React.createClass({
  propType: {
    link: React.PropTypes.object.isRequired
  },
  finishthis: function(e){
    e.preventDefault();
    $('#modal').show();
  },
  render: function() {
    return (
      <a href="#" id={this.props.link.id} onClick={this.finishthis}>{this.props.link.label}</a>
    );
  }
});
Toggle = React.createClass({
  propType: {
    link: React.PropTypes.object.isRequired
  },
  finishthis: function(e){
    e.preventDefault();
  },
  render: function() {
    return (
      <a href="#" id={this.props.link.id} onClick={this.finishthis}>{this.props.link.label}</a>
    );
  }
});
FontChange = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    link: React.PropTypes.object.isRequired
  },
  changeFont: function(e,f) {
    e.preventDefault();
    for(var i=0; i<document.querySelectorAll('#choice-bar ul').length; i++){
      document.querySelectorAll('#choice-bar ul')[i].style.display = 'none';
    }
    document.getElementById('card-body').className = this.props.link.id;
  },
  render: function() {
    return (
      <a href="#" id={this.props.link.id} onClick={this.changeFont}>{this.props.link.label}</a>
    );
  }
});
BG = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    image: React.PropTypes.object.isRequired
  },
  changeBG: function(e,f) {
    e.preventDefault();
    document.getElementById('bgimg').className = this.props.image.id;
    for(var i=0; i<document.querySelectorAll('#choice-bar ul').length; i++){
      document.querySelectorAll('#choice-bar ul')[i].style.display = 'none';
    }
  },
  render: function() {
    return (
      <a href="#" id={this.props.image.id} onClick={this.changeBG}></a>
    );
  }
});
BGUpload = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    image: React.PropTypes.object.isRequired
  },
  onChange: function(){
    if (ReactDOM.findDOMNode(this).files && ReactDOM.findDOMNode(this).files[0]) {
      var reader = new FileReader();
      $this = ReactDOM.findDOMNode(this);
      reader.onload = function (e) {
          //$('#blah').attr('src', e.target.result);
          $this.parentNode.style.backgroundImage = 'url('+e.target.result+')';
      }
      reader.readAsDataURL($this.files[0]);
      $this.files[0].url = '';
      bgImg = $this.files[0];
    }
  },
  render: function() {
    return (
      <li id="bgImg"><input type="file" onChange={this.onChange}/></li>
    );
  }
});
Image = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    image: React.PropTypes.object.isRequired
  },
  renderImg: function(e,f) {
    e.preventDefault();
    picsContArr = [];
    for(var i=0; i<document.querySelectorAll('#choice-bar ul').length; i++){
      document.querySelectorAll('#choice-bar ul')[i].style.display = 'none';
    }
    for(var j=0; j<this.props.image.count; j++){
      picsContArr.push(<div className={'x'+ this.props.image.count} id={'cont-'+j}><ImageCont/></div>)
    }
    var picsBody = <div id="pictures" className={'x'+this.props.image.count}>{picsContArr}<textarea id="greetings" placeholder="Place Greetings Here"></textarea></div>
    ReactDOM.render(picsBody, document.getElementById('card-pictures'));
  },
  render: function() {
    return (
      <a href="#" id={this.props.image.id} onClick={this.renderImg}>{this.props.image.label}</a>
    );
  }
});
ColorPicker = React.createClass({
  propType: {
    picker: React.PropTypes.object.isRequired
  },
  componentDidMount: function(){
    $("#custom-color").spectrum({
        showPaletteOnly: true,
        showPalette: true,
        showInput: true,
        allowEmpty:true,
        palette:['#A32C28','#7B8055', '#BCA875', 'white', "#384030", "C6DDF2", "#475D82", "goldenrod"],
        change:function(color){
          backgroundColor = color.toHexString();
          $('body').attr('class', 'c'+backgroundColor.replace('#',''));
          document.body.style.backgroundColor = backgroundColor;
        }
    });
  },
  render: function(){
    return <input id={this.props.picker.id} type="text"/>
  }
});
ImageCont = React.createClass({
  onChange: function(){

    if (ReactDOM.findDOMNode(this).files && ReactDOM.findDOMNode(this).files[0]) {
      var reader = new FileReader();
      $this = ReactDOM.findDOMNode(this);
      reader.onload = function (e) {
          //$('#blah').attr('src', e.target.result);
          $this.parentNode.style.backgroundImage = 'url('+e.target.result+')';
      }
      reader.readAsDataURL($this.files[0]);
      $this.files[0].position = Number($this.parentNode.id.replace('cont-',''));
      $this.files[0].url = '';
      if(images.length<Number(document.querySelector('#pictures').className.replace('x',''))){
        images.push($this.files[0]);
      } else {
        removeA(images, images[$this.files[0].position]);
        images.push($this.files[0]);
      }
    }
  },
  render: function() {
    return (
      <input type="file" onChange={this.onChange}/>
      );
  }
});