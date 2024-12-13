import { Badge } from "antd";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { FaHeart } from "react-icons/fa6";

export const sideBarData = (genres, categories, years) => {
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
      children: years,
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

export const afterLoginMenu = (name, days) => {
  return [
    {
      label: name,
      key: "profile",
      icon: <FaUser />,
      disabled: true,
    },
    {
      label: `Remaining Days: ${days}`,
      key: "days",
      icon: <FaUser />,
      disabled: true,
    },
    {
      label: "Favorite List",
      key: "fav-list",
      icon: <FaHeart />,
    },
    {
      label: "Logout",
      key: "logout",
      icon: <FiLogOut />,
    },
  ];
};
