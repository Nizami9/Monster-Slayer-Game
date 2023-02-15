function randomAttack(max, min) {
    return Math.floor(Math.random() * (max-min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100
        }
    },
    computed: {
        playerBarStyles() {
            return {width: this.playerHealth + '%'}
        },
        monsterBarStyles() {
            return {width: this.monsterHealth + '%'}
        }
    },
    methods: {
        attackMonster() {
            const attackValue = randomAttack(12, 5);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.attackPlayer()
        },
        attackPlayer() {
            const attackValue = randomAttack(15, 8);
            this.playerHealth = this.playerHealth - attackValue;
        }
    }
})

app.mount('#game')