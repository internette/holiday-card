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
                <div className="save-card-input"><label for="cardname">Card Name</label><input type="text" id="cardname"/></div>
                <div className="save-card-input"><label for="username">Your Name</label><input type="text" id="username"/></div>
              <input type="submit" id="send-card" value="Share My Card"/>
            </form>
          </div>
        </div>
      );
  }
});