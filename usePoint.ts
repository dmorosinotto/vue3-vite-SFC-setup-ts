import { reactive, computed, watch } from "vue";

interface IPoint {
	x: number;
	y: number;
}
//ESEMPIO DI COMPOSABLE -> SEPARO SU FILE ESTERNO UNA PARTE RIUTILIZZABILE PER COMPORRRE SETUP
export function usePoint(origin: IPoint = { x: 0, y: 0 }) {
	//EQUIVALE A data() SU options-api
	const point = reactive(origin); //ractive PER OGGETTI COMPLESSI -> NON SERVE .value

	//EQUIVALE A computed SU options-api
	const distance = computed(() => {
		console.log("Ricalcolo AUTOMATICO solo se modifico X, Y"); //computed VIENE RICALCOLATO IN AUTOMATICO DA Vue Reactivity System
		return Math.sqrt(point.x ** 2 + Math.pow(point.y, 2)); //DETERMINA LE DIPENDENZE IN MODO AUTOMATICO DALL'ESPRESSIONE USATA !!!
	});

	//EQUIVALENTI A methods SU options-api
	function move(dir: keyof IPoint, delta: number = 1) {
		point[dir] += delta; //NOTARE CHE CON reactive NON USO .value!
	}

	//EQUIVALENTI A watch SU options-api
	// prettier-ignore
	watch(point, (newVal /*,oldVal*/) => { 
    console.log( //SIDE-EFFECT RICHIAMTO QUANDO LE PROP DI point CAMBIANO - MA NON HO oldVal!!!
        `SIDE-EFFECT NEW POINT {x= ${newVal.x}, y=${newVal.y}}`
    );
    },  { immediate: true} ); //POSSO IMPORRE L'ESECUZIONE IN PARTENZA AL mounted

	//TODO: IMPORTANTE RICORDARSI DI TORNARE TUTTO QUELLE CHE SI VUOLE ESPORRE !!!
	return {
		point,
		move,
		distance,
	};
}
