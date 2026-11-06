from fastapi import FastAPI, Request, Response
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, field_validator
from password_strength import MAX_PASSWORD_LENGTH, assess_password

app = FastAPI()


class PasswordRequest(BaseModel):
    password: str = Field(min_length=1, max_length=MAX_PASSWORD_LENGTH, strict=True, repr=False)

    @field_validator("password")
    @classmethod
    def validate_length(cls, password: str) -> str:
        if len(password.encode("utf-16-le", errors="surrogatepass")) // 2 > MAX_PASSWORD_LENGTH:
            raise ValueError("Password is too long")
        return password


class PasswordAssessment(BaseModel):
    score: int = Field(ge=0, le=4)
    label: str
    tips: list[str]


@app.exception_handler(RequestValidationError)
async def invalid_request(request: Request, exc: RequestValidationError):
    # Do not echo submitted passwords in validation errors.
    return JSONResponse(status_code=422, content={"detail": "Invalid request"}, headers={"Cache-Control": "no-store"})


@app.post("/api/password-strength", response_model=PasswordAssessment)
def password_strength(payload: PasswordRequest, response: Response):
    response.headers["Cache-Control"] = "no-store"
    return assess_password(payload.password)

@app.get("/")
def root():
    return {"Hello" : "World!"}
