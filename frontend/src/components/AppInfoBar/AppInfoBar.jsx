import { APPLICATION_LIST } from "../consts";

export const AppInfoBar = () => {

  const ARR = Math.floor(Math.random()*150000)
  let csCoverage
  if (ARR < 30000) {
    csCoverage = "Low Touch"
  } else if (ARR < 100000) {
    csCoverage = "Mid Touch"
  } else {
    csCoverage = "High Touch"
  }

  return (
    <div className="app-info-bar">
      <h2>Apps</h2>
      <div className="app-info-container">
        <div className="algolia-account-overview flex-group">
          <img alt="" src="https://819835.apps.zdusercontent.com/819835/assets/1707464129-4e56f77cdbf4d416015fc01216d6b0e0/logo-small.png" />
          <p>Algolia Account Overview</p>
        </div>
        <div className="algolia-org">
          <div className="algolia-app-subtitle">
            <img src="https://819835.apps.zdusercontent.com/819835/assets/1707464129-4e56f77cdbf4d416015fc01216d6b0e0/icons/briefcase-solid.svg" alt="" />
            <h3>Organization</h3>
          </div>
          <ul className="algolia-org-info">
            <li>
              <strong>ARR: </strong>{ARR.toLocaleString('en', {useGrouping: true})}
            </li>
            <li>
              <strong>Main Account Plan:</strong>
            </li>
            <li>
              <strong>AE:</strong>
            </li>
            <li>
              <strong>CS Contact:</strong>
            </li>
            <li>
              <strong>CS Coverage: </strong>{csCoverage}
            </li>
          </ul>
        </div>
        <div className="algolia-user-info">
          <div className="algolia-app-subtitle">
            <img src="https://819835.apps.zdusercontent.com/819835/assets/1707464129-4e56f77cdbf4d416015fc01216d6b0e0/icons/user-solid.svg" alt="" />
            <div className="algolia-user">
              <h3>User</h3>
              <a href="https://admin.algolia.com/admin/users/810007" target="blank">Admin link</a>
            </div>
          </div>
          <div className="algolia-perso-indicator">
            <img src="https://819835.apps.zdusercontent.com/819835/assets/1707464129-4e56f77cdbf4d416015fc01216d6b0e0/icons/check-circle-solid.svg" alt="" />
            <p>User can be personified.</p>
          </div>
          <ul className="algolia-user-info-list">
            <li>
              <strong>Created at:</strong> Oct 14, 2024
            </li>
          </ul>
        </div>
        <div className="algolia-applications-container">
          <div className="algolia-app-subtitle">
            <img src="https://819835.apps.zdusercontent.com/819835/assets/1707464129-4e56f77cdbf4d416015fc01216d6b0e0/icons/folder-open-solid.svg" alt="" />
            <h3>Applications</h3>
          </div>
          <ul className="algolia-applications-list">
            {APPLICATION_LIST.map((app) => {
              return (
                <a key={app.appID} href={`https://admin.algolia.com/admin/users/810007/applications/${app.appID}`} target="blank">
                  <li>{app.appID}</li>
                  {app.type === "shopify" ? <div className="shopify" /> : null}
                </a>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
