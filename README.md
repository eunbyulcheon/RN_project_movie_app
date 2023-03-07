## Description

A mobile application that allows users to discover and explore movies and tv shows. 

<br>

## Tech Stack 

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

<br>

## Functionality 

### A. Movie screen 

https://user-images.githubusercontent.com/75746836/223316614-1aed733b-5318-4969-af9b-df8dce765868.mp4

<br>

| **Description** | ✔️ Displays "Now Trending" movies inside a Swiper, styled with a blur background provided by `BlueView`. <br> ✔️ Displays "Now Playing" and "Trending" movies in the header of a horizontal `FlatList`. <br> ✔️ Displays "Upcoming" movies in a vertical `FlatList` for lazy rendering, and functions as an infinite scroll. |
| :---: | :--- | 
| **Tasks** | ✔️ Depending on the `isLoading` state of all three movie states that React Query returns, the app renders an `Activity Indicator` (a loader) from React Native to show that the movies are loading. <br> ✔️ When the screen is pulled down, a spinner appears to refresh the data. <br> ✔️ `useInfiniteQuery` updates the "Upcoming" movies list pages depending on whether or not the user has reached to the end of the list. The page number is gotten from the built-in `getNextPageParam`, and is then passed to the `fetcher` as a prop. Utilizing the returned `hasNextPage` and `fetchNextPage` values by `useInfiniteQuery`, a `loadMore` function fetches more "Upcoming" movie pages if `hasNextPage` is true. |

<br>

### B. TV screen

https://user-images.githubusercontent.com/75746836/223320502-1aca6e26-da22-4c6b-b4c6-c372906ab9a0.mp4

<br>

| **Description** | ✔️ Displays three horizontal `FlatLists` inside a vertical `ScrollView`. <br> ✔️ Displays "Trending", "Airing Today", and "Top-Rated" TV shows.|
| :---: | :--- |
| **Tasks** | ✔️ A loader component (a spinner) appears on the screen if the three states are loading. <br> ✔️ When the screen is pulled down, the `ScrollView` receives a `RefreshControl` component to show the `refreshing` state. A spinner is displayed until the `queryClient` refetches all the queries that have a key of "tv".|

<br>

### C. Search screen 

https://user-images.githubusercontent.com/75746836/223321304-8753e7b6-9a84-4faa-a26b-5dd94ff7f4e6.mp4

<br>

| **Description** | ✔️ Displays a search bar. <br> ✔️ Searched movie and tv shows are rendered on the screen. |
| :---: | :--- |
| **Tasks** | ✔️ The user's query is passed to the `fetcher` through the query's array of `keys`. <br> ✔️ Query is disabled for better performance: it will only execute when the user submits the query. |

<br>

### D. Detail screen

https://user-images.githubusercontent.com/75746836/223322761-96720b19-7918-4d4f-97fc-d1d8e3188ed5.mp4

<br>

| **Description** | ✔️ Displays detailed information of the selected movie or TV show. |
| :---: | :--- |
| **Tasks** | ✔️ Title of movie and tv show is displayed on the navigation's header only once when the component mounts. <br> ✔️ Detailed content returned by the API as `data` of each movie and tv show is received by the Detail screen through the `params` of `useQuery`, when the user presses on an item. <br> ✔️ `Expo-web-browser` is used to link the user to the official trailer (Youtube) of the selected movie or tv show, without translating the user outside the application. <br> ✔️ Depending on the Platform (iOS or Android), React Native's `Share` API allows sharing a url and a title (in the case of iOS) or the source's homepage and title (in the case of Android). |

<br>

## Issues found along the way 

### Issue #1 

- **Issue**: When the user triggers a refresh by pulling down the View, the screen makes jumps. 
- **Cause**: Refreshing was executed whenever any of the `isRefetching` states returned by React Query was true, causing re-renders while refreshing. 
- **Solution**: Creating a React state for the refresh activity, and updating its state with `setState`.

``` diff
  const queryClient = useQueryClient();
  
+ const [refreshing, setRefreshing] = useState(false);

  const {
    isLoading: trendingLoading, 
    data: trendingData, 
-   isRefetching: isRefetchingTrending,
  } = useQuery(['movies', 'trending'], MoviesAPI.trending);
  
  const {
    isLoading: upcomingLoading, 
    data: upcomingData, 
-   isRefetching: isRefetchingUpcoming,
  } = useQuery(['movies', 'upcoming'], MoviesAPI.upcoming);
  
   const {
    isLoading: nowPlayingLoading, 
    data: nowPlayingData, 
-   isRefetching: isRefetchingNowLoading,
   } = useQuery(['movies', 'nowPlaying'], MoviesAPI.nowPlaying);
 
  const onRefresh = async () => {
+   setRefreshing(true);
    await queryClient.refetchQueries(['movies']);
+   setRefreshing(false);
  };
  
- const refreshing = isRefetchingTrending || isRefetchingUpcoming || isRefetchingNowPlaying;
  
```

<br>

### Issue 2

- **Issue**: The automatic interchange of a search query when the component mounts creates an Error. 
- **Cause**: When the component mounts, `data` is empty. 
- **Solution**: Disabling immediate query by turning `useQuery` hook's `enabled` option to `false`. And using the `refetch` function to define when the query should be executed, in this case, on `onSubmit`. 

``` diff
+  const {isLoading, data, refetch} = useQuery(
    ['searchMovies', query],
     moviesApi.search,
+    {
+        enabled: false,
+     }
  );
  
  const onChangeText = (text: string) => setQuery(text);
  const onSubmit = () => {
	  if (query === '') return;
+	  refetch();
};
```

<br>

## What I've Learned 

- Combining Tab navigators with Stack navigators.
- The difference between `ScrollView` and `FlatList`. 
- Integrating Dark mode using `useColorScheme` and `Appearance`. 
- The benefits of React Query, and how it overcomes the challenges created by server states. 
