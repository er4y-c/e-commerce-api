export class Category {
  _id: string;
  name: string;
  description: string;
  banner: string;
  created_at: Date;
  updated_at: Date;
  parent: string | null;
}
