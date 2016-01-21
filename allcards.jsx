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
  getInitialState() {
    return {
      skipCount: 0
    };
  },
  getMeteorData() {
    // Meteor.subscribe("all-cards");
    // return {
    //   cards: Cards.find({},{limit: 9, skip: 0}).fetch()
    // }
    var data = {};
    // var cards = this.props.postId;
    var handle = Meteor.subscribe('all-cards');
    if(handle.ready()) {
      data.cards = Cards.find({isPrivate: 'public'}, {limit: 6, skip: this.state.skipCount}).fetch();
    }
    return data;
  },
  getButton(){
    return [
      { id: 'create-new', label: "Create New Card"}
    ];
  },
  renderCards() {
    if(this.data.cards.length < 6){
      document.getElementById('next').style.display = 'none';
    }
    if(this.data.cards.length<=0){
      return <p>There are no more cards</p>
    } else {
      return this.data.cards.map((card) => {
        return <CardThumbTemplate key={card._id} id={card._id} card={card} cardName={card.cardName} username={card.username}/>;  
      });
    }
  },
  renderButton(){
    return this.getButton().map((button) => {
      return <Button key={button._id} button={button} label={button.label}/>;
    });
  },
  seeMore (e, skipCount){
    e.preventDefault();
    if(document.getElementById('prev').style.display==='none'){
      document.getElementById('prev').style.display = 'block';
    }
    this.setState({
      skipCount: this.state.skipCount + 6
    });
    this._meteorStateDep.changed();
  },
  seeLess (e, skipCount){
    e.preventDefault();
    if(document.getElementById('next').style.display==='none'){
      document.getElementById('next').style.display = 'block';
    }
    if(this.state.skipCount - 6 <= 0){
      document.getElementById('prev').style.display = 'none';
    }
    if(this.state.skipCount <= 0){
      this.setState({
        skipCount: 0
      });
    } else {
      this.setState({
        skipCount: this.state.skipCount - 6
      });
    }
    this._meteorStateDep.changed();
  },
  render() {
    return (
      <div id="all-cards">
        <div id="top-nav">
          <h3>Holiday Cards</h3>
          <ul>
            <li>{this.renderButton()}</li>
          </ul>
        </div>
        <ul id="card-thumbs">
          <li id="prev" style={{display: 'none'}}><a href="#" onClick={this.seeLess} id="prev-cards"></a></li>
          {this.data.cards? this.renderCards() : <p>Loading...</p>}
          <li id="next"><a href="#" onClick={this.seeMore} id="next-cards"></a></li>
        </ul>
      </div>
    );
  }
});