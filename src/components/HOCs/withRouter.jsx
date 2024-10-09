import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = (Component) => {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let nav = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, nav, params }} />;
  }
  return ComponentWithRouterProp;
};

export default withRouter;
