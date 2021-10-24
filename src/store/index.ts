import { InjectionKey } from 'vue';
import {
  createStore,
  useStore as baseUseStore,
  Store,
  createLogger,
} from 'vuex';
import { nanoid } from 'nanoid';

import Article, { NewArticle, CurrentArticle } from '@/models/ArticleModel';

export interface State {
  articles: Array<Article>;
  currentArticle?: CurrentArticle;
}

export const key: InjectionKey<Store<State>> = Symbol();

const store = createStore<State>({
  state: {
    articles: (JSON.parse(localStorage.getItem('articles') || '[]') ||
      []) as Article[],
    currentArticle: (JSON.parse(
      localStorage.getItem('currentArticle') || '{}'
    ) || {}) as CurrentArticle,
  },

  mutations: {
    addArticle(state, newArticle: NewArticle) {
      const article = {
        id: nanoid(),
        title: newArticle.title,
        content: newArticle.content,
      } as Article;

      state.articles.push(article);
      localStorage.setItem('articles', JSON.stringify(state.articles));
    },

    setCurrentArticleByID(state, articleID: string) {
      const foundArticle = JSON.parse(
        JSON.stringify(
          state.articles.find((article) => article.id === articleID)
        )
      );
      const article = {
        id: foundArticle.id,
        title: foundArticle.title,
        content: foundArticle.content,
        comments: [],
      } as CurrentArticle;

      state.currentArticle = article;
      localStorage.setItem(
        'currentArticle',
        JSON.stringify(state.currentArticle)
      );
    },
  },

  strict: true,
  plugins: [createLogger()],
});

export function useStore() {
  return baseUseStore(key);
}

export default store;
