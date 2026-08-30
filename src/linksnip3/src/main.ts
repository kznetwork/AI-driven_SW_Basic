import './style.css';
import { makeCode } from './lib/shorten';

const app = document.querySelector<HTMLElement>('#app');

if (!app) {
  throw new Error('APP_NOT_FOUND');
}

app.innerHTML = `
  <h1>LinkSnip3</h1>
  <form>
    <label for="url">줄일 URL</label>
    <div>
      <input id="url" name="url" type="url" placeholder="https://example.com" required />
      <button type="submit">코드 만들기</button>
    </div>
  </form>
  <output aria-live="polite"></output>
`;

const form = app.querySelector<HTMLFormElement>('form');
const output = app.querySelector<HTMLOutputElement>('output');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  output!.value = makeCode(String(data.get('url') ?? ''));
});
