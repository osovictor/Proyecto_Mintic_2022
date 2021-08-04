//Componente para crear tags en html desde js
Vue.component('CoinDetail', {
    
    //Propiedades heredadas
    props: ['coin'],

    data() {
        return{
           showPrices: false,
	   value: 0
        }   
    },

    methods: {
	 toggleshowPrices () {
            this.showPrices = !this.showPrices
		//Evento del hijo al padre
	    this.$emit('change-color', 
		this.showPrices ? 'FF96C8' : '3D3D3D')	
	 }
    },

    //Funciones que retornan valor
    computed: {
        title () {
            return `${this.coin.name} - ${this.coin.Symbol}`
        },

        convertedValue (){
            if(!this.value){
                return 0
            }

            return this.value / this.coin.price
        }
    },

    created () {
        console.log('Created CoinDetail..')
    },	

    mounted () {
        console.log('Mounted CoinDetail..')        
    },	

    template: `
	<div>
	<img 
        v-on:mouseover="toggleshowPrices" 
        v-on:mouseout="toggleshowPrices" 
        v-bind:src="coin.img" v-bind:alt="coin.name">

	<h1 
          v-bind:class="coin.changePercent > 0 ? 'green' : 'red'">
          {{ title }}
          <span v-if="coin.changePercent > 0">👍</span>
          <span v-else-if="coin.changePercent < 0">👎</span>
          <span v-else>🤞</span>

          <span v-on:click="toggleshowPrices">
            {{ showPrices ? '🙈' : '🙉' }}</span>
          <!-- <span v-show="changePercent > 0">👍</span>
          <span v-show="changePercent < 0">👎</span>
          <span v-show="changePercent == 0">🤞</span> -->
        </h1>

	<input type="number" v-model = "value">
        <span>{{ convertedValue }}</span>

	<!-- Contenido desde el padre al hijo HTML-->
	<slot name="text"></slot>
	<slot name="link"></slot>

	<ul v-show="showPrices">
          <li 
            class="uppercase"
            v-bind:class="{ orange: p.value === coin.price, red: p.value < coin.price, green: p.value > coin.price}"
            v-for="(p, i) in coin.pricesWithDays" v-bind:key="p.day">
            {{ i }} - {{ p.day }} - {{ p.value }}
          </li>
        </ul>
	</div>
    `		
})

new Vue({
    //Linkeamos a nuestro componente en HTML
    el: '#app',
    //Toda la informacion que se maneja en la app
    data (){
        return{
	   btc:{
	   	name: 'Bitcoin',
           	Symbol: 'BTC',
           	img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
           	changePercent: -10,
		           price: 8400,
		//prices: [8400, 7900, 8200, 9000, 9400, 10000, 10200],

           	pricesWithDays: [
               		{ day: 'Lunes', value: 8400},
               		{ day: 'Martes', value: 7900},
              		{ day: 'Miercoles', value: 8200},
	                { day: 'Juves', value: 9000},
         	        { day: 'Viernes', value: 9400},
               		{ day: 'Sabado', value: 10000},
	                { day: 'Domingo', value: 10200}
         	],
 	   },

           color: 'f4f4f4',
        }
    },    

//Metodos de VUE del proceso
    created () {
        console.log('Created..')
    },	

    mounted () {
        console.log('Mounted..')        
    },	

    //Observa cuando dicha propieda o elemento cambia
    /*watch: {
        showPrices (newVal, oldVal) {
            console.log(newVal, oldVal)
        }
    },*/

    //Metodos que representan acciones u operaciones entre otras
    methods: {
        updateColor (color) {
            this.color = color || this.color.split('')
            .reverse().join('')
        }
    }
})