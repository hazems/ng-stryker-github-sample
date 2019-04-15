export class Repository {
    constructor(
        public name: string,
        public html_url: string,
        public description: string,
        public open_issues: number,
        public watchers: number
        ){}
}