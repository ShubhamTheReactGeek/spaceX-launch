import Head from "next/head";
import Footer from "../pages/components/Footer/Footer";
import Header from "../pages/components/Header/Header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Filter from "./components/Filter/Filter";
import LaunchCards from "./components/LaunchCards/LaunchCards";
import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";

const API_URL = "https://api.spaceXdata.com/v3/launches";
export default function Home(props) {
  const [filterCriteria, SetFilterCriteria] = useState({
    launch_year: null,
    launch_success: true,
    land_success: true,
  });

  const [isLoading, SetLoaderStatus] = useState(false);
  const [launches, SetLaunches] = useState(props.launchData);

  const router = useRouter();
  const GetLaunchData = async ({
    land_success,
    launch_success,
    launch_year,
  }) => {
    const res = await fetch(
      `${API_URL}?limit=10&launch_success=${launch_success}&land_success=${land_success}&launch_year=${launch_year}`
    );
    return await res.json();
  };
  useEffect(() => {
    if (router.query && router.query.launch_year !== undefined) {
      (async () => {
        const { land_success, launch_success, launch_year } = router.query;
        SetLoaderStatus(true);
        SetFilterCriteria({ launch_year, land_success, launch_success });
        SetLaunches(await GetLaunchData(router.query));
        SetLoaderStatus(false);
      })();
    }
  }, [router.query]);

  const handleSetFilterCriteria = async (
    launch_success,
    land_success,
    year
  ) => {
    router.push(
      `/?launch_success=${launch_success}&land_success=${land_success}&launch_year=${year}`,
      undefined,
      { shallow: true }
    );
  };

  return (
    <div>
      <Head>
        <title>SpaceX Launch</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="description" content="Space-X Web App"></meta>
      </Head>
      <div className="container-fluid">
        <Header />
        <Row>
          <Col className="mb-3" xs={12} sm={4} md={3} lg={2}>
            <Filter
              filterCriteria={filterCriteria}
              SetFilterCriteria={handleSetFilterCriteria}
            />
          </Col>
          <Col xs={12} sm={8} md={9} lg={10}>
            <div
              className={
                isLoading ? "center-align launch-container" : "launch-container"
              }
            >
              {!isLoading && launches?.length > 0 && (
                <Row>
                  {launches?.map((launch, index) => (
                    <Col key={index} className="mb-3" sm={6} md={3} lg={3}>
                      <LaunchCards data={launch} />
                    </Col>
                  ))}
                </Row>
              )}
              {!isLoading && launches?.length === 0 && (
                <div className="text-center">No launch programs</div>
              )}
              {isLoading && <Spinner animation="border" variant="secondary" />}
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}?limit=10`);
  const launchData = await res.json();
  return {
    props: {
      launchData,
    },
  };
}
