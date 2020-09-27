export type Info = {
	likes: number;
	hashtags: string[];
};

const getKey = (userId) => `INFOS_${userId || 0}`;
const TAGS = ["angular", "blazor", "react", "vue", "typescript", ".net c#", "jsx", "javascript", "XE", "framework"];

export function readINFOS(userId) {
	let INFOS: { [id: string]: Info };
	try {
		INFOS = JSON.parse(localStorage.getItem(getKey(userId)));
		return INFOS;
	} catch {
		//GENERATE FAKE INFO FOR EACH POST (1..100)
		INFOS = Array(100)
			.fill(1)
			.reduce((infos, _, i) => {
				let postId = String(1 + i);
				let ids = (i / 10).toFixed(2);
				let info = {
					likes: (i % 10) * 5,
					hashtags: [...new Set([TAGS[ids[0]], TAGS[ids[2]], TAGS[ids[3]]]).values()],
				};
				infos[postId] = info; //INFOS[post.id] = { likes: 0-45, hashtags: [2/3 TAG univoci]}
				return infos;
			}, {});
		if (userId) saveINFOS(INFOS, userId);
	}
	return INFOS;
}

export function saveINFOS(INFOS, userId) {
	localStorage.setItem(getKey(userId), JSON.stringify(INFOS));
}
