import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './shared/store';
import App from './app';

const root = createRoot(document.querySelector('#root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);