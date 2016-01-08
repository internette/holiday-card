// Define a collection to hold our tasks
Cards = new Mongo.Collection("cards");
if(Meteor.isClient){
	Meteor.startup(function(){
		//ReactDOM.render(<App />, document.getElementById("render-target"));
	});
}
if (Meteor.isServer) {
  // Only publish tasks that are public or belong to the current user
  Meteor.publish("single-card", function (thisid) {
    return Cards.find({_id: thisid});
   })
}
FlowRouter.route('/', {
  name: 'home',
  action() {
    ReactLayout.render(Layout, {content: <AllCards />});
  }
});
FlowRouter.route('/create-new', {
  name: 'create-card',
  action() {
    ReactLayout.render(Layout, {content: <Card />});
  }
});
FlowRouter.route('/:id', {
  name: 'cards',
  action() {
    ReactLayout.render(Layout, {content: <CardTemplate />});
  }
});