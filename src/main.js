const Home = {
    template: `
    <div class="search fade-in">
    <div class="checkbox" v-for="category of categorias">
        <input v-model="categoriasSelect" type="checkbox" :id="category" :value="category">
        <label :for="category">{{category}}</label>
    </div>
    <input type="text" placeholder="Search event" v-model="text">
</div>
<section class="cards">
    <h4 v-if="!events.length">No events found</h4>
    <div v-cloak v-for="event of events" class="Card fade-in">
        <div class="fade-in">
            <img :src="event.image" alt="">
            <div>
                <p class="date">{{event.date}}</p>
                <h5>{{event.name}}</h5>
                <span class="category">{{event.category}}</span>
                <p>{{event.place}}</p>
                <p>{{event.description}}</p>
                <span class="price">{{ event.price.toLocaleString('en-US', { style: 'currency', currency:
                    'USD'}) }}</span>
            </div>
            <router-link :to="{ name: 'details', params: { id: event._id } }">
            <button class="details">Details</button>
            </router-link>
          
        </div>
    </div>
</section>`,
    data() {
        return {
            urlApi: 'https://mindhub-xj03.onrender.com/api/amazing',
            dataEvents: [],
            events: [],
            date: '',
            evento: '',
            text: '',
            categorias: [],
            categoriasSelect: [],
            pagina: '',
            filtrados: '',
        }
    },
    created() {
        this.obtenerDatos(this.urlApi);
    },
    mounted() {
    },
    methods: {
        obtenerDatos(api) {
            fetch(api)
                .then(response => response.json())
                .then(data => {
                    this.date = data.currentDate;
                    this.dataEvents = data.events;
                    this.ordenar(this.dataEvents);
                    this.events = this.dataEvents;
                    this.buscarCategotias(this.events);
                })
                .catch(error => console.log(error));
        },

        ordenar(events) {
            events.sort((a, b) => new Date(a.date) - new Date(b.date));
            return events
        },

        buscarCategotias(data) {
            data.forEach(event => {
                if (!this.categorias.includes(event.category) && event.category) {
                    this.categorias.push(event.category)
                }
            })
        },

        filtrar() {
            this.filtrados = this.dataEvents.filter(event => {
                let categoria = this.categoriasSelect.length === 0 || this.categoriasSelect.includes(event.category);
                let nombre = event.name.toLowerCase().includes(this.text.toLowerCase());
                return categoria && nombre;
            });
            this.events = this.filtrados;
        },
    },
    watch: {
        text: function () {
            this.filtrar();
        },
        categoriasSelect: function () {
            this.filtrar();
        }
    },
}


const upcoming_events = {
    template: `
    <div class="search fade-in">
    <div class="checkbox" v-for="category of categorias">
        <input v-model="categoriasSelect" type="checkbox" :id="category" :value="category">
        <label :for="category">{{category}}</label>
    </div>
    <input type="text" placeholder="Search event" v-model="text">
</div>
<section class="cards">
    <h4 v-if="!events.length">No events found</h4>
    <div v-cloak v-for="event of events" class="Card fade-in">
        <div class="fade-in">
            <img :src="event.image" alt="">
            <div>
                <p class="date">{{event.date}}</p>
                <h5>{{event.name}}</h5>
                <span class="category">{{event.category}}</span>
                <p>{{event.place}}</p>
                <p>{{event.description}}</p>
                <span class="price">{{ event.price.toLocaleString('en-US', { style: 'currency', currency:
                    'USD'}) }}</span>
            </div>
            <router-link :to="{ name: 'details', params: { id: event._id } }">
            <button class="details">Details</button>
            </router-link>
          
        </div>
    </div>
</section>`,
    data() {
        return {
            urlApi: 'https://mindhub-xj03.onrender.com/api/amazing',
            dataEvents: [],
            events: [],
            eventsP: [],
            date: '',
            evento: '',
            text: '',
            categorias: [],
            categoriasSelect: [],
            pagina: '',
            filtrados: '',
        }
    },
    created() {
        this.obtenerDatos(this.urlApi);
    },
    mounted() {
    },
    methods: {
        obtenerDatos(api) {
            fetch(api)
                .then(response => response.json())
                .then(data => {
                    this.date = data.currentDate;
                    this.dataEvents = data.events;
                    this.ordenar(this.dataEvents);
                    this.buscarEventosProximos(this.dataEvents);
                    this.buscarCategotias();
                    this.pagina = 'Upcoming Events';
                })
                .catch(error => console.log(error));
        },
        ordenar(events) {
            events.sort((a, b) => new Date(a.date) - new Date(b.date));
            return events
        },

        buscarEventosProximos(data) {
            this.events = data.filter(evento => evento.date >= this.date);
            this.eventsP = this.events
            this.pagina = 'Upcoming Events';
        },
        buscarCategotias() {
            this.events.forEach(event => {
                if (!this.categorias.includes(event.category) && event.category) {
                    this.categorias.push(event.category)
                }
            })
        },

        filtrar() {
            this.filtrados = this.events.filter(event => {
                let categoria = this.categoriasSelect.length === 0 || this.categoriasSelect.includes(event.category);
                let nombre = event.name.toLowerCase().includes(this.text.toLowerCase());
                return categoria && nombre;
            });

            if (this.text || this.categoriasSelect.length > 0) {
                this.events = this.filtrados;
            } else {
                this.events = this.eventsP;
            }
        },

    },
    watch: {
        text: function () {
            this.filtrar();
        },
        categoriasSelect: function () {
            this.filtrar();
        }
    },
}

const past_events = {
    template: `
    <div class="search fade-in">
    <div class="checkbox" v-for="category of categorias">
        <input v-model="categoriasSelect" type="checkbox" :id="category" :value="category">
        <label :for="category">{{category}}</label>
    </div>
    <input type="text" placeholder="Search event" v-model="text">
</div>
<section class="cards">
    <h4 v-if="!events.length">No events found</h4>
    <div v-cloak v-for="event of events" class="Card fade-in">
        <div class="fade-in">
            <img :src="event.image" alt="">
            <div>
                <p class="date">{{event.date}}</p>
                <h5>{{event.name}}</h5>
                <span class="category">{{event.category}}</span>
                <p>{{event.place}}</p>
                <p>{{event.description}}</p>
                <span class="price">{{ event.price.toLocaleString('en-US', { style: 'currency', currency:
                    'USD'}) }}</span>
            </div>
            <router-link :to="{ name: 'details', params: { id: event._id } }">
            <button class="details">Details</button>
            </router-link>
          
        </div>
    </div>
</section>`,
    data() {
        return {
            urlApi: 'https://mindhub-xj03.onrender.com/api/amazing',
            dataEvents: [],
            events: [],
            eventsPast: [],
            date: '',
            evento: '',
            text: '',
            categorias: [],
            categoriasSelect: [],
            pagina: '',
            filtrados: '',
        }
    },
    created() {
        this.obtenerDatos(this.urlApi);
    },
    mounted() {
    },
    methods: {
        obtenerDatos(api) {
            fetch(api)
                .then(response => response.json())
                .then(data => {
                    this.date = data.currentDate;
                    this.dataEvents = data.events;
                    this.ordenar(this.dataEvents);
                    this.buscarEventosPasados(this.dataEvents);
                    this.buscarCategotias();
                    this.pagina = 'Upcoming Events';
                })
                .catch(error => console.log(error));
        },

        ordenar(events) {
            events.sort((a, b) => new Date(a.date) - new Date(b.date));
            return events
        },

        buscarEventosPasados(data) {
            this.events = data.filter(evento => evento.date < this.date);
            this.eventsPast = this.events
            this.pagina = 'Past Events';
        },
        buscarCategotias() {
            this.events.forEach(event => {
                if (!this.categorias.includes(event.category) && event.category) {
                    this.categorias.push(event.category)
                }
            })
        },

        filtrar() {
            this.filtrados = this.events.filter(event => {
                let categoria = this.categoriasSelect.length === 0 || this.categoriasSelect.includes(event.category);
                let nombre = event.name.toLowerCase().includes(this.text.toLowerCase());
                return categoria && nombre;
            });

            if (this.text || this.categoriasSelect.length > 0) {
                this.events = this.filtrados;
            } else {
                this.events = this.eventsPast;
            }
        },

    },
    watch: {
        text: function () {
            this.filtrar();
        },
        categoriasSelect: function () {
            this.filtrar();
        }
    },
}

const details = {
    template: `
<section>
    <div v-cloak v-if="evento" class="modal fade-in" style="display: flex;">
        <div class="Card modal-card">
            <div class="fade-in">
                <img :src="evento.image" alt="Evento">
            <div>
            <p class="date">{{evento.date}}</p>
            <h5>{{evento.name}}</h5>
            <span class="category">{{evento.category}}</span>
            <p>{{evento.place}}</p>
            <p>{{evento.description}}</p>
            <p>{{evento.capacity ? 'Capacity: ' + evento.capacity : ''}}</p>
            <p>{{evento.assistance !== undefined ? 'Assistance: ' + evento.assistance : ''}}</p>
            <p>{{evento.estimate !== undefined ? 'Estimate: ' + evento.estimate : ''}}</p>
            <span class="price">{{ evento.price.toLocaleString('en-US', { style: 'currency',
                currency:
                'USD'}) }}</span>
            </div>
        </div>
        <button @click="closeModal()" class="close-modal">x</button>
        </div>
    </div>
</section>
`,
    data() {
        return {
            urlApi: 'https://mindhub-xj03.onrender.com/api/amazing',
            dataEvents: [],
            events: [],
            evento: '',
            pagina: ''
        }
    },
    created() {
        this.obtenerDatos(this.urlApi);
    },
    mounted() {
    },
    methods: {
        obtenerDatos(api) {
            fetch(api)
                .then(response => response.json())
                .then(data => {
                    this.date = data.currentDate;
                    this.dataEvents = data.events;
                    this.pagina = 'Details'
                    this.buscarEvento();
                    console.log(this.$route.params.id)
                })
                .catch(error => console.log(error));
        },
        buscarEvento() {
            this.evento = this.dataEvents.find(elem => elem._id == this.$route.params.id);
            console.log(this.evento);
            this.pagina = 'Details'
        },
        closeModal() {
            this.evento = '';
            this.$router.go(-1);
        }

    },

}

const routes = [
    { path: '/', component: Home },
    { path: '/upcoming_events', component: upcoming_events },
    { path: '/past_events', component: past_events },
    { path: '/details/:id', name: 'details', component: details }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})

const app = Vue.createApp({
    data() {
        return {
            pagina: '',
        }
    },
    methods: {
        pag(textoBoton) {
            this.pagina = textoBoton;
        }
    },
    watch: {
        '$route': function () {
            // Actualiza la variable pagina cuando cambia la ruta
            const ruta = this.$route.path;
            if (ruta === '/') {
                this.pagina = 'Home';
            } else if (ruta === '/upcoming_events') {
                this.pagina = 'Upcoming Events';
            } else if (ruta === '/past_events') {
                this.pagina = 'Past Events';
            } else {
                this.pagina = '';
            }
        }
    }
})
app.use(router)
app.mount('#app')