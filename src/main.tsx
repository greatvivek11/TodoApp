import { render, h } from 'preact';
import { RecoilRoot } from 'recoil';
import { App } from './app';
import './index.css';

render(
    <RecoilRoot>
        <App />
    </RecoilRoot>
    , document.getElementById('app')!
);
