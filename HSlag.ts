import { h, defineComponent, VNodeNormalizedChildren } from "vue";

// ESEMPIO DI COMPONENTE VUE CHE IMPLEMENTA DIRETTAMENTE render function
// VEDI DOCS: https://v3.vuejs.org/guide/render-function.html#render-functions

const HSlag = defineComponent({
	render() {
		// create kebab-case id from the text contents of the children
		const headingId = getChildrenTextContent(this.$slots.default())
			.toLowerCase()
			.replace(/\W+/g, "-") // replace non-word characters with dash
			.replace(/(^-|-$)/g, ""); // remove leading and trailing dashes

		return h("h" + (this.level || 1), { style: { "text-transform": this.level ? "capitalize" : "uppercase" } }, [
			h(
				"a",
				{
					name: headingId,
					href: "#" + headingId,
				},
				this.$slots.default()
			),
		]);
	},
	props: {
		level: {
			type: Number,
			required: true,
		},
	},
});

/** Recursively get text from children nodes */
function getChildrenTextContent(children: VNodeNormalizedChildren) {
	console.log(children);
	return Array.isArray(children)
		? children
				.map((node) => {
					return typeof node !== "object"
						? String(node)
						: Array.isArray(node)
						? getChildrenTextContent(node)
						: node.children
						? getChildrenTextContent(node.children)
						: "";
				})
				.join("")
		: String(children);
}

export default HSlag;
