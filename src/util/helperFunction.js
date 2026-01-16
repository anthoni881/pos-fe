import moment from "moment";
export const formatDot = (value) => {
  return value && value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const formatDate = moment().utcOffset("+0700").format("YYYY-MM-DD");
export const switchDotsAndCommas = (s) => {
  function switcher(match) {
    return match === "," ? "." : ",";
  }
  return s && s.replaceAll(/\.|\,/g, switcher);
};
