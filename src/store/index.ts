import { InjectionKey } from 'vue';
import {
  createStore,
  useStore as baseUseStore,
  Store,
  createLogger,
} from 'vuex';

import Article from '@/models/ArticleModel';

export interface State {
  articles: Array<Article>;
  currentArticle?: Article;
}

export const key: InjectionKey<Store<State>> = Symbol();

const store = createStore<State>({
  state: {
    articles: [] as Article[],
  },
  strict: true,
  plugins: [createLogger()],
});

export function useStore() {
  return baseUseStore(key);
}

export default store;
