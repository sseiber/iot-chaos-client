import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { configure } from 'mobx';
import { store, StoreContext } from './app/stores/store';
import App from './app/App';
import { forget } from './utils';

// Don't allow MobX state mutation without a MobX action
configure({
    enforceActions: 'observed'
});

async function start() {
    await store.sessionStore.signin();

    ReactDOM.render(
        <Router>
            <StoreContext.Provider value={store}>
                <App />
            </StoreContext.Provider>
        </Router>,
        document.getElementById('app')
    );
}

forget(start);
