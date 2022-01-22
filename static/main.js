const App = {
    data() {
        return {
            tasks: [],
        }
    },
    compilerOptions: {
        delimiters: ['[[', ']]'],
    },
    methods: {
        getTasks(){
            fetch(URL, {
                method: 'get',
                headers: {
                    'Content-Type':  'application/json',
                },
            })
            .then((response) => {
                return response.json();
            })
            .then((tasks_list) => {
                this.tasks = tasks_list;
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
        },
    },
    created() {
        this.getTasks();
    },
}

Vue.createApp(App).mount('#app')