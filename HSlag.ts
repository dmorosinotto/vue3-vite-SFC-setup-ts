import { h, defineComponent, VNode, VNodeArrayChildren } from "vue";

// ESEMPIO DI COMPONENTE VUE CHE IMPLEMENTA DIRETTAMENTE render function
// VEDI DOCS: https://v3.vuejs.org/guide/render-function.html#render-functions

const HSlag = defineComponent({
	render() {
		// create kebab-case id from the text contents of the children
		const headingId = getChildrenTextContent(this.$slots.default())
			.toLowerCase()
			.replace(/\W+/g, "-") // replace non-word characters with dash
			.replace(/(^-|-$)/g, ""); // remove leading and trailing dashes

		return h("h" + this.level, [
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
type RawChildren = Parameters<typeof h>[2];
function getChildrenTextContent(children /*: VNode[] o RawChildren */) {
	return children
		.map((node) => {
			return typeof node.children === "string"
				? node.children
				: Array.isArray(node.children)
				? getChildrenTextContent(node.children)
				: "";
		})
		.join("");
}

export default HSlag;
