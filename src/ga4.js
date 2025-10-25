import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-GT3FGZTNVP");
};

export const trackPage = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

export const trackEvent = (name, params) => {
  ReactGA.event({ category: "User", action: name, ...params });
};
