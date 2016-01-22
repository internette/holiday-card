//Random ID
function randId() {
  return Math.floor((Math.random() * 10000000) + 1);
}
//counter
var counter = 0;
Modal = React.createClass({
  inputs: function(){
    return [
      { id: 'cardname', label: 'Card Name', idKey: 'id-1', labelKey: 'key-1'},
      { id: 'username', label: 'Your Name', idKey: 'id-2', labelKey: 'key-2'}
    ]
  },
  renderInputs: function(){
    return this.inputs().map((input) => {
      return <div className="save-card-input"><FormInput key={input.idKey} input={input} id={input.id} label={input.label}/><FormLabel key={input.labelKey} input={input} id={input.id} label={input.label}/></div>
    });
  },
  getInitialState: function(){
    return {modalContent: <form id="save-card" onSubmit={this.submitForm}>
                {this.renderInputs()}
                <label for="pubpriv">Make my card private</label><input type="checkbox" id="pubpriv" name="pubpriv"/>
                <input type="submit" id="send-card" value="Share My Card"/>
            </form>
    }
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
    var $this = this;
    var pubPriv = '';
    if(document.getElementById('pubpriv').checked){
      pubPriv = true
    } else {
      pubPriv = false
    }
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
      imgs: images,
      isPrivate: pubPriv
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
              <p><b>To share your card:</b></p>
              <ol>
                <li>Copy the <u>whole</u> link below</li>
                <li>Share that link with your friends</li>
              </ol>
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
FormInput = React.createClass({
  propTypes: {
    input: React.PropTypes.object.isRequired
  },
  focusEffect: function(){
    this.refs.input.parentNode.className = 'save-card-input active';
  },
  blurEffect: function(){
    this.refs.input.parentNode.className = 'save-card-input';
    if(this.refs.input.value.length>0){
      this.refs.input.nextSibling.style.color = '#000';
    } else {
      this.refs.input.nextSibling.style.color = 'red';
    }
  },
  render: function(){
    return (
      <input type="text" id={this.props.input.id} onFocus={this.focusEffect} onBlur={this.blurEffect} ref="input"/>
    );
  }
});
FormLabel = React.createClass({
  propTypes: {
    input: React.PropTypes.object.isRequired
  },
  render: function(){
    return (
      <label for={this.props.input.id}>{this.props.input.label}</label>
    );
  }
});