module.exports = (state, action) => {

	switch (action.type){

		case 'EDIT_CATEGORY':
			return editCategory(state, action.payload);

	}

	return state;

};

function editCategory(state, {previousTitle, title, image}) {

	const categories = state.categories.map(category => {
		if (category.title !== previousTitle) return category;
		return $.extend(category, { title: title, image: image });
	});

	return $.extend({dataChanged:true}, state, {categories});
}