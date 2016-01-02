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
      document.querySelectorAll('#choice-bar ul')[i].style.display = 'none';
    }
    if(document.querySelector('ul#'+this.props.link.id).style.display === 'block'){
      document.querySelector('ul#'+this.props.link.id).style.display = 'none';
    } else {
      document.querySelector('ul#'+this.props.link.id).style.display = 'block';
    }
  },
  render: function() {
    return (
      <a href="#" id={this.props.link.id} onClick={this.showDropdown}>{this.props.link.label}</a>
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
  },
  render: function() {
    return (
      <a href="#" id={this.props.image.id} onClick={this.changeBG}></a>
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
    for(var i=0; i<this.props.image.count; i++){
      var newDiv = document.createElement('div');
      newDiv.className=this.props.image.id;
      document.getElementById('card-body').appendChild(newDiv);
    }
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
        }
    });
  },
  render: function(){
    return <input id={this.props.picker.id} type="text"/>
  }
});
ImageCont = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    imageCont: React.PropTypes.object.isRequired
  },
  render: function() {
    for(var i=0; i<this.props.image.count; i++){
      return (<div class={this.props.image.id} ></div>);
    }
  }
});