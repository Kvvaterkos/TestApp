//new Vue({
//    el: '#change',
//    data: {
//        state: "true"
//    },
//    methods: {
//        changeVue() {
//            console.log(this.state);
//            this.state = !this.state; 
//        }
//    }
//});

Vue.component('show', {
    props: ["state"],
    data: function () {
        return {
            state: false
        };
    },
    template: '<button v-on: this.state="!this.state"></button>'
});