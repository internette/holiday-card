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
    Meteor.subscribe("all-cards");
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
    return this.data.cards.map((card) => {
      return <CardThumbTemplate key={card._id} id={card._id} card={card} cardName={card.cardName} username={card.username}/>;  
    });
  },
  renderButton(){
    return this.getButton().map((button) => {
      return <Button key={button._id} button={button} label={button.label}/>;
    });
  },
  render() {
    return (
      <div id="all-cards">
        <div id="details">
          <div id="card-name"></div>
          <div id="card-creator"></div>
          {this.renderButton()}
        </div>
        <ul id="card-thumbs">
          {this.data.cards? this.renderCards() : <p>Loading...</p>}
        </ul>
      </div>
    );
  }
});