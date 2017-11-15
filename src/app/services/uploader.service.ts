import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TokenProvider } from '../infrastructure/security/token-provider';
import { Attachment } from '../common/models';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { environment } from '../../environments/environment';

@Injectable()
export class UploaderService {
    private fileUploader: FileUploader;

    constructor(
        private tokenProvider: TokenProvider) {
    }

    public createUploader(onSuccess: (attachment: Attachment) => void): FileUploader {
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
        }

        this.fileUploader.onCompleteItem = (item: any, json: any, status: any, headers: any) => {
            const response = JSON.parse(json);
            const attachment = response as Attachment;

            onSuccess(attachment);
        };

        return this.fileUploader;
    }

    private getAuthenticationOptions(): Observable<FileUploaderOptions> {
        return this.tokenProvider.getAccessToken()
            .map(accessToken => {
                if (!accessToken) {
                    return null;
                }
                const bearerToken = `Bearer ${accessToken.accessToken}`;
                const headers: Array<{ name: string; value: string; }> = [];
                headers.push({ name: 'Authorization', value: bearerToken });
                const options = <FileUploaderOptions>{ headers: headers };

                return options;
            });
    }
}
