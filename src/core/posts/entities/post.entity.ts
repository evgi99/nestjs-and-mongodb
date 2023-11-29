// unused file
export class Post {
    userId: number;
    id: number;
    title: string;
    body: string;

    constructor(title: string, body: string, userId: number) {
        this.userId = userId;
        this.title = title;
        this.body = body;
      }
}
