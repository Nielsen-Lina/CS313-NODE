$(document).ready(function() {
	$('.delete-recipe').on('click', function() {
		var id = $(this).data('id');
		var url = '/api/deleteRecipe/' + id;
		if(confirm('Delete Recipe?')) {
			$.ajax({
				url: url,
				type: 'DELETE',
				success: function(result){
					window.location.href='../app';
				}
			});
		}
	});

	$('.edit-recipe').on ('click', function(){
		$('#edit-form-recipe_name').val($(this).data('name'));
		$('#edit-form-ingredients').val($(this).data('ingredients'));
		$('#edit-form-instructions').val($(this).data('instructions'));
		$('#edit-form-id').val($(this).data('id'));
	});
});