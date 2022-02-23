// console.log(
// 	'🚀 ~ file: prod.ts ~ line 3 ~ process.env.REACT_APP_HOST_BE_GRAPHQL',
// 	process.env.REACT_APP_HOST_BE_GRAPHQL,
// );

const prod = {
	baseDomain: process.env.REACT_APP_HOST_BE_GRAPHQL,
	basePostUrl: process.env.REACT_APP_HOST_BE,
};

export default prod;
