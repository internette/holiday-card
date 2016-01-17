//Random ID
function randId() {
  return Math.floor((Math.random() * 10000000) + 1);
}
//counter
var counter = 0;
Modal = React.createClass({
  getInitialState: function(){
    return {modalContent: <form id="save-card" onSubmit={this.submitForm}>
                <div className="save-card-input"><label for="cardname">Card Name</label><input type="text" id="cardname"/></div>
                <div className="save-card-input"><label for="username">Your Name</label><input type="text" id="username"/></div>
                <input type="submit" id="send-card" value="Share My Card"/>
            </form>
    }
  },
  // componentDidMount: function(){
  //   html2canvas(document.body, {
  //     onrendered: function(canvas) {
  //       document.body.appendChild(canvas);
  //     }
  //   });
  // },
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
    var $this = this;
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
      imgs: images
    }, function(e, res){
      S3.upload({
          files:images
      },function(e,r){
          counter += 1;
          var object = {};
          object['imgs.'+(counter-1)+'.url'] = r.url;
          Cards.update(res, {$set: object});
          $this.setState({
            modalContent: <div id="thank-you">
              <p>Share your card with the link below</p>
              <input id="share-link" value={window.location.host + '/' + res} readOnly/>
            </div>
          });
      });
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
            <canvas id="test"></canvas>
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
