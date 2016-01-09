TestLink = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    card: React.PropTypes.object.isRequired
  },
  componentDidMount: function(){
    document.body.className = this.props.card.bgColor;
  },
  render: function() {
    return (
      <div>
        <div id="card-body" className={this.props.card.fontChoice}>
          <div id="bgimg" className={this.props.card.bgChoice}></div>
          <textarea id="greetings" readOnly value={this.props.card.message}></textarea>
          <div id="card-pictures">
          </div>
        </div>
      </div>
    );
  }
});
CardThumbTemplate = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    card: React.PropTypes.object.isRequired
  },
  render: function() {
    return (
      <a href={'/'+this.props.button.id} id={this.props.card.id}>{this.props.card.label}</a>
    );
  }
});
Button = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    button: React.PropTypes.object.isRequired
  },
  render: function() {
    return (
      <a href='/create-new' id={this.props.button.id}>{this.props.button.label}</a>
    );
  }
});