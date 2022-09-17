export class Matsuri {
  id: number;
  name: string;
  reason: string;
  food: string;
  date: string;
  presents: boolean;

  constructor(id: number = 0, name: string = "", reason: string = "",
  food: string = "", date: string = "", presents: boolean = false){

  this.id = id;
  this.name = name;
  this.reason = reason;
  this.food = food;
  this.date = date;
  this.presents = presents;
  }
}
