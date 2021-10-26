import { InjectionKey } from 'vue';
import {
  createStore,
  useStore as baseUseStore,
  Store,
  createLogger,
} from 'vuex';
import { nanoid } from 'nanoid';

import Article, { NewArticle, UpdatedArticle } from '@/models/ArticleModel';
import Comment, { NewComment, UpdatedComment } from '@/models/CommentModel';

export interface State {
  articles: Array<Article>;
  comments: Array<Comment>;
}

export const key: InjectionKey<Store<State>> = Symbol();

const store = createStore<State>({
  state: {
    articles: JSON.parse(localStorage.getItem('articles') || '[]') as Article[],
    comments: JSON.parse(localStorage.getItem('comments') || '[]') as Comment[],
  },

  mutations: {
    addArticle(state, newArticle: NewArticle) {
      const article = { ...newArticle, id: nanoid() } as Article;
      state.articles.push(article);
      localStorage.setItem('articles', JSON.stringify(state.articles));
    },
    updateArticle(state, updatedArticle: UpdatedArticle) {
      const article = state.articles.find(
        (article) => article.id === updatedArticle.id
      );
      const index = state.articles.indexOf(article as Article);
      state.articles[index] = { ...article, ...updatedArticle } as Article;
      localStorage.setItem('articles', JSON.stringify(state.articles));
    },
    deleteArticle(state, articleId: string) {
      // TODO: Comments with this id are still there ... w.e....
      state.articles = state.articles.filter(
        (article) => article.id != articleId
      );
      localStorage.setItem('articles', JSON.stringify(state.articles));
    },

    addComment(state, newComment: NewComment) {
      const comment = { ...newComment, id: nanoid() } as Comment;
      state.comments.push(comment);
      localStorage.setItem('comments', JSON.stringify(state.comments));
    },
    updateComment(state, updatedComment: UpdatedComment) {
      const comment = state.comments.find(
        (comment) => comment.id === updatedComment.id
      );
      const index = state.comments.indexOf(comment as Comment);
      state.comments[index] = { ...comment, ...updatedComment } as Comment;
      localStorage.setItem('comments', JSON.stringify(state.comments));
    },
    deleteComment(state, commentId: string) {
      state.comments = state.comments.filter(
        (comment) => comment.id != commentId
      );
      localStorage.setItem('comments', JSON.stringify(state.comments));
    },
  },

  getters: {
    getArticleById: (state) => (articleID: string) => {
      const foundArticle =
        state.articles.find((article) => article.id === articleID) || {};
      return { ...foundArticle } as Article;
    },

    getCommentsByParentId: (state) => (id: string) => {
      const comments =
        state.comments.filter((comment) => comment.parentId === id) || [];
      return comments as Comment[];
    },

    getCommentsNumberByArticleId: (state) => (id: string) => {
      const comments =
        state.comments.filter((comment) => comment.parentId === id) || [];
      let commentsCount = comments.length;
      for (const comment of comments) {
        const children =
          state.comments.filter((c) => c.parentId === comment.id) || [];
        commentsCount += children.length;
      }

      return commentsCount;
    },
  },

  strict: true,
  plugins: [createLogger()],
});

export function useStore() {
  return baseUseStore(key);
}

export default store;
