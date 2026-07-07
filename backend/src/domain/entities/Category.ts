export class Category {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly name: string,
    public readonly icon: string,
    public readonly colorClass: string,
    public readonly createdAt: Date,
    public readonly description?: string | null
  ) {}
}
