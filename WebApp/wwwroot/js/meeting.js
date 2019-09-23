new Vue({
    el: '#meeting',
    data: {
        state: true,
        objectIndex: 0,
        meetingModel: {
            name: "",
            employeesId: "",
            id: ""
        },
        meetings: []
    },
    mounted() {
        axios
            .get('/api/meetings')
            .then(response => {
                this.meetings = response.data,
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
                this.meetingModel.name !== '' &&
                this.meetingModel.employeesId !== ''
            ) {
                isDisabled = false;
            }

            return isDisabled;
        }
    },
    methods: {
        resetForm() {
            this.meetingModel.name = '';
            this.meetingModel.employeesId = '';
        },
        createMeeting() {
            axios
                ({
                    method: 'post',
                    url: '/api/meetings',
                    data: {
                        "name": this.meetingModel.name,
                        "employeesId": this.meetingModel.employeesId
                    }
                })
                .then(response => {
                    this.meetings.push(response.data);
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {
                    this.loading = false;
                });
        },
        getMeetingId(id) {
            axios
                .get('/api/meetings' + id)
                .then(response => {
                    this.meetings = response.data,
                        console.log(response);
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {
                    this.loading = false;
                });
        },
        updateMeeting(id) {
            axios
                ({
                    method: 'put',
                    url: '/api/meetings/' + id,
                    data: {
                        "name": this.meetingModel.name,
                        "employeesId": this.meetingModel.employeesId,
                        "id": this.meetingModel.id
                    }
                })
                .then(response => {
                    this.meetings.splice(this.objectIndex, 1, response.data);
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {
                    this.loading = false;
                });
        },
        deleteMeetingId(id, index) {
            axios
                .delete('/api/meetings/' + id)
                .then(response => {
                    console.log(response);
                    this.meetings.splice(index, 1);

                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {
                    this.loading = false;
                });
        },
        editMeeting(meeting, index) {
            this.objectIndex = index;
            this.meetingModel = {
                id: meeting.id,
                name: meeting.name,
                employeesId: meeting.employeesId
            };
        }

    }
});