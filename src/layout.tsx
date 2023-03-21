import React, { FunctionComponent } from "react";
import * as t from "io-ts";
import { Profile } from "./types";

const CVPageProps = t.type({
  profile: Profile,
  picB64: t.union([t.string, t.undefined, t.null]),
  styles: t.string,
});

const CVPage: FunctionComponent<t.TypeOf<typeof CVPageProps>> = ({
  profile,
  picB64,
  styles,
}) => (
  <div>
    <style dangerouslySetInnerHTML={{ __html: styles }}></style>
    <div id="header">
      {picB64 && (
        <div id="image-container">
          <img
            src={`data:image/jpg;base64,${picB64}`}
            width="200px"
            height="200px"
          />
        </div>
      )}
      <div id="header-text">
        <h1>{profile.name}</h1>
        <p>{profile.description}</p>

        <span>
          {profile.links.map(({ text, url }) => (
            <div key={text}>
              <a href={url}>{text}</a>
            </div>
          ))}
        </span>
      </div>
    </div>

    <div id="experience" className="section">
      <h2>Experience</h2>
      {profile.experience.map(({ title, organization, from, to, techs, description }) => (
        <div className="list-item" key={title}>
          <div className="list-item-heading">
            <h4 className="list-item-title">{title} - {organization}</h4>
            <span>{from}</span> <ArrowIcon /> <span>{to}</span>
          </div>
          <div className="tech-list">
            {techs.map((tech) => (
              <code key={tech}>{tech}</code>
            ))}
          </div>
          {description}
        </div>
      ))}
    </div>

    {profile.other.map(({ heading, entries }) => (
      <div id="education" className="section" key={heading}>
        <h2>{heading}</h2>
        <ul>
          {entries.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const ArrowIcon = () => {
  return (
    <svg
      fill="#000000"
      width="18px"
      height="18px"
      viewBox="0 0 24 24"
      id="right-arrow"
      data-name="Flat Line"
      xmlns="http://www.w3.org/2000/svg"
      className="icon flat-line"
      style={{
        transform: "translateY(20%)",
      }}
    >
      <line
        id="primary"
        x1="3"
        y1="12"
        x2="21"
        y2="12"
        style={{
          stroke: "#000000",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
        }}
      ></line>
      <polyline
        id="primary-2"
        data-name="primary"
        points="18 15 21 12 18 9"
        style={{
          stroke: "#000000",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
        }}
      ></polyline>
    </svg>
  );
};

export default CVPage;
