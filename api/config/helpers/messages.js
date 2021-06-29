module.exports = {
  errorMessage (message) {
    return {
      error: message
    }
  },
  successMessage (message) {
    return {
      message: message
    }
  },
}
