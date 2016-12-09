module.exports = (state, action) => {

	switch (action.type){

		case 'LOAD_ASYNC_DATA':
			return $.extend({}, state, {categories: action.payload});

		case 'EDIT_CATEGORY':
			return editCategory(state, action.payload);
		case 'EDIT_ITEM':
			return editItem(state, action.payload);

		case 'ADD_CATEGORY':
			return $.extend({}, state, {categories: [action.payload, ...state.categories]})

	}

	return state;

};

function editCategory(state, {previousTitle, title, image}) {

	const categories = state.categories.map(category => {
		if (category.title !== previousTitle) return category;
		return $.extend(category, { title, image });
	});

	return $.extend({}, state, {categories, dataChanged: true});
}

function editItem(state, {previousTitle, title, content, images}) {

	const categories = state.categories.map(category => {

		const items = category.items.map(item => {
			if (item.title !== previousTitle) return item;
			return $.extend(item, { title, content, images });
		});

		return $.extend(category, {items});
	});

	return $.extend({}, state, {categories, dataChanged: true});
}