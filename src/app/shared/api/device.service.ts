/**
 * MoHIS Activation API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { AddDeviceRequest } from '../model/addDeviceRequest';
import { Device } from '../model/device';
import { DeviceDetailViewModel } from '../model/deviceDetailViewModel';
import { UpdateDeviceRequest } from '../model/updateDeviceRequest';
import { UpdateDeviceViewModel } from '../model/updateDeviceViewModel';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class DeviceService {

    protected basePath = 'https://localhost:44341';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deviceAddDevicePost(body?: AddDeviceRequest, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deviceAddDevicePost(body?: AddDeviceRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deviceAddDevicePost(body?: AddDeviceRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deviceAddDevicePost(body?: AddDeviceRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('post',`${this.basePath}/Device/AddDevice`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deviceDetailIdGet(id: number, observe?: 'body', reportProgress?: boolean): Observable<DeviceDetailViewModel>;
    public deviceDetailIdGet(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DeviceDetailViewModel>>;
    public deviceDetailIdGet(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DeviceDetailViewModel>>;
    public deviceDetailIdGet(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deviceDetailIdGet.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<DeviceDetailViewModel>('get',`${this.basePath}/Device/detail/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param uuid 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deviceGetDeviceActivationUuidGet(uuid: string, observe?: 'body', reportProgress?: boolean): Observable<Device>;
    public deviceGetDeviceActivationUuidGet(uuid: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Device>>;
    public deviceGetDeviceActivationUuidGet(uuid: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Device>>;
    public deviceGetDeviceActivationUuidGet(uuid: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (uuid === null || uuid === undefined) {
            throw new Error('Required parameter uuid was null or undefined when calling deviceGetDeviceActivationUuidGet.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Device>('get',`${this.basePath}/Device/GetDeviceActivation/${encodeURIComponent(String(uuid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param uuid 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deviceGetDeviceUuidGet(uuid: string, observe?: 'body', reportProgress?: boolean): Observable<Device>;
    public deviceGetDeviceUuidGet(uuid: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Device>>;
    public deviceGetDeviceUuidGet(uuid: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Device>>;
    public deviceGetDeviceUuidGet(uuid: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (uuid === null || uuid === undefined) {
            throw new Error('Required parameter uuid was null or undefined when calling deviceGetDeviceUuidGet.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Device>('get',`${this.basePath}/Device/GetDevice/${encodeURIComponent(String(uuid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param environmentId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deviceGetDevicesByEnvironmentEnvironmentIdGet(environmentId: number, observe?: 'body', reportProgress?: boolean): Observable<Array<Device>>;
    public deviceGetDevicesByEnvironmentEnvironmentIdGet(environmentId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Device>>>;
    public deviceGetDevicesByEnvironmentEnvironmentIdGet(environmentId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Device>>>;
    public deviceGetDevicesByEnvironmentEnvironmentIdGet(environmentId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (environmentId === null || environmentId === undefined) {
            throw new Error('Required parameter environmentId was null or undefined when calling deviceGetDevicesByEnvironmentEnvironmentIdGet.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<Device>>('get',`${this.basePath}/Device/GetDevicesByEnvironment/${encodeURIComponent(String(environmentId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deviceUpdateDeviceIdGet(id: number, observe?: 'body', reportProgress?: boolean): Observable<UpdateDeviceViewModel>;
    public deviceUpdateDeviceIdGet(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UpdateDeviceViewModel>>;
    public deviceUpdateDeviceIdGet(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UpdateDeviceViewModel>>;
    public deviceUpdateDeviceIdGet(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deviceUpdateDeviceIdGet.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<UpdateDeviceViewModel>('get',`${this.basePath}/Device/UpdateDevice/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param id 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deviceUpdateDeviceIdPut(id: number, body?: UpdateDeviceRequest, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deviceUpdateDeviceIdPut(id: number, body?: UpdateDeviceRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deviceUpdateDeviceIdPut(id: number, body?: UpdateDeviceRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deviceUpdateDeviceIdPut(id: number, body?: UpdateDeviceRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deviceUpdateDeviceIdPut.');
        }


        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('put',`${this.basePath}/Device/UpdateDevice/${encodeURIComponent(String(id))}`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
