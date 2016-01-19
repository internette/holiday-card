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
      if(this.props.card.imgCount === '1'){
        picsCont.push(<div className={'x'+this.props.card.imgCount} style={{backgroundImage: 'url(' + this.props.card.imgs[i].url + ')'}}><div id="divider"></div></div>)
      } else {
        picsCont.push(<div className={'x'+this.props.card.imgCount} style={{backgroundImage: 'url(' + this.props.card.imgs[i].url + ')'}}>&nbsp;</div>)
      }
    }
    var cardBody = <div id="pictures" className={'x'+this.props.card.imgCount}>{picsCont}<textarea id="greetings" readOnly value={this.props.card.message}></textarea></div>;
    ReactDOM.render(cardBody, document.getElementById('card-pictures'));
    document.getElementById('divider').style.bottom = (Number(getComputedStyle(document.getElementById('greetings')).height.replace('px',''))-10)+'px';
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
    card: React.PropTypes.object.isRequired
  },
  showDetails: function(){
    this.refs.cname.innerHTML = '';
    this.refs.creator.innerHTML = '';
  },
  hideDetails: function(){
    this.refs.cname.innerHTML = this.props.card.cardName;
    this.refs.creator.innerHTML = this.props.card.username;
  },
  render: function() {
    return (
      <li className="card-link" onMouseEnter={this.showDetails} onMouseLeave={this.hideDetails}><a href={'/'+this.props.card._id}><span ref="cname" id="card-name">{this.props.card.cardName}</span><span ref="creator" id="card-creator">{'by: ' + this.props.card.username}</span></a><iframe src={'/'+this.props.card._id}/></li>
    );
  }
});
Button = React.createClass({
  propTypes: {
    button: React.PropTypes.object.isRequired
  },
  render: function() {
    return (
      <a href='/create-new' id={this.props.button.id}>{this.props.button.label}</a>
    );
  }
});