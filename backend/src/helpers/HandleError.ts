class HandleError {
  badRequest(message: string) {
    return ({
      message,
      status: 400,
    })
  }
}

export default new HandleError();