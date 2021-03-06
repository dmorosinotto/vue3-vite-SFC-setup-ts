export default {
	posts: [
		{
			id: 1,
			title: "Learning Vue.js 3",
			body: "I am learning Vue.js 3 with the composition API. It is great!",
			info: { likes: 10, hashtags: ["vue", "javascript", "composition api"] },
		},

		{
			id: 2,
			title: "Learning Vuex",
			body:
				"Vuex is a state management solution for Vue. It allows you to logically separate entities into modules.",
			info: { likes: 14, hashtags: ["vue", "vuex", "flux"] },
		},

		{
			id: 3,
			title: "Routing with Vue Router",
			body: "I am creating a complex front-end app using Vue Router.",
			info: { likes: 15, hashtags: ["vue", "vue-router"] },
		},

		{
			id: 4,
			title: "Testing Vue Apps",
			body:
				"I am writing some tests for my application using Vue Test Utils. Testing is critical by often overlooked due to complexity or time constraints.",
			info: { likes: 30, hashtags: ["vue", "javascript", "testing"] },
		},
	],
};
