import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import styles from "./Filter.module.scss";
const Filter = (props) => {
  const launchYears = [
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
  ];
  return (
    <Card className="filter-panel">
      <Card.Body className="filter-body">
        <Card.Title>Filters</Card.Title>
        <div className="text-center">Launch Year</div>
        <hr className="mt-0" />
        <Row>
          {launchYears.map((year, index) => (
            <Col
              key={index}
              xs={6}
              className={index % 2 === 0 ? "text-left" : "text-right"}
            >
              <Button
                onClick={() =>
                  props.SetFilterCriteria(
                    props.filterCriteria?.launch_success,
                    props.filterCriteria?.land_success,
                    year
                  )
                }
                variant="primary"
                size="xs"
                className={
                  year === +props.filterCriteria?.launch_year
                    ? styles.selected + " mb-3"
                    : "mb-3"
                }
              >
                {year}
              </Button>
            </Col>
          ))}
        </Row>

        <div className="text-center">Successful Launch</div>
        <hr className="mt-0" />
        <Card.Text className="d-flex justify-content-between">
          <Button
            onClick={() =>
              props.SetFilterCriteria(
                true,
                props.filterCriteria?.land_success,
                +props.filterCriteria?.launch_year
              )
            }
            size="xs"
            variant="primary"
          >
            True
          </Button>
          <Button
            onClick={() =>
              props.SetFilterCriteria(
                false,
                props.filterCriteria?.land_success,
                +props.filterCriteria?.launch_year
              )
            }
            size="xs"
            variant="primary"
          >
            False
          </Button>
        </Card.Text>

        <div className="text-center">Successful Landing</div>
        <hr className="mt-0" />
        <Card.Text className="d-flex justify-content-between">
          <Button
            onClick={() =>
              props.SetFilterCriteria(
                props.filterCriteria?.launch_success,
                true,
                +props.filterCriteria?.launch_year
              )
            }
            size="xs"
            variant="primary"
          >
            True
          </Button>
          <Button
            onClick={() =>
              props.SetFilterCriteria(
                props.filterCriteria?.launch_success,
                false,
                +props.filterCriteria?.launch_year
              )
            }
            size="xs"
            variant="primary"
          >
            False
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Filter;
