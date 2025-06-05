
const skills: string[] = ['Bash', 'Heal', 'Counter']

interface Character {
    name: string;
    hp: number;
    skills: string[];
    hometown?: string;
}

const strider: Character = {
    name: 'strider',
    hp: 100,
    skills: ['Bash', 'Counter']
}
console.log(undefined)
console.log(strider);
strider.hometown = 'Mexico';
console.log(strider);

export { };