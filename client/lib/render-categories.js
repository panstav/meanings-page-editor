module.exports = renderCategories;

function renderCategories(finalRender){
	const currentState = getState();

	return `
<button data-action="add-category" class="mt4 pa1 br1 bw0 f5 fw1 pointer">הוסף קטגוריה</button>
${currentState.categories.map(renderCategory).join('')}
`;

	function renderCategory(category){

		return `<section data-category="${category.title}" class="mt5">
	<header class="relative overflow-hidden">
		<img src="${category.image}">
		<h2>
			${category.title}
			${renderEditButton()}
		</h2>
	</header>
	<button data-action="add-item" data-add-to-category="${category.title}" class="mt3 mb2 pa1 br1 bw0 f5 fw1 pointer">הוסף פריט לקטגוריה</button>
	<ul>${category.items.map(renderCategoryItem).join('')}</ul>
</section>`;

	}

	function renderEditButton(){
		if (finalRender) return '';
		return `<button class="mr2 pa1 br1 bw0 f5 fw1 pointer">ערוך</button>`;
	}

	function renderCategoryItem(item){

		return `<li data-item="${item.title}">
	<details>
		<summary>
			${item.title}
			${renderEditButton()}
		</summary>
		${renderCategoryItemContent(item.content)}
		${item.images ? item.images.map(renderCategoryItemImage).join('') : ''}
	</details>
</li>`;

	}

	function renderCategoryItemImage(src){
		return `<a rel="fancybox" href="${src}" style="background-image: url(${src});" class="fancybox"></a>`;
	}

	function renderCategoryItemContent(content){

		return typeof(content) === 'string'
			? wrapParagraph(content)
			: content.map(wrapParagraph).join('');

		function wrapParagraph(contentItem){
			return `<p>${contentItem}</p>`;
		}

	}

}