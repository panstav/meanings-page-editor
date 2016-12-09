const createStore = require('redux').createStore;

const initialState = {
	categories: [],
	dataChanged: false
};
const reducers = require('./reducers');

const store = createStore(reducers, initialState);
window.dispatch = store.dispatch;
window.subscribe = store.subscribe;
window.getState = store.getState;

const renderCategories = require('./lib/render-categories');
const modal = require('./lib/modal');

const dbApikey = '?apikey=584a86ded386005e6393742b';

let container;
$(() => {
	$.fn.findData = findData;
	container = $('#page-output');
	modal.init($('#modal-container'), $('#modal-backdrop'));
	handleCategoryEditing();
	handleSavingChanges();
	subscribePageRender();
	getSavedDataFromRestDB();
});

function handleCategoryEditing(){

	container.on('click', 'header button', ev => {

		const titleOfChosenCategory = $(ev.target).findData('category');

		const {title,image} = getState().categories.find(category => {
			return category.title === titleOfChosenCategory;
		});

		modal.open('category', {title,image});

	});

	container.on('click', 'summary button', ev => {

		const buttonElem = $(ev.target);

		const titleOfChosenCategory = buttonElem.findData('category');
		const titleOfChosenCategoryItem = buttonElem.findData('item');

		const itemData = getState().categories.find(category => {
			return category.title === titleOfChosenCategory;
		}).items.find(item => {
			return item.title === titleOfChosenCategoryItem;
		});

		modal.open('item', itemData);

	});

}

function handleSavingChanges(){

	$('footer button').on('click', ev => {

		const date = new Date();
		const data = {
			createdAt: date.getTime(),
			categories: getState().categories
		};

		$.ajax({ data, type: 'POST', url: 'https://stavio-3f07.restdb.io/rest/cybertattoo/584a924c62fb0d7d00000005' + dbApikey,
			success: () => {
				$('footer').hide();
			},
			error: err => {
				console.error(err);
				console.error(err.stack);
			}
		});

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

function getSavedDataFromRestDB(){

	$.ajax({ url: 'https://stavio-3f07.restdb.io/rest/cybertattoo' + dbApikey, success, error: err => {
		console.error(err);
		console.error(err.stack);
	} });

	function success(data){

		const sortedDocs = data.sort((a,b) => a.createdAt > b.createdAt ? -1 : 1);
		sortedDocs.slice(10).forEach(oldDoc => {
			$.ajax({ type: 'DELETE', url: `https://stavio-3f07.restdb.io/rest/cybertattoo/${oldDoc._id}${dbApikey}` });
		});

		dispatch({ type: 'LOAD_ASYNC_DATA', payload: sortedDocs[0].categories });
	}

}