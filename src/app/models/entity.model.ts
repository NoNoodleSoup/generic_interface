/**
* Entity
*/
export class Entity {
    DisplayName: string;
    Description: string;
    AcitveCapable: boolean;
    Describable: boolean;
    EntityBase: boolean;
    MultiRelationEnabled: boolean;
    Nestable: boolean;
    PendingEnables: boolean;
    Sequenced: boolean;
    Properties: Property[];

    constructor() { }
}

class Property {
    Property: string;
    DisplayName: string;
    Description: string;
    DataType: string;
    Enum: string;
}