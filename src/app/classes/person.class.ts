export class Person {
  constructor(
    public firstName: string,
    public lastName: string,
    public age: number,
    public occupation: string,
    public hitPoints: number
  ) {}

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  reduceHitPoints(target: Person, amount: number) {
    if (target.hitPoints > 0) {
      target.hitPoints -= amount;
      console.log(
        `${this.getFullName()} attacks ${target.getFullName()} for ${amount} damage!`
      );
      console.log(
        `${target.getFullName()} has ${target.hitPoints} hit points remaining.`
      );
    } else {
      console.log(`${target.getFullName()} is already knocked out!`);
    }
  }
}
