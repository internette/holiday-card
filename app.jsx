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
Layout = React.createClass({
  render() {
    return (
      <div className="container">
        {this.props.content}
      </div>
    );
  }
});
Card = React.createClass({
  mixins: [ReactMeteorData],
  getLinks(){
    return [
      { id: 'finished', label: "See Finished", class: "toplevel" },
      { id: 'hide-bar', label: "Hide Bar", class: "toplevel" },
      { id: 'choose-amount', label: "Choose Picture Amount", class: "toplevel" },
      { id: 'choose-font', label: "Choose Font", class: "toplevel" },
      { id: 'choose-bg', label: "Choose Background", class: "toplevel" },
      { id: 'custom-color', label: "Choose BG Color", class: "toplevel" }
    ];
  },
  getPicsList(){
    return[
      { id: 'x1', count: 1, label: "One Picture", class: "pictures" },
      { id: 'x2', count: 2, label: "Two Pictures", class: "pictures" },
      { id: 'x3', count: 3, label: "Three Pictures", class: "pictures" },
      { id: 'x4', count: 4, label: "Four Pictures", class: "pictures" }
    ];
  },
  getFontsList(){
    return[
      { id: 'berkshire', label: "Berkshire", class: "fonts" },
      { id: 'dancing-script', label: "Dancing Script", class: "fonts" }
    ];
  },
  getBGs(){
    return[
      { id: 'diamond', label: "Diamond", class: "bgs" },
      { id: 'snow', label: "Snowfall", class: "bgs" },
      { id: 'redStarry', label: "Red Starry Night", class: "bgs" },
      { id: 'blueStarry', label: "Blue Starry Night", class: "bgs" }
    ];
  },
  renderPics(){
    return this.getPicsList().map((link) => {
      return <Wrap><Image key={link.id} image={link} text={link.label}/></Wrap>;
    });
  },
  renderFonts(){
    return this.getFontsList().map((link) => {
      return <Wrap><FontChange key={link.id} link={link} text={link.label}/></Wrap>;
    });
  },
  renderImages(){
    return this.getBGs().map((image) => {
      return <Wrap><BG key={image.id} image={image}/></Wrap>;
    });
  },
  renderLinks() {
    return this.getLinks().map((link) => {
        if(link.class === 'toplevel' && link.id==='choose-amount'){
          return <Wrap id="pic-amount"><Link key={link.id} link={link} text={link.label}/><ul id={link.id}>{this.renderPics()}</ul></Wrap>;
        } else if(link.class === 'toplevel' && link.id==='choose-font'){
          return <Wrap id="fonts"><Link key={link.id} link={link} text={link.label}/><ul id={link.id}>{this.renderFonts()}</ul></Wrap>;
        } else if(link.class === 'toplevel' && link.id==='choose-bg'){
          return <Wrap id="bgs"><Link key={link.id} link={link} text={link.label}/><ul id={link.id}>{this.renderImages()}</ul></Wrap>;
        } else if (link.class === 'toplevel' && link.id === 'custom-color'){
          return <ColorPicker key={link.id} picker={link}/>;
        } else if (link.class === 'toplevel' && link.id === 'finished'){
          return <Finished key={link.id} link={link} text={link.label}/>;
        } else if (link.class === 'toplevel'){
          return <Link key={link.id} link={link} text={link.label}/>;
        }
    });
  },
  getMeteorData() {
    return {
      cards: Cards.find({}).fetch()
    }
  },
  render() {
    return (
      <div>
        <ul id="choice-bar">
          {this.renderLinks()}
        </ul>
        <div id="card-body">
          <div id="bgimg"></div>
          <div id="card-pictures">
          </div>
        </div>
      </div>
    );
  }
});