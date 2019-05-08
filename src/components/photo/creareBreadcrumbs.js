import React from "react";

const CreateBreadcrumbs = ({ breadCrumbs }) => {
  return (
    <div className={"breadcrumbs"}>
      {breadCrumbs.map((e, i) => {
        if (i !== breadCrumbs.length - 1) {
          return (
            <React.Fragment key={e.text}>
              <div className="crumb">
                <a href={e.link}>{e.text}</a>
              </div>
              <div className={"crumb-sep"}>
                <i className="zmdi zmdi-chevron-right " />
              </div>
            </React.Fragment>
          );
        }
        return (
          <React.Fragment key={e.text}>
            <div className={"crumb"}>{e.text}</div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default CreateBreadcrumbs;
