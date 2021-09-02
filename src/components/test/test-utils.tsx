import React, {ReactElement, ReactNode} from 'react'
import {render, RenderResult, RenderOptions} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import axios, {AxiosPromise, AxiosResponse} from 'axios';
import {mocked} from 'ts-jest/utils'
import StoreProvider, {Store} from '../../Store'

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'> & {route?: string, store?: Store}): RenderResult => {
  if (options?.route) {
    window.history.pushState({}, 'Test page', options.route)
  }

  const providers = ({children}: {children?: ReactNode}) => {
    const storeProviderProps = {store: options && options.store ? options.store : {cart: []}}
    return (
      <StoreProvider {...storeProviderProps}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </StoreProvider>
    )
  }

  return render(ui, {
    wrapper: providers
    , ...options
  })
}

const matchSnapshot = (documentBody: RenderResult): void => {
  const {baseElement} = documentBody;
  expect(baseElement).toMatchSnapshot();
}

const books = [{
  "isbn": "9783864906466",
  "title": "Angular",
  "authors": [
    "Ferdinand Malcher",
    "Johannes Hoppe",
    "Danny Koppenhagen"
  ],
  "published": new Date("2019-04-30T00:00:00.000Z"),
  "subtitle": "Grundlagen, fortgeschrittene Themen und Best Practices – mit NativeScript und NgRx",
  "rating": 5,
  "thumbnails": [
    {
      "url": "https://api3.angular-buch.com/images/angular_auflage2.jpg",
      "title": "Front Cover"
    },
    {
      "url": "https://api3.angular-buch.com/images/angular_auflage2_back.jpg",
      "title": "Rückseite"
    },
    {
      "url": "https://api3.angular-buch.com/images/angular_auflage2_update-note.jpg",
      "title": "Update Hinweis"
    },
    {
      "url": "https://api3.angular-buch.com/images/angular_auflage2_book+ebook.jpg",
      "title": "Als gebundenes Buch und E-Book verfügbar"
    }
  ],
  "description": "Die Autoren führen Sie mit einem anspruchsvollen Beispielprojekt durch die Welt von Angular. Lernen Sie Schritt für Schritt, wie Sie strukturierte und modulare Single-Page-Anwendungen entwickeln. Nach der erfolgreichen ersten Auflage wurde dieses Buch grundlegend aktualisiert und erweitert:\n      Durchgängig aktualisiert auf Angular 7 und neuere Versionen, Redux mit Reactive Extensions for Angular (NgRx), Ausführliches Kapitel zu RxJS und Observables, Server-Side Rendering mit Angular Universal, HTTP-Interceptoren, Kompakter Schnelleinstieg in Angular mit Stackblitz.\n      Praktisch: Der Programmcode zu jeder einzelnen Entwicklungsphase ist auf GitHub verfügbar. So können Sie alle Schritte gut nachvollziehen und auch Teile überspringen.\n      Die Autoren Ferdinand Malcher, Johannes Hoppe und Danny Koppenhagen sind erfahrene Workshopleiter und internationale Konferenzsprecher. In diesem praxisorientierten Buch vermitteln sie die Erkenntnisse und Best Practices aus über 3 Jahren täglicher Arbeit mit Angular. Neben den Grundlagen werden auch fortgeschrittene Themen abgedeckt. Weitere behandelte Themen sind unter anderem:\n      Testing mit Jasmine, Karma und Protractor, Angular CLI, Komponenten, Pipes und Direktiven, Modulsystem, Routing, Formularverarbeitung, Dependency Injection und Services, Ahead-of-Time-Kompilierung (AOT), Deployment, Internationalisierung (i18n), Mobile Anwendungen mit NativeScript.\n      Das Buch setzt lediglich Vorkenntnisse in JavaScript, HTML und CSS voraus. Wer noch nicht mit TypeScript vertraut ist, findet in diesem Buch eine kompakte Einführung.\n      Nach der Lektüre sind Sie für den Projektalltag mit Angular gewappnet und können robuste Webanwendungen mit dem Framework entwickeln. Auf der Website zum Buch werden außerdem regelmäßig Aktualisierungen und Neuigkeiten rund um Angular veröffentlicht."
},
{
  "isbn": "9783864902079",
  "title": "Testgetriebene Entwicklung mit JavaScript",
  "authors": [
    "Sebastian Springer"
  ],
  "published": new Date("2015-02-26T00:00:00.000Z"),
  "subtitle": "Das Handbuch für den professionellen Programmierer",
  "rating": 4,
  "thumbnails": [
    {
      "url": "https://api3.angular-buch.com/images/tdd.jpg",
      "title": "Front Cover"
    }
  ],
  "description": "Entwickeln oder warten Sie JavaScript-Webapplikationen und haben immer ein ungutes Gefühl, wenn Sie Ihre Software in Betrieb nehmen? Dann wird es höchste Zeit, dass Sie sich mit testgetriebener Entwicklung vertraut machen. Dieses Buch zeigt JavaScript-Entwicklern, wie Test-Driven Development (TDD) in der Praxis funktionieren kann."
}];

jest.mock('axios');
const mockAxios = (): void => {
  const axiosResponse: AxiosResponse = {
    status: 200,
    statusText: '',
    headers: null,
    config: {},
    data: {}
  }
  mocked(axios).mockImplementation((config: any): AxiosPromise<any> => {
    switch (config.method) {
    case 'get':
      if (config.url) {
        return Promise.resolve({
          ...axiosResponse,
          data: config.url.match(/\d{10,13}/) ? books[0] : books
        })
      }
      break;
    }
    return Promise.resolve(axiosResponse)
  })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render, matchSnapshot, mockAxios, books}
