# hacktivoverflow

| Method | URL                                    | Description                                    |
|--------|----------------------------------------|------------------------------------------------|
| GET    | /api/threads                           | Get all articles                               |
| GET    | /api/threads/:id/replies               | Get specified replies by threads id            |
| GET    | /api/threads/:id/reply                 | Get all reply by thread id                     |
| POST   | /api/threads/                          | Create article by user id                      |
| POST   | /api/threads/:id/reply                 | Create reply article by user id per article id |
| PUT    | /api/threads/:id                       | Update article by article id per user id       |
| PUT    | /api/threads/:id/reply/:repid          | Update reply by article id per user id         |
| PUT    | /api/threads/:id/upvote                | Give up vote by article id                     |
| PUT    | /api/threads/:id/reply/:repid/upvote   | Give up vote for reply by per article id       |
| PUT    | /api/threads/:id/downvote              | Give down vote by per article id               |
| PUT    | /api/threads/:id/reply/:repid/downvote | Give down vote for reply by per article id     |
| DELETE | /api/threads/:id                       | Delete article by article id                   |
| DELETE | /api/threads/:id/reply/:repid          | Delete reply article by article id             |