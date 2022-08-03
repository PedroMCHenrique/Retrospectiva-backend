class HandleError {
  badRequest(message: string) {
    return ({
      message,
      status: 400,
    })
  }

  unauthorized(message: string) {
    return ({
      message,
      status: 401,
    });

  }
  
  notFound(message: string) {
    return ({
      message,
      status: 404,
    });

  }
}

export default new HandleError();