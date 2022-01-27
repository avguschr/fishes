
const app = Vue.createApp({
    data: () => ({
        name: '',
        user: {},
        fishes: [],
        modal: true,
        field : {}
    }),

    methods: {
        getData() {
            let heightField = this.$refs.field.clientHeight
            let widthField = this.$refs.field.clientWidth
            this.field = {
                width : widthField,
                height : heightField
            }
            let fishesRefs = []
            let oneFish = ''
            for (let i = 0; i < 10; i++) {
                oneFish = eval('this.$refs.fish' + i + 1)
                fishesRefs.push(oneFish)
            }
            return {
                field: {
                    width : widthField,
                    height : heightField
                },
                fishesRefs
            }
        },
        start() {
            for (let i = 0; i < 10; i++) {
                let fishNum = Math.floor(Math.random() * (4 - 1) + 1)
                let fish = {}
                switch (fishNum) {
                    case 1:
                        fish.name = 'img/fish-1.png'
                        fish.scores = 1
                        fish.speed = 1
                        break
                    case 2:
                        fish.name = 'img/fish-2.png'
                        fish.scores = 2
                        fish.speed = 2
                        break
                    case 3:
                        fish.name = 'img/fish-3.png'
                        fish.scores = 3
                        fish.speed = 3
                        break
                    default:
                        break
                }
                fish.coords = {left: Math.floor(Math.random() * this.field.width), top: Math.floor(Math.random() * this.field.height)}
                this.fishes.push(fish)
            }

            if (this.name !== '') {
                this.user.name = this.name
                this.modal = false
                console.log(this.fishes[5])
                let fish = this.$refs.fish3
                console.log(fish)
                setTimeout(() => console.log(this.getData()), 0)
            }

        },

        move(fish) {
            setInterval(() => {

            })
        }
    },

    mounted () {
        setTimeout(() => this.getData(), 0)
    },

}).mount('#app')


