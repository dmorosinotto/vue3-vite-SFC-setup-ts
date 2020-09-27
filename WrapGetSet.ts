//HELPER CLASS USATA PER POTER ESPLICITARE UN get/set CON LOGICA CUSTOM CHE NON POSSO INSERIRE NELLA setup function
export class WrapGetSet<T> {
	constructor(private getter: () => T, private setter: (v: T) => void) {}
	get value(): T {
		console.log(Date.now, "invoke GETTER");
		return this.getter();
	}
	set value(v: T) {
		console.log(Date.now, "invoke SETTER", v);
		this.setter(v);
	}
}
