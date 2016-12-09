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
		<img src="${category.image}" class="w-100">
		<h2 class="absolute f2 pr4 pv3 ma0 bottom-0 right-0 left-0 light-gray">
			${category.title}
			${renderEditButton()}
		</h2>
	</header>
	<ul class="list pa0">${category.items.map(renderCategoryItem).join('')}</ul>
</section>`;

	}

	function renderEditButton(){
		if (finalRender) return '';
		return `<button class="mr2 pa1 br1 bw0 f5 fw1 pointer">ערוך</button>`;
	}

	function renderCategoryItem(item){

		return `<li data-item="${item.title}" class="mv3">
	<details>
		<summary class="f3 outline-0 pointer">
			${item.title}
			${renderEditButton()}
		</summary>
		${renderCategoryItemContent(item.content)}
		${item.images ? item.images.map(renderCategoryItemImage).join('') : ''}
	</details>
</li>`;

	}

	function renderCategoryItemImage(src){
		return `<a rel="fancybox" href="${src}" style="background-image: url(${src});" class="w4 h4 cover bg-center dib ma2 fancybox"></a>`;
	}

	function renderCategoryItemContent(content){

		return typeof(content) === 'string'
			? wrapParagraph(content)
			: content.map(wrapParagraph).join('');

		function wrapParagraph(contentItem){
			return `<p class="mr2">${contentItem}</p>`;
		}

	}

}