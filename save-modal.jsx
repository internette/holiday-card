//Random ID
function randId() {
  return Math.floor((Math.random() * 10000000) + 1);
}
Modal = React.createClass({
  getInitialState: function(){
    return {modalContent: <form id="save-card" onSubmit={this.submitForm}>
                <div className="save-card-input"><label for="cardname">Card Name</label><input type="text" id="cardname"/></div>
                <div className="save-card-input"><label for="username">Your Name</label><input type="text" id="username"/></div>
                <input type="submit" id="send-card" value="Share My Card"/>
            </form>
    }
  },
  getLink: function(thisid){
    return ( window.location.host + '/' + Cards.findOne({cardId: thisid})._id);
  },
  submitForm: function(e){
    e.preventDefault();
    var cName = document.getElementById('cardname').value;
    var userName = document.getElementById('username').value;
    var fontChoice = document.getElementById('card-body').className;
    var imgCount = document.getElementById('pictures').className.replace('x','');
    var cardId = 'card' + randId();
    var bgChoice = document.getElementById('bgimg').className;
    var message = document.getElementById('greetings').value;
    var bgColor = document.body.className;
    Cards.insert({
      cardName: cName,
      username: userName,
      imgCount: imgCount,
      fontChoice: fontChoice,
      createdAt: new Date(),
      bgChoice: bgChoice,
      cardId: cardId,
      message: message,
      bgColor: bgColor,
      imgs: ''
    });
    this.setState({
      modalContent: <div id="thank-you">
        <p>Share your card with the link below</p>
        <input id="share-link" value={this.getLink(cardId)} readOnly/>
      </div>
    });
  },
  render: function() {
    return (
        <div id="modal">
          <div id="overlay"></div>
          <div id="modal-container">
            <ExitModal />
            <h3>Save Card</h3>
            {this.state.modalContent}
          </div>
        </div>
      );
  }
});
ExitModal = React.createClass({
  hideModal: function(e){
    e.preventDefault();
    $('#modal').hide();
  },
  render: function(){
    return (
        <a href="#" className="exit-modal" onClick={this.hideModal}>&times;</a>
      );
  }
});
