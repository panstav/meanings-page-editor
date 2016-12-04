const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

const isProduction = process.env.NODE_ENV === 'production';
const version = require('./package.json').version;

gulp.task('clean', () => {

	const publicFiles = [
		'!public/.gitignore', 'public/*'
	];

	return gulp.src(publicFiles, { read: false })
		.pipe(plugins.clean({ force: true }));

});

gulp.task('static', () => {

	const sourcePaths = [
		'client/zepto.js',
		'node_modules/tachyons/css/tachyons.min.css'
	];

	// copy pastes
	return gulp.src(sourcePaths)
		.pipe(gulp.dest('public'));

});

gulp.task('css', () => {

	const sassOptions = isProduction
		? { outputStyle: 'compressed' }
		: { outputStyle: 'nested', errLogToConsole: true, sourceComments : 'normal' };

	return gulp.src('client/index.sass')
		.pipe(plugins.sass(sassOptions))
		.pipe(plugins.autoprefixer({ browsers: ['> 1%', 'ie > 8'] }))
		.pipe(plugins.rename({ basename: isProduction ? version : 'styles' }))
		.pipe(gulp.dest('public'));

});

gulp.task('javascript', () => {

	return gulp.src('client/index.js')
		.pipe(plugins.browserify({ transform: ['babelify'] }))
		.pipe(plugins.rename({ basename: isProduction ? version : 'scripts' }))
		.pipe(gulp.dest('public'));

});

gulp.task('html', () => {

	const resources = {

		css: [
			'tachyons.min.css',
			isProduction ? version + '.css' : 'styles.css'
		],

		js: [
			'zepto.js',
			isProduction ? version + '.js' : 'scripts.js'
		]

	};

	return gulp.src('client/index.html')
		.pipe(plugins.htmlReplace(resources))
		.pipe(plugins.if(isProduction, plugins.htmlmin({ collapseWhitespace: true })))
		.pipe(gulp.dest('public'));

});

gulp.task('build', plugins.sequence('clean', 'static', 'css', 'javascript', 'html'));

gulp.task('watch', () => {
	gulp.watch('client/**/*.*', ['css', 'javascript', 'html']);
});

gulp.task('build-zepto', () => {

	const cmd = `MODULES="${process.env.ZEPTO_MODULES || 'zepto event'}" cd node_modules/zepto && npm run dist && cp dist/zepto.js ../../client`;

	return gulp.src('package.json', { read: false })
		.pipe(plugins.shell([cmd]));

});