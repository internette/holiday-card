// Task component - represents a single todo item
Link = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    link: React.PropTypes.object.isRequired
  },
  showDropdown: function(e,f) {
    e.preventDefault();
    console.log(this.props.link);
  },
  render: function() {
    return (
      <a href="#" id={this.props.link.id} onClick={this.showDropdown}>{this.props.link.label}</a>
    );
  }
});
Image = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    image: React.PropTypes.object.isRequired
  },
  render: function() {
    return (
      <a href="#" id={this.props.image.id}></a>
    );
  }
});