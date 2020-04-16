# 12.2 End-of-Lesson Assessment

Examine the following two tables then determine how to create a query to the database that will query the following information.

### channels

| name           | subject    | subscribers | total_views | frequency | id  | creator_id |
| -------------- | ---------- | ----------- | ----------- | --------- | --- | ---------- |
| 2K4U           | gaming     | 434924      | 1323424     | weekly    | 1   | 1          |
| Home Hack      | home       | 23524       | 228797      | monthly   | 2   | 2          |
| Tech-tonic     | tech       | 38671       | 428797      | weekly    | 3   | 3          |
| Pinnacle Point | bouldering | 7827        | 83126       | monthly   | 4   | 4          |
| 5 min Keto     | food       | 523342      | 1126826     | weekly    | 5   | 2          |

---

### creators

| id  | first_name  | last_name | age | nationality | start_year | net_worth(\$) |
| --- | ----------- | --------- | --- | ----------- | ---------- | ------------- |
| 1   | Jory        | Chavez    | 22  | Mexico      | 2015       | 300000        |
| 2   | Mauve       | Moldova   | 28  | Ukraine     | 2018       | 86000         |
| 3   | Zeus        | Spatnouk  | 33  | Greek       | 2016       | n/a           |
| 4   | Lil Feather | Mitchell  | 30  | USA         | 2015       | n/a           |

Create the SQL command that will retrieve all the following information:

1. All channels that delivery weekly content with more than 100,000 total views with their descriptions, total views, frequency, and creator name.
2. A list of the nationalities with the greatest number of subscribers in descending order with the following fields: nationality, first_name, subscribers, name as channel_name, subject
3. A list of the creators with the greatest number of total views across all channels
