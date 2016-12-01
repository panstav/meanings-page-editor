const assert = require('power-assert');

const build = require('./build');

const mockCategories = [{ "title": "title",
	"items": [{ "title": "item-title", "content": "content" }] }];

describe('Transform', () => {

	it('Should return wrapped content with paragraph tags, per item', () => {

		const transformedCategories = build.transform(mockCategories);

		assert(transformedCategories[0].items[0].content === '<p>content</p>');

	});

});