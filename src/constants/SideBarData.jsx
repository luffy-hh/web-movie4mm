import { Badge } from "antd";

export const sideBarData = (genres, categories) => {
  // console.log(categories);

  return [
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
      children: genres.map((genre) => ({
        key: `/${genre.genre_id}`,
        label: genre.name,
        column: genre.name,
        // icon: <Badge count={genre.count} color="red" size="small" />,
      })),
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
      children: categories,
    },
  ];
};
