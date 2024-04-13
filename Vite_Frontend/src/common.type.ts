export enum HTTPMethodEnum {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface HTTPRequestOptions {
  isEnabled: boolean;
  name: string;
  value: string;
}
