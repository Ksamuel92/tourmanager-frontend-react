import { Fragment, useEffect, useState } from "react";
import LandingHeader from "../components/landing-page/LandingHeader";
import LandingGrid from "../components/landing-page/LandingGrid";

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
