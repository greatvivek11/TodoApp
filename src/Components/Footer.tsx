import { h } from 'preact';
import { Version } from "../../version";
export default function Footer() {
    return (
        <footer>
            <div class="sticky inset-x-0 bottom-0 mx-2">
                <span class="text-sm md:text-base">Made by <a className="text-blue-200" href="https://www.vivekkaushik.in" target="_blank" rel="noopener noreferrer">Vivek Kaushik</a> with ❤️ using </span><span className="text-sm md:text-base font-semibold"> Preact, TailwindCSS, Vite, TS.</span>
                <p class="text-sm font-bold md:text-base">App Version: {Version} | <a className="text-blue-200" href="https://github.com/greatvivek11/TodoApp" target="_blank" rel="noopener noreferrer">Github</a></p>
            </div>
        </footer>
    )
}
