import { render, h } from 'preact';
import { RecoilRoot } from 'recoil';
import { App } from './app';
import InitializingServiceWorker from './Components/ServiceWorker';
import './index.css';

InitializingServiceWorker();
render(
    <RecoilRoot>
        <App />
    </RecoilRoot>
    , document.getElementById('app')!
);
