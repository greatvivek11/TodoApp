import { render, h } from 'preact';
import { RecoilRoot } from 'recoil';
import { App } from './app';
import InitializingServiceWorker from './Components/ServiceWorker';
import './index.css';
import RecoilNexus from "recoil-nexus";

InitializingServiceWorker();
render(
    <RecoilRoot>
        <RecoilNexus />
        <App />
    </RecoilRoot>
    , document.getElementById('app')!
);
