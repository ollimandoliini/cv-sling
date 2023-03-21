import * as t from "io-ts";

const Link = t.type({
  text: t.string,
  url: t.string,
});

const ExperienceEntry = t.type({
  title: t.string,
  organization: t.string,
  from: t.string,
  to: t.string,
  techs: t.array(t.string),
  description: t.string,
});

const OtherSection = t.type({
  heading: t.string,
  entries: t.array(t.string),
});

const Profile = t.type({
  name: t.string,
  description: t.string,
  links: t.array(Link),
  experience: t.array(ExperienceEntry),
  other: t.array(OtherSection),
});

export { Profile };
