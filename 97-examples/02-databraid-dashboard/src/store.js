import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { autoRehydrate, persistStore } from 'redux-persist';
import localForage from 'localforage';
import TRANSIT_API from '@databraid/transit-widget/lib/utils/Api';
import GITHUB_API from '@databraid/github-widget/lib/utils/Api';
import SLACK_API from '@databraid/slack-widget/lib/Utils/Api';
import SHEETS_API from '@databraid/sheets-widget/lib/utils/Api';
import rootReducer from './reducers';

/* eslint-disable no-underscore-dangle, max-len */
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(
    applyMiddleware(thunkMiddleware.withExtraArgument({ TRANSIT_API, GITHUB_API, SLACK_API, SHEETS_API })),
    autoRehydrate(),
  ),
);
/* If the store is persisting more than you want you can add a "blacklist" key and exclude
a variable and the value for blacklist. Can do the opposite with "whitelist" as well. */
persistStore(store, { storage: localForage });

export default store;
