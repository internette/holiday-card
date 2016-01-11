// App component - represents the whole app
var Wrap = React.createClass({
    render: function() {
        if(this.props.id==='pic-amount'){
          return <li id="pic-amount">{ this.props.children }</li>;
        } if(this.props.id==='fonts'){
          return <li id="fonts">{ this.props.children }</li>;
        } if(this.props.id==='bgs'){
          return <li id="bgs">{ this.props.children }</li>;
        } else {
          return <li>{ this.props.children }</li>;
        }
    }
});
AllCards = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    Meteor.subscribe( "all-cards");
    return {
      cards: Cards.find({}).fetch()
    }
  },
  getButton(){
    return [
      { id: 'create-new', label: "Create New Card"}
    ];
  },
  renderCards() {
    // Get tasks from this.data.tasks
    return this.data.cards.map((card) => {
      return <CardThumbTemplate key={card._id} card={card} cName={card.cardName} username={card.username}/>;
    });
  },
  renderButton(){
    return this.getButton().map((button) => {
      return <Button key={button._id} button={button} label={button.label}/>;
    });
  },
  render() {
    return (
      <div>
        {this.renderButton()}
        <ul>
          {this.renderCards()}
        </ul>
      </div>
    );
  }
});