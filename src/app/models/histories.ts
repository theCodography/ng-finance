import { Jars } from "./jars";

export class Histories {
  constructor(
    public id: number,
    public type: string,
    public jar: Jars[],
    public amount: number,
    public datetime: Date,
    public description?: string
  ) {}
}
