
const app = Vue.createApp({
    data: () => ({
        name: '',
        user: {},
        scores: 0, 
        fishes: [],
        modal: true,
        field : {},
        timer: {},
        end: false,
        local: []
    }),
    methods: {
        myTimer() {
            const timer = setInterval(() => {
                if (this.timer.min < 10) {
                    this.timer.minText = '0' + this.timer.min
                } else this.timer.minText = this.timer.min
                if (this.timer.sec < 10) {
                    this.timer.secText = '0' + this.timer.sec
                } else this.timer.secText = this.timer.sec
                if (this.timer.sec === 0) {
                    this.timer.sec = 59
                    this.timer.min --
                } else this.timer.sec --
                if (this.timer.min === 0 && this.timer.sec === 0) {
                    clearInterval(timer)
                    this.end = true
                    this.local.push(this.scores)
                    this.local = this.local.sort((a, b) => {
                        if (a < b) return 1
                        if (a > b) return -1
                        return 0
                    })
                    localStorage.local = JSON.stringify(this.local.slice(0, 10))

                }
            }, 1000)
        },
        getData() {
            let heightField = this.$refs.field.clientHeight
            let widthField = this.$refs.field.clientWidth
            this.field = {
                width : widthField,
                height : heightField
            }
        },
        start() {
            this.scores = 0
            this.timer = {min: 0, sec: 1, minText: '', secText: ''}
            this.fishes = []
            this.end = false

            if (this.name !== '') {
                this.user.name = this.name
                this.modal = false
                this.myTimer()
                for (let i = 0; i < 10; i++) {
                    this.createFish()
                }
            }
            

        },
        
        createFish() {
            let fishNum = 1
            let chance = Math.floor(Math.random() * 100)
            console.log(chance)
            if (chance <= 10) {
                fishNum = 3
            } else if (chance <= 30) {
                fishNum = 2
            } else if (chance <= 60) {
                fishNum = 1
            }
                let fish = {}
                switch (fishNum) {
                    case 1:
                        fish.name = 'img/fish-1.png'
                        fish.scores = 1
                        fish.speed = 30
                        break
                    case 2:
                        fish.name = 'img/fish-2.png'
                        fish.scores = 2
                        fish.speed = 20
                        break
                    case 3:
                        fish.name = 'img/fish-3.png'
                        fish.scores = 3
                        fish.speed = 5
                        break
                    default:
                        break
                }
                fish.coords = {left: Math.floor(Math.random() * this.field.width - 150), top: Math.floor(Math.random() * (this.field.height - 300) + 150)}
                fish.direction = false
                this.fishes.push(fish)
                this.move()
        },

        move() {
            this.fishes.forEach(fish => {
                const fishMove = setInterval(() => {
                    if (fish.coords.left === this.field.width) {
                        fish.direction = true
                    }
                    if (fish.coords.left === -150) {
                        fish.direction = false
                    }
                    if (fish.direction) {
                        fish.coords.left -= 1
                    } else {
                        fish.coords.left += 1
                    }
                    if (this.end) {
                        clearInterval(fishMove)
                        
                    }
                }, 50)
            });
        },
        
        fishClick(index) {
            this.scores += this.fishes[index].scores
            this.fishes.splice(index, 1)
            this.createFish()
        },
    },

    mounted () {
        setTimeout(() => this.getData(), 0)
        if (localStorage.local) {
            this.local = typeof JSON.parse(localStorage.local) === "number" ? [JSON.parse(localStorage.local)] : JSON.parse(localStorage.local)
            this.local = this.local.sort((a, b) => {
                if (a < b) return 1
                if (a > b) return -1
                return 0
            }).slice(0, 10)
            }
    },

}).mount('#app')

