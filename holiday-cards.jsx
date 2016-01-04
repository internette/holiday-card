// Define a collection to hold our tasks
Cards = new Mongo.Collection("cards");
if(Meteor.isClient){
	Meteor.startup(function(){
		//ReactDOM.render(<App />, document.getElementById("render-target"));
	});
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