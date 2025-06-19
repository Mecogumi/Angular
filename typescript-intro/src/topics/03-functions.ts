function addNumbers(number1: number, number2: number) {
    return number1 + number2;
}

const addNumberArrow = (number1: number, number2: number): string => {
    return `${number1 + number2}`
}

function multiply(firstNumber: number, secondNumber?: number, base: number = 2): number {
    return firstNumber * base
}

interface Character {
    name: string
    hp: number
    showHp: () => void;
}


const healCharacter = (character: Character, amount: number) => {

    character.hp += amount;
}

const player: Character = {
    name: 'player',
    hp: 50,
    showHp() {
        console.log(`Puntos de vida: ${this.hp}`)
    }

}

healCharacter(player, 30);

player.showHp()

export { };