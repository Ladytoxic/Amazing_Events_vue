const Home = { template: '<div>{{categorias}}</div>' }
const upcoming_events = { template: '<div>Próximos Eventos</div>' }
const past_events = { template: '<div>Eventos Pasados</div>' }

const routes = [
    { path: '/', component: Home },
    { path: '/upcoming_events', component: upcoming_events },
    { path: '/past_events', component: past_events },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})

const app = Vue.createApp({
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
                    this.pagina = 'Home'
                })
                .catch(error => console.log(error));
        },

        buscarEvento(id, array) {
            const buscarId = array.find(elem => elem._id === id);
            if (buscarId) {
                this.evento = buscarId;
                console.log(this.evento);
            } else {
                console.log(`No se encontró ID ${id}`);
            }
        },

        closeModal() {
            this.evento = ''
        },

        ordenar(events) {
            events.sort((a, b) => new Date(a.date) - new Date(b.date));
            return events
        },

        limpiarFiltros() {
            this.text = '';
            this.categoriasSelect = [];
        },

        mostrarTodos() {
            this.events = this.dataEvents;
            router.push('/');
            this.pagina = 'Home';
        },

        buscarEventosProximos(data) {
            this.events = data.filter(evento => evento.date >= this.date);
            this.pagina = 'Upcoming Events';
            router.push('/upcoming_events');
        },

        buscarEventosPasados(data) {
            this.events = data.filter(evento => evento.date < this.date);
            this.pagina = 'Past Events';
            router.push('/past_events');
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

    computed: {

    }

})
app.use(router)
app.mount('#app')