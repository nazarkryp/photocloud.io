import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TokenProvider } from 'app/infrastructure/security/token-provider';
import { AttachmentViewModel } from 'app/models/view';
import { environment } from 'app/../environments/environment';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';

@Injectable()
export class UploaderService {
    private fileUploader: FileUploader;

    constructor(
        private tokenProvider: TokenProvider) {
    }

    public createUploader(onSuccess: (attachment: AttachmentViewModel) => void): FileUploader {
        this.fileUploader = new FileUploader({
            url: environment.apiUri + 'attachments'
        });

        this.getAuthenticationOptions()
            .subscribe(options => {
                if (options) {
                    this.fileUploader.setOptions(options);
                }
            });

        this.fileUploader.onAfterAddingFile = (file) => {
            file.upload();
        };

        this.fileUploader.onCompleteItem = (item: any, json: any, status: any, headers: any) => {
            const response = JSON.parse(json);
            const attachment = response as AttachmentViewModel;

            onSuccess(attachment);
        };

        return this.fileUploader;
    }

    private getAuthenticationOptions(): Observable<FileUploaderOptions> {
        return this.tokenProvider.getAccessToken()
            .pipe(map(accessToken => {
                if (!accessToken) {
                    return null;
                }

                const bearerToken = `Bearer ${accessToken.accessToken}`;
                const headers: Array<{ name: string; value: string; }> = [];
                headers.push({ name: 'Authorization', value: bearerToken });
                const options = <FileUploaderOptions>{ headers: headers };

                return options;
            }));
    }
}
