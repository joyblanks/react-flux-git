export default {

    /**
     * CommitsAPI :: getCommits 
     * fetch commits for a particular Repository
     * @param {string} user
     * @param {repo} repository
     * @param {number} page
     * @returns {Promise} Promise of list of Commits
     */
    getCommits: (user, repo, page) => {
      return fetch(`https://api.github.com/repos/${user}/${repo}/commits?page=${page}`); 
    }
}  