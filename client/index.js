const categories = require('./data');

$(() => {
	$('#page-output').html(renderCategories());
});

function renderCategories(){

	return categories.map(categoryElem).join('');

	function categoryElem(category){

		return `<section id="cat-${category.namespace}" class="mt5">
	<header class="relative overflow-hidden">
		<img src="https://loremflickr.com/g/640/240/${category.namespace}.jpg" class="w-100">
		<h2 class="absolute f2 pr4 pv3 ma0 bottom-0 right-0 left-0 light-gray">${category.title}</h2>
	</header>
	<ul class="list pa0">${category.items.map(categoryItemElem).join('')}</ul>
</section>`;

	}

	function categoryItemElem(item){

		return `<li class="mv3">
	<details>
		<summary class="f3 outline-0 pointer">${item.title}</summary>
		${itemContentElem(item.content)}
		${item.images.map(itemImageElem).join('')}
	</details>
</li>`

	}

	function itemImageElem(src){
		return `<a rel="fancybox" href="${src}" style="background-image: url(${src});" class="w4 h4 cover bg-center dib ma2 fancybox"></a>`;
	}

	function itemContentElem(content){
		
		return typeof(content) === 'string'
			? wrapParagraph(content)
			: content.map(wrapParagraph).join('');

		function wrapParagraph(contentItem){
			return `<p class="mr2">${contentItem}</p>`;
		}
		
	}

}