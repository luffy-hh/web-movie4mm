import { Badge } from "antd";

export const sideBarData = [
  {
    label: "Home",
    // icon: <AiOutlineDashboard />,
    key: "/",
  },
  {
    label: "Genre",
    // icon: <FaCaretDown />,
    key: "genre",
    // className: "flex",
    mode: "horizontal",
    children: [
      {
        key: "genre1",
        type: "group",
        children: [
          {
            label: "Action",
            key: "/action",
          },
          {
            label: "Comedy",
            key: "/comedy",
          },
          {
            label: "Drama",
            key: "/drama",
          },
          {
            label: "Horror",
            key: "/horror",
          },
        ],
      },
      {
        key: "genre2",
        type: "group",
        children: [
          {
            label: "Documentary",
            key: "/documentary",
          },
          {
            label: "Crime",
            key: "/crime",
          },
          {
            label: "Family",
            key: "/family",
          },
          {
            label: "Fantasy",
            key: "/fantasy",
          },
        ],
      },
      {
        key: "genre3",

        type: "group",
        children: [
          {
            label: "History",
            key: "/history",
          },
          {
            label: "Thriller",
            key: "/thriller",
          },
          {
            label: "Adventure",
            key: "/adventure",
          },
          {
            label: "Science Fiction",
            key: "/science-fiction",
          },
        ],
      },
      {
        key: "genre4",

        type: "group",
        children: [
          {
            label: "Animation",
            key: "/animation",
          },
          {
            label: "Sci-Fi & Fantasy",
            key: "/sci-fi-and-fantasy",
          },
          {
            label: "Mystery",
            key: "/mystery",
          },
          {
            label: "TV Movie",
            key: "/tv-movie",
          },
          {
            label: "War",
            key: "/war",
          },
          {
            label: "Romance",
            key: "/romance",
          },
          {
            label: "Music",
            key: "/music",
          },
          {
            label: "Western",
            key: "/western",
          },
          {
            label: "Action & Adventure",
            key: "/action-and-adventure",
          },
          {
            label: "Bollywood",
            key: "/bollywood",
          },
          {
            label: "Anime",
            key: "/anime",
          },
          {
            label: "Marvel",
            key: "/marvel",
          },
          {
            label: "Reality",
            key: "/reality",
          },
        ],
      },
    ],
  },
  {
    label: "Release",
    // icon: <FaCaretDown />,
    key: "release",
    children: [
      {
        label: "2024",
        key: "/2024",
      },
      {
        label: "2023",
        key: "/2023",
      },
      {
        label: "2022",
        key: "/2022",
      },
      {
        label: "2021",
        key: "/2021",
      },
      {
        label: "2020",
        key: "/2020",
      },
      {
        label: "2019",
        key: "/2019",
      },
      {
        label: "2018",
        key: "/2018",
      },
      {
        label: "2017",
        key: "/2017",
      },
      {
        label: "2016",
        key: "/2016",
      },
    ],
  },
  {
    label: "Movies",
    // icon: <AiOutlineHistory />,
    key: "/movies",
  },

  {
    label: "Series",
    // icon: <TbReport />,
    key: "/series",
  },
  {
    label: "A-Z List",
    // icon: <BsFuelPump />,
    key: "/a-z",
  },
  {
    label: (
      <div className="flex items-center">
        <span className="inline-block mr-2">TV</span>
        <Badge count={"live"} />
      </div>
    ),
    // icon: <FaCaretDown />,
    // icon: ,
    key: "live-tv",
    children: [
      {
        label: "ALL CHANNELS",
        key: "",
      },
      {
        label: "LIVE NOW",
        key: "/live-now",
      },
      {
        label: "SPORTS",
        key: "/sports",
      },
      {
        label: "MOVIE",
        key: "/movie",
      },
      {
        label: "KIDS",
        key: "/kids",
      },
      {
        label: "NEWS",
        key: "/news",
      },
      {
        label: "DOCUMENTARY",
        key: "/tv-documentary",
      },
    ],
  },
];
