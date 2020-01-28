import { MapType } from '../_utils/type';

type HttpMethod = 'GET' | 'POST' | 'HEAD' | 'PUT' | 'DELETE';

interface HttpParams {
  [prop: string]: any;
}

interface HttpRequest {
  url: string;
  params: HttpParams;
  method: HttpMethod;
}

interface IHttpResponse {
  header: MapType<string>[];
}

class HttpResponse implements IHttpResponse {
  header: MapType<string>[] = [];
}

class HttpUtil {
  static request(request: HttpRequest): IHttpResponse {
    return new HttpResponse();
  }

  static get(url: string, params?: HttpParams): IHttpResponse {
    return new HttpResponse();
  }

  static head(url: string, params?: HttpParams): IHttpResponse {
    return new HttpResponse();
  }

  static delete(url: string, params?: HttpParams): IHttpResponse {
    return new HttpResponse();
  }

  static put(url: string, params?: HttpParams): IHttpResponse {
    return new HttpResponse();
  }

  static post(url: string, params?: HttpParams): IHttpResponse {
    return new HttpResponse();
  }
}

export { HttpParams, HttpMethod, HttpResponse, HttpRequest };
export default HttpUtil;
