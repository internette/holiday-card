var picsCont = [];
TestLink = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    card: React.PropTypes.object.isRequired
  },
  componentDidMount: function(){
    document.body.className = this.props.card.bgColor;
    picsCont = [];
    for(var i=0; i<this.props.card.imgCount; i++){
      picsCont.push(<div className={'x'+this.props.card.imgCount} style={{backgroundImage: 'url(' + this.props.card.imgs[i].url + ')'}}>&nbsp;</div>);
    }
    var cardBody = <div id="pictures">{picsCont}<textarea id="greetings" readOnly value={this.props.card.message}></textarea></div>;
    ReactDOM.render(cardBody, document.getElementById('card-pictures'));
  },
  render: function() {
    return (
      <div>
        <div id="card-body" className={this.props.card.fontChoice}>
          <div id="bgimg" className={this.props.card.bgChoice}></div>
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
  // showDetails:function(){
  //   // React.findDOMNode(this).find('div.hover').style.top = '0';
  //   // React.findDOMNode(this).find('div.hover').style.height = '100%';
  //   this.refs.hover.style.top = '0';
  //   this.refs.hover.style.height = '100%';
    
  // },
  // hideDetails:function(){
  //   // React.findDOMNode(this).find('div.hover').style.top = '0';
  //   // React.findDOMNode(this).find('div.hover').style.height = '100%';
  //   this.refs.hover.style.top = '100%';
  //   this.refs.hover.style.height = '0';
    
  // },
  showDetails: function(){
    document.getElementById('card-name').innerHTML = this.props.card.cardName;
    document.getElementById('card-creator').innerHTML = this.props.card.username;
  },
  hideDetails: function(){
    document.getElementById('card-name').innerHTML = '';
    document.getElementById('card-creator').innerHTML = '';
  },
  render: function() {
    return (
      // <li className="card-link"><a href={'/'+this.props.card._id} id={this.props.card._id}>{this.props.card.cardName} <span className="creator">{'by '+this.props.card.username}</span></a></li>
      // <li className="card-link" onMouseEnter={this.showDetails} onMouseLeave={this.hideDetails}><iframe src={'/'+this.props.card._id}/><div className="hover" ref="hover"><span className="card-name">{this.props.card.cardName}</span><span className="byAttr">by: {this.props.card.username}</span><a href={'/'+this.props.card._id} className="viewcard-link">View Card</a></div></li>
      <li className="card-link" onMouseEnter={this.showDetails} onMouseLeave={this.hideDetails}><iframe src={'/'+this.props.card._id}/></li>
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