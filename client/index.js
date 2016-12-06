const createStore = require('redux').createStore;

const initialState = {
	categories: require('./data'),
	dataChanged: false
};
const reducers = require('./reducers');

const store = createStore(reducers, initialState);
window.dispatch = store.dispatch;
window.subscribe = store.subscribe;
window.getState = store.getState;

const renderCategories = require('./lib/render-categories');
const modal = require('./lib/modal');

let container;
$(() => {
	$.fn.findData = findData;
	container = $('#page-output');
	container.html(renderCategories());
	modal.init($('#modal-container'), $('#modal-backdrop'));
	handleCategoryEditing();
	subscribePageRender();
});

function handleCategoryEditing(){

	container.on('click', 'header button', ev => {

		const titleOfChosenCategory = $(ev.target).findData('category');

		const {title,image} = getState().categories.find(category => {
			return category.title === titleOfChosenCategory;
		});

		modal.open('category', {title,image});

	});

}

function subscribePageRender(){

	subscribe(() => {
		container.html(renderCategories());
		if (getState().dataChanged) $('footer').show();
	});

}

function findData(dataProperty){
	const dataArray = [];

	this.each(function(){
		dataArray.push($(this).parents(`[data-${dataProperty}]`).data(dataProperty));
	});

	return dataArray.length === 1 ? dataArray[0] : dataArray;
}