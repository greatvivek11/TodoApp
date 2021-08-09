import {h} from 'preact';

export default function Footer() {
    return (
        <footer>
            <div class="sticky inset-x-0 bottom-0 mx-2">
                <p class="text-sm md:text-base">Made by <a className="text-blue-200" href="https://www.vivekkaushik.in" target="_blank" rel="noopener noreferrer">Vivek Kaushik</a> with ❤️ using Preact, TailwindCSS, Vite, TS.</p>
            </div>
        </footer>
    )
}
