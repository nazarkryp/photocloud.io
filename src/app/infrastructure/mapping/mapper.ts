export interface IMapper<S, T> {
    mapFromResponse(response: S): T;
    mapFromResponseArray(response: S[]): T[];
}

export class Mapper {
    public mapResponse<T>(response: any, TypeObject: { new(): T }): T {
        const instance = new TypeObject();

        const properties = Object.getOwnPropertyNames(response);
        properties.forEach(propertyName => {
            instance[propertyName] = response[propertyName];
        });

        return instance;
    }
}
