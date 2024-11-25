export default class Contender{
    public Id: string
    public Guesses: string
    public Points: number

    constructor(line: string){
        const data: string[] = line.split(" ")
        this.Id = data[0]
        this.Guesses = data[1]
        this.Points = 0
    }
}