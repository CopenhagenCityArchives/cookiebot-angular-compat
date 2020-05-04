import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cookiebot-compat';
  query: string = "";
  hits: any[];
  error: any;

  constructor(private http: HttpClient) {}

  getData() {
    let body = {
      from: 0,
      size: 10,
      query: {
        bool: {
          must: [
            {
              nested: {
                path: "personal_appearance",
                query: {
                  simple_query_string: {
                    query: this.query,
                    fields: ["*"],
                    default_operator: "and"
                  }
                }
              }
            }
          ]
        }
      }
    };

    this.http.post<any>('https://data.linklives.dk:9200/pas/_search', body)
      .subscribe(result => this.hits = result.hits.hits);
  }
}
