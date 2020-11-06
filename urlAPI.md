| TABLE FUNCTION                | LINK                                                                                      | METHOD | DONE |
|-------------------------------|-------------------------------------------------------------------------------------------|--------|------|
| LOGIN                         | http://localhost/project1/server/api/login.php                                            | POST   | YES  |
| USERS GET ALL                 | http://localhost/project1/server/api/users                                                | GET    | YES  |
| TICKETS GET ALL               | http://localhost/project1/server/api/tickets                                              | GET    | YES  |
| COUNTERS GET ALL              | http://localhost/project1/server/api/counters                                             | GET    | YES  |
| REQUESTS GET ALL              | http://localhost/project1/server/api/requests                                             | GET    | YES  |
| SERVEDTICKETS GET ALL         | http://localhost/project1/server/api/servedTickets                                        | GET    | YES  |
| TICKET POST                   | http://localhost/project1/server/api/insertTicketsWithType                                | POST   | YES  |
| USERS POST                    | http://localhost/project1/server/api/users                                                | POST   | NO   |
| COUNTERS POST                 | http://localhost/project1/server/api/counters                                             | POST   | NO   |
| REQUESTS POST                 | http://localhost/project1/server/api/requests                                             | POST   | NO   |
| SERVEDTICKETS POST            | http://localhost/project1/server/api/servedTickets                                        | POST   | NO   |
| TICKETS DELETE ALL            | http://localhost/project1/server/api/tickets                                              | DELETE | YES  |
| COUNTER IS READY PUT          | http://localhost/project1/server/api/counterReady/{couterId}                              | PUT    | YES  |
| TICKET HAS BEEN SERVED        | http://localhost/project1/server/api/ticketServed/{ticketId}                              | PUT    | YES  |
| TICKETS FROM REQUEST TYPE     | http://localhost/project1/server/api/getTicketsWithRequestType?req={idRequest}            | GET    | YES  |