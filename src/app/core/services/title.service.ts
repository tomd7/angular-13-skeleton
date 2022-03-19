import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {BehaviorSubject, filter, map, merge, Observable, tap} from 'rxjs';

/**
 * @link https://www.thisdot.co/blog/how-to-update-the-application-title-based-on-routing-changes-in-angular
 */
@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private readonly _appName: string = environment.app.name;
  private readonly _separator: string = '|';

  private _fullTitleChange$ = new BehaviorSubject<string>('');
  private _titleChange$ = new BehaviorSubject<string>('');

  public title$: Observable<string> = this._titleChange$.asObservable();

  private titleRoute$: Observable<string | undefined> =
    this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this._getRouteTitle(this._route.firstChild))
    );

  private titleState$ = merge(this._fullTitleChange$, this.titleRoute$).pipe(
    filter((title) => title !== undefined),
    tap((title) => {

      if (title === undefined) {
        return;
      }

      this._titleChange$.next(title);

      if (title !== this._appName) {
        title = this._formatTitle(title);
      }

      this._title.setTitle(title);
    })
  );

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _title: Title,
  ) {
    this.titleState$.subscribe();
  }

  /**
   * Update the title in the index.html and in the observable
   * @param title New title
   */
  public set(title: string) {
    this._titleChange$.next(title);
    title = this._formatTitle(title);
    this._fullTitleChange$.next(title);
    this._title.setTitle(title);
  }

  /**
   * Append the title to the app name with the separator
   * @param title Title to append to the app name
   */
  private _formatTitle(title: string): string {
    return `${this._appName} ${this._separator} ${title}`;
  }

  /**
   * Return the page title of the current route
   * @param route Route to get the title from
   */
  private _getRouteTitle(route: ActivatedRoute | null): string | undefined {
    while (route) {
      if (route.firstChild) {
        route = route.firstChild;
      } else if (
        route.snapshot.data &&
        route.snapshot.data['pageTitle']
      ) {
        return route.snapshot.data['pageTitle'] as string;
      } else {
        return undefined;
      }
    }
    return undefined;
  }
}
