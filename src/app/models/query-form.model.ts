/**
 * QueryForm
 */
export class QueryForm {

    constructor(
        public sqlClause: string,
        public field: string,
        public dataType: string,
        public comparisonOperator: string,
        public condition: string,
        public isActive: boolean = false
    ) { }
}