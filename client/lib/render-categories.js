let usedConstentId = false;

module.exports = renderCategories;

function renderCategories(finalRender){
	const currentState = getState();

	return `
${renderAddCategoryButton()}
${currentState.categories.map(renderCategory).join('')}
`;

	function renderAddCategoryButton(){
		if (finalRender) return '';
		return `<button data-action="add-category" class="mt4 pa1 br1 bw0 f5 fw1 pointer">הוסף קטגוריה</button>`;
	}

	function renderCategory(category){

		return `<details data-category="${category.title}" class="mt5">
	<summary data-role="category-header" class="relative overflow-hidden">
		<img src="${category.image}">
		<h2>
			${category.title}
			${renderEditButton()}
		</h2>
	</summary>
	${renderAddItemButton(category.title)}
	<ul>${category.items.map(renderCategoryItem).join('')}</ul>
</details>`;

	}

	function renderAddItemButton(title){
		if (finalRender) return '';
		return `<button data-action="add-item" data-add-to-category="${title}" class="mt3 mb2 pa1 br1 bw0 f5 fw1 pointer">הוסף פריט לקטגוריה</button>`;
	}

	function renderCategoryItem(item){

		return `<li data-item="${item.title}">
	<details>
		<summary>
			${item.title}
			${renderEditButton()}
		</summary>
		${renderCategoryItemContent(item.content)}
		${renderCategoryItemImages(item)}
	</details>
</li>`;

	}

	function renderEditButton(){
		if (finalRender) return '';
		return `<button class="mr2 pa1 br1 bw0 f5 fw1 pointer">ערוך</button>`;
	}

	function renderCategoryItemImages(item){
		if (!item.images) return '';

		return item.images.map(src => {
			return `<a rel="${escapedItemTitle()}" href="${src}" style="background-image: url(${src});" class="fancybox"></a>`;
		}).join('');

		function escapedItemTitle(){
			// dash cased string is safer for fancybox
			// which in production show images with the same rel - as a gallery
			return item.title.replace(/ /g, '-');
		}

	}

	function renderCategoryItemContent(content){

		return typeof(content) === 'string'
			? wrapParagraph(content)
			: content.map(wrapParagraph).join('');

		function wrapParagraph(contentItem){
			return `<p id="${insertId()}">${contentItem}</p>`;
		}

		function insertId(){
			if (usedConstentId) return `id${Math.round(Math.random()*1000)}`;
			usedConstentId = true;
			return 'test-id';
		}

	}

}