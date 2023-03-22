const { createApp } = Vue


createApp({
    data() {
        return {
            dataEvents: [],
        }
    },

    created() {
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
            .then(response => response.json())
            .then(data => {
                this.dataEvents = data
                console.log(this.dataEvents)
            });
    },

    mounted() {
    },

    methods: {

        // ordenar(events) {
        //     events.sort((a, b) => new Date(a.date) - new Date(b.date));
        // },
        mensaje() {
            console.log('Hola la papas estan crudas')
        }
    },

    computed: {

    }

}).mount('#app')
