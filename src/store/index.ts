import { InjectionKey } from 'vue';
import {
  createStore,
  useStore as baseUseStore,
  Store,
  createLogger,
} from 'vuex';
import { nanoid } from 'nanoid';

import Article, { newArticle } from '@/models/ArticleModel';

export interface State {
  articles: Array<Article>;
  currentArticle?: Article;
}

export const key: InjectionKey<Store<State>> = Symbol();

const store = createStore<State>({
  state: {
    articles: [] as Article[],
  },

  mutations: {
    addArticle(state, newArticle: newArticle) {
      const article = {
        id: nanoid(),
        title: newArticle.title,
        content: newArticle.content,
      } as Article;

      state.articles.push(article);
    },
  },

  strict: true,
  plugins: [createLogger()],
});

export function useStore() {
  return baseUseStore(key);
}

export default store;
