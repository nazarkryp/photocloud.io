import { HttpRequest, HttpResponse } from '@angular/common/http';

export interface IHttpCache {
    get(req: HttpRequest<any>): HttpResponse<any> | null;
    put(req: HttpRequest<any>, resp: HttpResponse<any>): void;
}
