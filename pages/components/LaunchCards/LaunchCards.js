import React from "react";
import Card from "react-bootstrap/Card";
import styles from "./LaunchCards.module.scss";
const LaunchCards = (props) => {
  const image = props.data?.links?.mission_patch_small;
  const missionName = props.data?.mission_name;
  const flightNo = props.data?.flight_number;
  const missionIds = props.data?.mission_id;
  const launchYear = props.data?.launch_year;
  const launchSuccess = props.data?.launch_success?.toString();
  const landingSuccess = props.data?.launch_landing?.toString();
  return (
    <Card id="launch-card">
      <Card.Img
        id="launch-image"
        variant="top"
        alt="LaunchImage"
        src={image}
        style={{ padding: "20px" }}
      />
      <Card.Body>
        <Card.Text className={styles.missionTitle}>
          {missionName} #{flightNo}
        </Card.Text>
        <div>
          <label>
            <b>Mission Ids:</b>
          </label>
          <ul>
            {missionIds &&
              missionIds.map((id) => (
                <li className={styles.missionItem} key={id}>
                  {id}
                </li>
              ))}
          </ul>
          <div>
            <b>Launch Year:</b>{" "}
            <span className={styles.missionItem}>{launchYear}</span>
          </div>
          <div>
            <b>Successful Launch:</b>{" "}
            <span className={styles.missionItem}>{launchSuccess}</span>
          </div>
          <div>
            <b>Successful Landing:</b>{" "}
            <span className={styles.missionItem}>{landingSuccess}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default LaunchCards;
