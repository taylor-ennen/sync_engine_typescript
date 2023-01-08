export interface Request {
    id: number;
    endpoint: string;
    data: any;
  }
  
  export class RequestQueue {
    private queue: Request[] = [];
    private interval: number;
    private limit: number;
    private endpoint: string;
  
    constructor(endpoint: string, interval = 60000, limit = 10) {
      this.endpoint = endpoint;
      this.interval = interval;
      this.limit = limit;
    }
  
    public addRequest(request: Request): void {
      this.queue.push(request);
    }
  
    public startProcessing(): void {
      setInterval(() => this.processQueue(), this.interval);
    }
  
    private processQueue(): void {
      // Take the first 'limit' number of requests from the queue
      const toProcess = this.queue.slice(0, this.limit);
      this.queue = this.queue.slice(this.limit);
  
      // Send the requests to the API
      for (const request of toProcess) {
        sendRequestToApi(this.endpoint, request);
      }
    }
  }
  
  function sendRequestToApi(endpoint: string, request: Request): void {
    // Make the API request
    apiCall(endpoint, request.data).then(response => {
      // Save the response to the database
      saveResponseToDatabase(response, request.id);
    });
  }