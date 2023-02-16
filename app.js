function randomNumber(max, min) {
    return Math.floor(Math.random() * (max-min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            battleLogMessages: []

        }
    },
    computed: {
        playerBarStyles() {
            if (this.playerHealth < 0) {
                return { width:'0%' }
            } else {
            return {width: this.playerHealth + '%'}
            }
        },
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return { width:'0%' }
            } else {
            return {width: this.monsterHealth + '%'}
            }
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
        newGame () {
            this.playerHealth = 100,
            this.monsterHealth = 100,
            this.currentRound = 0,
            this.winner = null,
            this.battleLogMessages = []
        },

        surrenderMake() {
            this.winner='monster'
        },

        battleLogs(who, what, value) {
            this.battleLogMessages.unshift({
            attackedPerson: who,
            attackedType: what,
            actionValue: value
            });
        },

        attackMonster() {
            this.currentRound++;
            const actionValue = randomNumber(12, 5);
            this.monsterHealth = this.monsterHealth - actionValue;
            this.battleLogs('player', 'attack', actionValue)
            this.attackPlayer()
        },
        attackPlayer() {
            const actionValue = randomNumber(15, 8);
            this.playerHealth = this.playerHealth - actionValue;
            this.battleLogs('monster', 'attack', actionValue)
        },

        specialAttackMonster() {
            this.currentRound++;
            const actionValue = randomNumber(25, 10);
            this.monsterHealth = this.monsterHealth - actionValue;
            this.battleLogs('player', 'attack', actionValue)
            this.attackPlayer()
        },

        healPlayer() {
            this.currentRound++;
            const actionValue = randomNumber(15, 10)
            if(this.playerHealth + healValue > 100) {
                this.playerHealth = 100
            } else {
            this.playerHealth = this.playerHealth + actionValue;
            };
            this.battleLogs('player', 'heal', actionValue)
            this.attackPlayer()
        }
    }
})

app.mount('#game')