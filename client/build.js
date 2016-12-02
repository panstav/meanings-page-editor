const fs = require('fs');
const mustache = require('mustache');
const _ = require('lodash');

const data = require('./data');

fs.writeFile('./tattoo-meanings-page/page.html', renderHTML(), err => {
	
	if (err){
		console.error(err);
		return console.error(err.stack);
	}

	console.log('Done.');
	
});

module.exports = { transform };

function renderHTML(){
	return mustache.render(getTemplate(), { categories: transform(data) });
}

function getTemplate(){

	return `
{{#categories}}
<div class="category-header">
    <h2>{{title}}</h2>
</div>

{{#items}}
<details>
    <summary>{{title}}</summary>
    <section>{{{content}}}</section>
</details>
{{/items}}
{{/categories}}
`;

}

function transform(categories){

	return categories.map(category => {

		const items = category.items.map(item => {
			return _.extend(item, { content: `<p>${item.content}</p>` });
		});

		return _.extend(category, {items});

	});

}