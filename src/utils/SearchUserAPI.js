export default {
  /**
   * search user via the github API, if no user found 404 is thrown
   * @param {string} text the search keyword
   * @returns {Promise} the promise of a user object
   */
    searchUser: (text) => {
      return fetch(`https://api.github.com/users/${text}`); 
    }
}  