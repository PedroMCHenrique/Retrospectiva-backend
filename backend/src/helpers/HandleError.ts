class HandleError {
  badRequest(message: string) {
    return ({
      message,
      status: 400,
    })
  }

  notFound(message: string) {
    return ({
      message,
      status: 404,
    });

  }
}

export default new HandleError();