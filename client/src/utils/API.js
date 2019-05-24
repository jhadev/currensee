import axios from 'axios';

export default {
  /* 
    loginCreds = {username: "alex", "password": 12345Password!}
  */
  login: function(loginCreds) {
    return axios.post('/api/users/login', loginCreds);
  },
  /* 
    Path to check if user is logged in
  */
  loginCheck: function() {
    return axios.get('/api/users/login');
  },
  /* 
    Path to log out
  */
  logout: function() {
    return axios.get('/api/users/logout');
  },
  /* 
    Path to register new user, you can have more fields than this but "username" and "password" must exist

    userInfo = {
      username: "alex",
      password: 12345Password!
    }
  */
  register: function(userInfo) {
    return axios.post('/api/users/register', userInfo);
  },

  budgetPost: function(userInfo) {
    return axios.post('/api/budget', userInfo);
  },

  budgetInsert: function(userInfo) {
    return axios.post('/api/budget', userInfo);
  },

  getBudget: function() {
    return axios.get('api/budget');
  },
  getMonth: function() {
    return axios.get('api/budget/month');
  },

  getSumByIncome: function() {
    return axios.get('api/budget/sumbyincome');
  },

  getSumByMonth: function() {
    return axios.get('api/budget/sumbymonth');
  },

  getSumByMonthTrue: function() {
    return axios.get('api/budget/sumbymonthtrue');
  },

  getSumByMonthFalse: function() {
    return axios.get('api/budget/sumbymonthfalse');
  },

  getSumByCategory: function() {
    return axios.get('api/budget/sumbycategory');
  },

  getDelete: function(id) {
    return axios.delete(`api/budget/id/${id}`);
  },

  searchWalmart: function(searchTerm) {
    return axios.post(`api/external/walmart`, searchTerm);
  },

  getWalmart: function() {
    return axios.get(`api/external/walmart`);
  },

  deleteAllRecords: function() {
    return axios.get('api/budget/delete-all-records');
  }
};
