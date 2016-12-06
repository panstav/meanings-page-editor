let modalElem, backdropElem;

module.exports = { init, open, close };

function init(innerElem, outerElem){
	modalElem = innerElem;
	backdropElem = outerElem;

	modalElem.on('click', '[data-editing-type="category"] button', ev => {

		const previousTitle = $(ev.target).findData('editing-title');

		dispatch({ type: 'EDIT_CATEGORY', payload: {
			previousTitle,
			title: modalElem.find('#category-title').val(),
			image: modalElem.find('#category-image').val()
		}});

		close();
	});

}

function open(type, data){

	const modalHTML = type === 'category'
		? renderCategoryModal(data)
		: $.noop;

	modalElem.html(modalHTML);

	backdropElem.show();
}

function close(){
	backdropElem.hide();
	modalElem.html('');
}

function renderCategoryModal({ title, image }){

	return `<div data-editing-type="category" data-editing-title="${title}">
	<h2 class="mb4">עריכת הקטגוריה: "${title}"</h2>
	<div class="mv3">
		<label for="category-title" class="pointer">כותרת הקטגוריה:</label>
		<input id="category-title" type="text" value="${title}" class="w-100 mv1">
	</div>
	<div class="mv3">
		<label for="category-image" class="pointer">תמונת הקטגוריה:</label>
		<input id="category-image" type="text" value="${image}" class="w-100 mv1" style="direction: ltr;">
	</div>
	<button>שמור שינויים</button>
</div>`

}