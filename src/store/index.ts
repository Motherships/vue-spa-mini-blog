import { InjectionKey } from 'vue';
import {
  createStore,
  useStore as baseUseStore,
  Store,
  createLogger,
} from 'vuex';
import { nanoid } from 'nanoid';

import Article, { NewArticle } from '@/models/ArticleModel';
import CommentModel, { NewComment } from '@/models/CommentModel';

export interface State {
  articles: Array<Article>;
  comments: Array<CommentModel>;
}

export const key: InjectionKey<Store<State>> = Symbol();

const store = createStore<State>({
  state: {
    articles: JSON.parse(localStorage.getItem('articles') || '[]') as Article[],
    comments: JSON.parse(
      localStorage.getItem('comments') || '[]'
    ) as CommentModel[],
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

    addComment(state, newComment: NewComment) {
      const comment = {
        id: nanoid(),
        parentId: newComment.parentId,
        authorName: newComment.authorName,
        content: newComment.content,
      } as CommentModel;

      state.comments.push(comment);
      localStorage.setItem('comments', JSON.stringify(state.comments));
    },
  },

  getters: {
    getArticleById: (state) => (articleID: string) => {
      const foundArticle = JSON.parse(
        JSON.stringify(
          state.articles.find((article) => article.id === articleID) || {}
        )
      );
      return {
        id: foundArticle.id,
        title: foundArticle.title,
        content: foundArticle.content,
        comments: [],
      } as Article;
    },

    getCommentsByParentId: (state) => (id: string) => {
      const comments = JSON.parse(
        JSON.stringify(
          state.comments.filter((comment) => comment.parentId === id) || []
        )
      );

      return comments as CommentModel[];
    },
  },

  strict: true,
  plugins: [createLogger()],
});

export function useStore() {
  return baseUseStore(key);
}

export default store;
