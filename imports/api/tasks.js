export const Tasks = new Mongo.Collection('tasks');

Tasks.allow({
	insert: function(userId, doc){
		return true;
	},
	update: function(userId, doc){
		return true;
	}
});

TaskSchema = new SimpleSchema({
	text: {
		type: String,
		label: 'text' 
	},
	completed:{
		type: Boolean,
		defaultValue: false,
		optional: true
	},
	createdAt : {
		type: Date,
		label: "CreatedAt"
	}
});

Meteor.methods({
	updateTask: function(id, currentSate) {
		Tasks.update(id, {
			$set: {
				completed: currentSate
			}
		});
	}
});

Tasks.attachSchema(TaskSchema);