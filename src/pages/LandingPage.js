import { Fragment, useEffect, useState } from "react";
import LandingHeader from "../layout/LandingHeader";
import LandingGrid from "../layout/LandingGrid"

const LandingPage = () => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade((prev) => !prev);
  }, []);

  return (
    <Fragment>
      <LandingHeader fade={fade} />
      <LandingGrid fade={fade} />
    </Fragment>
  );
};
export default LandingPage;
