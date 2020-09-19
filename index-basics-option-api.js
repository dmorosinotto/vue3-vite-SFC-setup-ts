import { createApp } from "vue/dist/vue.esm-browser.js";

const TryForm = {
	//emits: ["MyEvt"],
	//props: ["count"],
	props: {
		count: {
			type: Number,
			required: true,
			default: 0
		}
	},
	template: `
        <h3>Hello from component TryForm: {{count}}</h3>
        <label> MANUAL INCORRECT: <input @input="log" :value="count" /> <u class="red">{{error}}</u> </label>
        <label> WITH V-MODEL OK! <input v-model="value" /> <u class="red">{{errLen}}</u> <button @click="doMyEvt">OK</button></label>
        <label> WORK WITH RADIO <input type="radio" v-model="and" value="a"/> <input type="radio" v-model="and" value="b"/> {{and}} </label>
        <label> WORK WITH CHECKBOX <input type="checkbox" v-model="bool" /> {{bool}}</label>
        <label> WORK WITH CHECKBOX GROUP <input type="checkbox" v-model="or" value="a" /> <input type="checkbox" v-model="or" value="b" /> {{or}}</label>
    `,
	data() {
		return {
			error: "",
			value: "",
			bool: true,
			and: "a",
			or: ["b"]
		};
	},
	computed: {
		errLen() {
			if (this.value.length <= this.count) return "too short";
		}
	},
	methods: {
		log($evt) {
			//MANUAL EVENT HANDLING
			const val = $evt.target.value;
			console.log(">", val, $evt);
			if (val.length > 5) {
				//MANUAL VALIDATION
				this.error = "too long";
			} else this.error = "";
		},
		doMyEvt() {
			this.$emit("MyEvt", this.value); //EMIT CUSTOM EVENT TO PARENT
		}
	}
};

const app = createApp({
	components: { TryForm },
	template: `
        Hello {{msg}} by <p v-on:mouseover="incr">{{person}}</p> 
        <div> {{count}} <button @click="incr()">+</button> <button v-on:click="incr(2)">++</button> </div> 
        <div v-if="(count % 2)==0">Pari</div> 
        <span v-if="isOdd">ODD</span><span v-else>EVEN</span>
        <ul v-show="!isOdd" @dblclick.stop="count=0">
            <li v-for="(num,idx) in evenNumbers">{{num}}
                <span v-bind:title="num" :class="{ 'red': idx % 2 }"> @{{idx}} </span>
            </li>
        </ul>
        <button @click="add(count)">MUTATE ARRAY</button> {{numbers}}
        <try-form :count="count" @MyEvt="add" />
        <TryForm v-bind:count="numbers[numbers.length-1]" v-on:MyEvt="incr(+$event)"></TryForm>
    `,
	data() {
		return {
			msg: "world",
			person: { name: "Daniele", age: 45 },
			count: 0,
			numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9]
		};
	},
	computed: {
		isOdd() {
			return this.count % 2; //FALSY =0 -> PARI
		},
		evenNumbers() {
			return this.numbers.filter(n => !(n % 2));
		}
	},
	methods: {
		incr(what = 1) {
			this.count += what;
		},
		add(num) {
			this.numbers.push(num);
		}
	}
}).mount("#app");

window.try_it_in_console = app;
//APRIRE F12 E USARE try_it_in_console.incr(); console.log(try_it_in_console.count);
//REACTIVITY SU OBJ/ARR try_it_in_console.person.lastname="Pluto"; try_it_in_console.numbers.push(10);
