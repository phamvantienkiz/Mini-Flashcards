from fastapi import Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "type": f"https://api.mini-flashcards.com/errors/{exc.status_code}",
            "title": exc.detail,
            "status": exc.status_code,
            "detail": exc.detail,
            "instance": request.url.path,
        },
        headers={"Content-Type": "application/problem+json"},
    )

def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "type": "https://api.mini-flashcards.com/errors/validation-error",
            "title": "Validation Error",
            "status": 422,
            "detail": exc.errors(),
            "instance": request.url.path,
        },
        headers={"Content-Type": "application/problem+json"},
    )
