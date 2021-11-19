## How long did you spend on the coding test? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.
- Setup up Project (NodeJS + React in one Project) : 2 Hours
- Making Frontend Page : 1 Hour
- Setup API : 1 Hour
- Format API (Rank,DateTime) : 30 Minutes
I would like to add a loading screen wheen calling an API rather than waiting from empty table to be filled.
Also add a cache system that if already called an API before. System should show cached data instead of sending GET again.

## What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
It was useEffect function that used for running functions whenever a variable changes.
In before we have to use componentDidMount, componentDidUpdate, and componentWillUnmount combined together to be just a useEffect function.

In my snippet it is said that whenever timeRange variable changes
It will send an fund ranking API for get data if it success.
If it fails empty the data.
```
  useEffect(() => {
    axios
      .get("/fundranking", { params: { timerange: timeRange } })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setData(null);
      });
  }, [timeRange]);
```

## How would you track down a performance issue in production? Have you ever had to do this?
I have never done it but I think by going developer tool (F12 for Google Chrome) in performance tab
We can see which part of the project is using by how much time. Then we can click into each timing and analyze it part by part.
Or we can use react developer tool extension in profiler tab which that will tell which component that used most time.

## How would you improve the FINNOMENA APIs that you just used?
- Changing from a choosing url by static files (ex 1Y.json) to query using parameters in GET API (ex. ?timerange=1Y).
- Add authorization header that only registered user can be used APIs such as Bearer with JWT Token.
- Use Swagger for listing and documenting API.
