
new Vue({
    el: '#employee',
    data: {
        state: true,
        objectIndex: 0,
        employeeModel: {
            name: "",
            age: "",
            id: ""
        },
        employees: []
    },
    mounted() {
        axios
            .get('/api/employees')
            .then(response => {
                this.employees = response.data,
                    console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
            .then(() => {
                this.loading = false;
            });
    },
    computed: {
        isSubmitDisabled() {
            let isDisabled = true;

            if (
                this.employeeModel.name !== '' &&
                this.employeeModel.age !== ''
            ) {
                isDisabled = false;
            }

            return isDisabled;
        }
    },
    
    methods: {
        resetForm() {
            this.employeeModel.name = '';
            this.employeeModel.age = '';
        },
        createEmployee() {
            axios
                ({
                    method: 'post',
                    url: '/api/employees',
                    data: {
                        "name": this.employeeModel.name,
                        "age": this.employeeModel.age
                    }
                })
                .then(response => {
                        this.employees.push(response.data);
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {
                    this.loading = false;
                });
        },
        getEmployeeId(id) {
            axios
                .get('/api/employees' + id)
                .then(response => {
                    this.employees = response.data,
                        console.log(response);
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {
                    this.loading = false;
                });
        },
        updateEmployee(id) {
            axios
                ({
                    method: 'put',
                    url: '/api/employees/' + id,
                    data: {
                        "name": this.employeeModel.name,
                        "age": this.employeeModel.age,
                        "id": this.employeeModel.id
                    }
                })
                .then(response => {
                    this.employees.splice(this.objectIndex, 1, response.data);
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {
                    this.loading = false;
                });
        },
        deleteEmployeeId(id, index) {
            axios
                .delete('/api/employees/' + id)
                .then(response => {
                    console.log(response);
                    this.employees.splice(index, 1);
                        
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {
                    this.loading = false;
                });
        },
        editEmployee(employee, index) {
            this.objectIndex = index;
            this.employeeModel = {
                id: employee.id,
                name: employee.name,
                age: employee.age
            };
        }

    }
});