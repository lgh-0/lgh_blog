import axios from 'axios';

const API_URL = 'http://localhost:8083/api/articles';

export const articleService = {
    async getFolderContents(path) {
        const response = await axios.get(`${API_URL}/folder`, {
            params: { path: path || '/' }
        });
        return response.data;
    },

    async getArticleContent(path) {
        const response = await axios.get(`${API_URL}/${encodeURIComponent(path)}`);
        return response.data;
    },

    async createArticle(article) {
        const response = await axios.post(API_URL, article);
        return response.data;
    },

    async updateArticle(path, article) {
        const response = await axios.put(`${API_URL}/${encodeURIComponent(path)}`, article);
        return response.data;
    },

    async deleteArticle(path) {
        await axios.delete(`${API_URL}/${encodeURIComponent(path)}`);
    }
};
