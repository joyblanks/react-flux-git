export default {

    /**
     * ReposApi :: getRepos 
     * fetch repositories for a particular User
     * @param {string} user
     * @param {number} page
     * @returns {Promise} Promise of list of Repositories
     */
    getRepos: (user, page) => {
      return fetch(`https://api.github.com/users/${user}/repos?page=${page}`); 
    }
}  