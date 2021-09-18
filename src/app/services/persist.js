import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['filters'],
    blacklist: ['filters.lastSearch', 'filters.searchFromFavorite']
}

export default persistConfig