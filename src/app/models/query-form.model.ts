/**
 * QueryForm
 */
export class QueryForm {

    constructor(
        public dbTable: string,
        public sqlClause: string,
        public field: string,
        public comparisonOperator: string,
        public condition: string
    ) { }
}