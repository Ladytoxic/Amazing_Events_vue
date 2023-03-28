const Home = { template:'<div><h1>Home</h1></div>'}
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
            eventosPasados: [],
            eventosProximos: [],
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
                    this.ordenar(this.dataEvents);
                    this.events = this.dataEvents;
                    this.buscarCategotias(this.dataEvents)
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
        mostrarTodos() {
            this.events = this.dataEvents
            this.pagina = 'Home'
        },
        buscarEventosProximos() {
            this.events = this.dataEvents.filter(evento => evento.date >= this.date);
            this.ordenar(this.events);
            this.pagina = 'Upcoming Events'
        },
        buscarEventosPasados() {
            this.events = this.dataEvents.filter(evento => evento.date < this.date);
            this.ordenar(this.events);
            this.pagina = 'Past Events'
        },
        buscarCategotias(data) {
            data.forEach(event => {
                if (!this.categorias.includes(event.category) && event.category) {
                    this.categorias.push(event.category)
                }
            })
        },
        filtrar() {
            let filtrados = this.dataEvents.filter(event => {
                let cumpleCategoria = this.categoriasSelect.length === 0 || this.categoriasSelect.includes(event.category);
                let cumpleNombre = event.name.toLowerCase().includes(this.text.toLowerCase());
                return cumpleCategoria && cumpleNombre;
            });
            this.events = filtrados;
        }
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


