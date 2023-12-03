Hi , I am Anukul Kumar, submitting my project for log ingestor.
Here is a walkthrough of my submission in this video on youtube

https://youtu.be/b9Ft3tnpZ6I

Language used = Javascript (Nodejs) + HTML for log query UI

How to run the project ?

Make sure the system has node installed and MySQL installed and running.

Clone the project in your local.
Install all the dependencies using => npm i

I would need you help in creating a .env file for the project.
Please don't forget to assign values for
```
1. PORT=3000
2. NODE_ENV=development
3. DATABASE=
4. DB_HOST=
5. DB_USER=
6. DB_PASSWORD=
7. DB_DIALECT=mysql
```
Create all the tables required for the project by running migrations.

`npm run db:migration:run`

Run the app using => npm start

I have added a sample env (sample.env) for the same.

How to ingest logs ?
The logs can be ingested using the api endpoint
PUT => http://localhost:3000/log

```
curl --location --request PUT 'http://localhost:3000/log' \
--header 'Content-Type: application/json' \
--data '{
	"level": "error",
	"message": "Failed to connect to DB",
    "resourceId": "server-1234",
	"timestamp": "2023-09-15T08:00:00Z",
	"traceId": "abc-xyz-123",
    "spanId": "span-456",
    "commit": "5e5342f",
    "metadata": {
        "parentResourceId": "server-9988"
    }
}'
```

How to search logs?

There is a file /logs-interface.html

This file contains the input fields for

1. Search Param => search for a log with given word
2. Level
3. Message
4. ResourceId
5. TraceId
6. SpanId
7. Commit
8. Parent Resource Id
9. Timestamp start (ts) => all logs with timestamp greater than equal to ts
10. Timestamp end (te) => all logs with timestamp less than equal to te

	

Below is the curl request for a demo search query.

```
curl 'http://localhost:3000/log/search' \
  -H 'Accept: */*' \
  -H 'Accept-Language: en-GB,en-US;q=0.9,en;q=0.8' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -H 'Origin: null' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: cross-site' \
  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  --data-raw '{"searchParam":"Failed to ","level":"error","message":"Failed to connect to DB","resourceId":"server-1234"}' \
  --compressed

```

Attaching a snapshot of search feature
![image](https://github.com/dyte-submissions/november-2023-hiring-Anukul14/assets/42563010/8462cadd-1f7e-46d3-8374-c26b4d6420c4)


Design

I have created two tables,
1) logs => this stores all the attribute of logs.
   Has columns namely :
    id ( unique and primary key), level,message,resource_id,timestamp,trace_id,span_id,commit,parent_resource_id
    Used indexing on all the columns.
2) full_text_logs
   Has two column:
   log_id => primary key and related to logs table as foreign key
   full_text => stores the log as it is. Used in search by text.
   Used full text indexing, to match word in logs.

 I have implemented the below functions:
 
a) Offered a web ui for full text search across logs.
	This is implemented on assumption that the backend is running on localhost:3000, if not so, we might have to change the url 
	here https://github.com/dyte-submissions/november-2023-hiring-Anukul14/blob/e7d1114c3d5170eb5d6e61bd7f7355d94e7dca11/logs-interface.html#L108

b) Ability to add filters on various attributes.

c) Ability to search within date ranges.

I have implemented the search within date ranges.
Attaching a snapshot of the same.
![image](https://github.com/dyte-submissions/november-2023-hiring-Anukul14/assets/42563010/3bd104f5-80be-4c9d-848c-36d91a692f1b)
The input format used is dependent on system hour format, so we might need to offset the time on the basis of AM/PM.
For timestamp "2023-09-15T18:00:00Z", we need to select "2023-09-15 06.00.00 PM" in the range 

d) Allow combining multiple filters.
