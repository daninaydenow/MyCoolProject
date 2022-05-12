import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { RepoService } from 'src/app/services/repo-service.service';

// TODO: Replace this with your own data model type
export interface DataGridItem {
  repoName: string;
  description: string;
  programLanguage: string;
  stargazers: number;
  repoUrl: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataGridItem[] = [
  {
    repoName: 'oss-review-toolkit',
    description:
      'A suite of tools to assist with reviewing Open Source Software dependencies.',
    programLanguage: 'Kotlin',
    stargazers: 6,
    repoUrl: 'https://github.com/bosch-io/oss-review-toolkit',
  },
];

/**
 * Data source for the DataGrid view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataGridDataSource extends DataSource<DataGridItem> {
  data: DataGridItem[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private repoService: RepoService) {
    super();
  }

  getRepos(): void {
    this.repoService.getRepos().subscribe((result) => (this.data = result.map((x) => {"repoName": x.name, re }));
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataGridItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        })
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataGridItem[]): DataGridItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataGridItem[]): DataGridItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'repoName':
          return compare(a.repoName, b.repoName, isAsc);
        case 'programLanguage':
          return compare(a.programLanguage, b.programLanguage, isAsc);
        case 'stargazers':
          return compare(+a.stargazers, +b.stargazers, isAsc);
        default:
          return 0;
      }
    });

    return data;
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
