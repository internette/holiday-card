Modal = React.createClass({
  submitForm: function(e){
    e.preventDefault();
  },
  render: function() {
    return (
        <div id="modal">
          <div id="overlay"></div>
          <div id="modal-container">
            <h3>Save Card</h3>
            <form id="save-card" onSubmit={this.submitForm}>
              <input type="text" id="cardname"/>
              <input type="text" id="username"/>
              <input type="text" id="send-to"/>
              <input type="submit" id="send-card" value="Send Card"/>
            </form>
          </div>
        </div>
      );
  }
});