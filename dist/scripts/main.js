var user = new UserModel();

$(document).ready(function(){

	var $editProfileForm = $("#edit-profile-2-2");
	var theId = "";

	var App = Backbone.Router.extend({
		routes: {
			'': 'profile',
			'edit': 'edit'
		},
		profile: function() {
			$('.page').hide();
			$('#profile').show();
		},
		edit: function() {
			$('.page').hide();
			$('#edit').show();
		}
	});

	var app = new App();
	Backbone.history.start();

	$.get("https://tiny-pizza-server.herokuapp.com/collections/awg-profile/", function(data){
		theId = data[0]._id;
		user.set({
			name: data[0].name,
			email: data[0].email,
			role: data[0].role
		});
	});

	updateUser(user);

	user.on("change", updateUser);

	$editProfileForm.on("submit", function(event){
		event.preventDefault();

		var name = $("#name").val();
		var email = $("#inputEmail3").val();
		var role = $("#role").val();

		user.set({
			name: name,
			email: email,
			role: role
		});

		$.ajax({
				type: "PUT",
				url: "https://tiny-pizza-server.herokuapp.com/collections/awg-profile/"+theId,
				data:{
					name: user.get("name"),
					role: user.get("role"),
					email: user.get("email")
				},
				success: function(){
					app.navigate("", {trigger: true});
				}
		});
	});

	function updateUser(userModel){

		$("#name-to-change").html(userModel.get("name"));
		$("#email-to-change").html(userModel.get("email"));
		$("#role-to-change").html(userModel.get("role"));

		$("#name").val(userModel.get("name"));
		$("#inputEmail3").val(userModel.get("email"));
		$("#role").val(userModel.get("role"));
	}

});