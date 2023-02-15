function randomNumber(max, min) {
    return Math.floor(Math.random() * (max-min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null
        }
    },
    computed: {
        playerBarStyles() {
            return {width: this.playerHealth + '%'}
        },
        monsterBarStyles() {
            return {width: this.monsterHealth + '%'}
        },
        mayUseSpecailAttack() {
            return this.currentRound % 3 !== 0;
        }
    },

    watch: {
        playerHealth(value) {
            if (value <=0 && this.monsterHealth <=0) {
                return this.winner = 'draw'
            } else if (value <=0) {
                return this.winner = 'monster'
            }
        },
        
        monsterHealth(value) {
            if (value <=0 && this.playerHealth <=0) {
                return this.winner = 'draw'
            } else if (value <=0) {
                return this.winner = 'player'
            }
            }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            const attackValue = randomNumber(12, 5);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.attackPlayer()
        },
        attackPlayer() {
            const attackValue = randomNumber(15, 8);
            this.playerHealth = this.playerHealth - attackValue;
        },

        specialAttackMonster() {
            this.currentRound++;
            const attackValue = randomNumber(25, 10);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.attackPlayer()
        },

        healPlayer() {
            this.currentRound++;
            const healValue = randomNumber(15, 10)
            if(this.playerHealth + healValue > 100) {
                this.playerHealth = 100
            } else {
            this.playerHealth = this.playerHealth + healValue;
            };
            this.attackPlayer()
        }
    }
})

app.mount('#game')