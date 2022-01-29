const App = {
    data() {
        return {
            task: {title: ''},
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
        // 追加
        createTask(){
            const csrftoken = Cookies.get('csrftoken');
            this.getTasks();
            fetch(URL, {
                method: 'post',
                headers: {
                    'Content-Type':  'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body:JSON.stringify(this.task),
            })
            .then((response) => {
                return response.json();
            })
            .then((task) => {
                console.log(task)
                this.task.title = ''
                this.getTasks();
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