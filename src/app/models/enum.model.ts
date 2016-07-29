/**
 * enum
 */
export class Enum {
    Flags: boolean;
    Description: string;
    AdvancedDescriptor: string;
    EnumMembers: Member[];

    constructor() {
    }
}

class Member {
    Description: string;
    AdvancedDescriptor: string;
    Name: string;
    Value: string;

    constructor() {
    }

}