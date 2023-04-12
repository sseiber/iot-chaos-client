import { createContext, useContext } from 'react';
import { SessionStore } from './session';
import { LoopBoxStore } from './loopbox';

export interface IStore {
    sessionStore: SessionStore;
    loopBoxStore: LoopBoxStore;
}

export interface IStoreResult {
    result: boolean;
    message: string;
    data?: any;
}

export const store: IStore = {
    sessionStore: new SessionStore(),
    loopBoxStore: new LoopBoxStore()
};

export const StoreContext = createContext(store);

export const useStore = (): IStore => {
    return useContext(StoreContext);
};
