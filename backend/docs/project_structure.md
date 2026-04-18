## Cấu trúc thư mục đề xuất (production-ready)

=================================================

```
app/
│
├── main.py                # entry point
├── core/                  # config & core logic
│   ├── config.py
│   ├── security.py
│   ├── dependencies.py
│   └── constants.py
│
├── api/                   # route layer (controller)
│   ├── v1/
│   │   ├── endpoints/
│   │   │   ├── auth.py
│   │   │   ├── user.py
│   │   │   ├── ai_inference.py
│   │   │   └── health.py
│   │   └── router.py
│   └── deps.py
│
├── schemas/               # request/response (Pydantic)
│   ├── auth.py
│   ├── user.py
│   ├── ai.py
│   └── base.py
│
├── models/                # DB models (ORM: SQLAlchemy)
│   ├── user.py
│   ├── session.py
│   └── base.py
│
├── services/              # business logic
│   ├── auth_service.py
│   ├── user_service.py
│   ├── ai_service.py      # gọi AI service
│   └── storage_service.py
│
├── repositories/          # data access layer
│   ├── user_repo.py
│   ├── session_repo.py
│   └── base.py
│
├── integrations/          # external services
│   ├── ai_client.py       # call AI service (HTTP/gRPC)
│   ├── redis_client.py
│   └── s3_client.py
│
├── exceptions/            # custom exception
│   ├── base.py
│   ├── auth.py
│   ├── ai.py
│   └── handlers.py
│
├── enums/                 # enum definitions
│   ├── user_role.py
│   ├── status.py
│   └── ai_type.py
│
├── utils/                 # helper functions
│   ├── image.py
│   ├── time.py
│   └── logger.py
│
├── middleware/            # middleware
│   ├── logging.py
│   └── auth.py
│
├── db/                    # database config
│   ├── session.py
│   └── base.py

```
