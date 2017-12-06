import { Injectable } from '@angular/core';

function _localStorage(): Storage {
    return localStorage;
}

@Injectable()
export class LocalStorageService {
    public get<T>(key: string, type: { new(): T }): T {
        const json = _localStorage().getItem(key);

        if (!json) {
            return null;
        }

        try {
            const parsed = JSON.parse(json);

            const instance = new type();
            const properties = Object.getOwnPropertyNames(parsed);
            properties.forEach(propertyName => {
                instance[propertyName] = parsed[propertyName];
            });

            return instance;
        } catch (e) {
            this.removeItem(key);
            return null;
        }
    }

    public set<T>(key: string, value: T) {
        const json = JSON.stringify(value);
        _localStorage().setItem(key, json);
    }

    public removeItem(key: string) {
        _localStorage().removeItem(key);
    }

    public clear() {
        _localStorage().clear();
    }
}
