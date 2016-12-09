let modalElem, backdropElem;

module.exports = { init, open, close };

function init(innerElem, outerElem){
	modalElem = innerElem;
	backdropElem = outerElem;

	modalElem.on('click', '[data-editing-type="category"] [data-role="save"]', ev => {
		saveOrAddCategory();
		close();

		function saveOrAddCategory(){

			const previousTitle = $(ev.target).findData('editing-title');
			const title = modalElem.find('#category-title').val();
			const image = modalElem.find('#category-image').val();

			if (!previousTitle) return dispatch({ type: 'ADD_CATEGORY', payload: { title, image, items: [] } });
			dispatch({ type: 'EDIT_CATEGORY', payload: { previousTitle, title, image }});

		}

	});

	modalElem.on('click', '[data-editing-type="item"] [data-role="save"]', ev => {
		saveOrAddItem();
		close();

		function saveOrAddItem(){

			const previousTitle = $(ev.target).findData('editing-title');
			const categoryTitle = $(ev.target).findData('item-of-category');
			const title = modalElem.find('#item-title').val();
			const content = modalElem.find('#item-content').val().split('\n').filter(para => !!para);
			const images = modalElem.find('[id^="item-image-"]').map(function(){ return $(this).val(); }).get();

			if (!previousTitle) return dispatch({ type: 'ADD_ITEM', payload: { title, content, images, categoryTitle }});
			dispatch({ type: 'EDIT_ITEM', payload: { previousTitle, title, content, images }});

		}

	});

	modalElem.on('click', '[data-editing-type="item"] [data-role="add-image"]', ev => {
		$(ev.target).before(renderCategoryItemImage('', modalElem.find('[id^="item-image-"]').length));
	});

	modalElem.on('click', '[data-role="close"]', close);

}

function open(type, data, categoryTitle){

	const modalHTML = type === 'category'
		? renderCategoryModal(data || { title: '', image: '' })
		: renderCategoryItemModal(data || { title: '', content: '', images: [], categoryTitle });

	modalElem.html(modalHTML);

	backdropElem.show();
}

function close(){
	backdropElem.hide();
	modalElem.html('');
}

function renderCategoryModal({ title, image }){

	return `<div data-editing-type="category" data-editing-title="${title}">
	<h2 class="mb4">${title ? `עריכת הקטגוריה: "${title}"` : 'קטגוריה חדשה'}</h2>
	<div class="mv3">
		<label for="category-title" class="pointer">כותרת הקטגוריה:</label>
		<input id="category-title" type="text" value="${title}" class="w-100 mv1">
	</div>
	<div class="mv3">
		<label for="category-image" class="pointer">תמונת הקטגוריה:</label>
		<input id="category-image" type="text" value="${image}" class="w-100 mv1" style="direction: ltr;">
	</div>
	<button data-role="save" class="fl mr2">שמור שינויים</button>
	<button data-role="close" class="fl">ביטול</button>
</div>`

}

function renderCategoryItemModal({ title, content, images, categoryTitle }){

	return `<div data-editing-type="item" data-editing-title="${title}" data-item-of-category="${categoryTitle}">
	<h2 class="mb4">${title ? `עריכת הפריט: "${title}"` : 'פריט חדש'}</h2>
	<div class="mv3">
		<label for="item-title" class="pointer">כותרת הפריט:</label>
		<input id="item-title" type="text" value="${title}" class="w-100 mv1">
	</div>
	<div class="mv3">
		<label for="item-content" class="pointer">תוכן הפריט:</label>
		<textarea id="item-content" class="h5 w-100 mv1">${parseContent(content)}</textarea>
	</div>
	${images ? images.map(renderCategoryItemImage).join('') : ''}
	<button data-role="add-image">הוסף תמונה</button>
	<button data-role="save" class="fl mr2">שמור שינויים</button>
	<button data-role="close" class="fl">ביטול</button>
</div>`

}

function parseContent(content){
	return typeof(content) !== 'string'
		? content.join('\n\n')
		: content;
}

function renderCategoryItemImage(image, index){

	return `<div class="mv3">
	<label for="item-image-${index+1}" class="pointer">תמונת פריט מס' ${index+1}:</label>
	<input id="item-image-${index+1}" type="text" value="${image}" class="w-100 mv1" style="direction: ltr;">
</div>`;

}