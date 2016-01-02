// Task component - represents a single todo item
Nav = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    nav: React.PropTypes.object.isRequired
  },
  render() {
    return (
      <li id="{this.props.task._id}" class="{this.props.task.group}">{this.props.task.text}</li>
    );
  }
});