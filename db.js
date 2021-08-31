// This file mocks a database.

const users = [
	{
		email: 'alpha@beta.com',
		password: 'truexxx'
	}
];

const publicPosts = [
	{
		title: 'Lorem ipsum dolor sit amet.',
		content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam  tempore eaque!'
	},
	{
		title: 'Lorem ipsum dolor.',
		content: 'Lorem adipisicing elit. Laboriosam modi mollitia rem, nobis tempore eaque!'
	},
	{
		title: 'Lorem, ipsum dolor sit amet consectetur adipisicing.',
		content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam modi mollitia rem, nobis tempore eaque!'
	},
];

const privatePosts = [
	{
		title: 'Cookie sweet roll.',
		content: 'Donut donut chupa chups cookie marzipan sweet roll toffee. Cupcake biscuit brownie bonbon caramels sweet. '
	},
	{
		title: 'Danish donut bear claw.',
		content: 'Danish pudding halvah shortbread halvah fruitcake. '
	},
	{
		title: 'Powder caramels soufflé sweet marzipan.',
		content: 'Tootsie roll danish jelly-o caramels caramels cotton candy tootsie roll lemon drops. Icing sweet roll!'
	},
];

module.exports = {
	users,
	publicPosts,
	privatePosts
};