export function UnauthorizedException() {
    return { status: 401, data: "Unauthorized access" }
}

export function SuccessException(ctx) {
    return { status: 200, data: ctx ? ctx : "Success" }
}

export function InternalException() {
    return { status: 500, data: "Server Internal Exception" }
}
export function BadRequest(data) {
    return { status: 400, data: data ? data : "Bad Request" }
}

export function NotFoundException(path) {
    return { status: 404, data: path ? path : `(${path}) Resources not found` }
}