import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  media: {
    paddingTop: "8%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
  },
  border: {
    border: "solid",
  },
  fullHeightCard: {
    height: "100%",
  },
  card: {
    display: "flex",
    // flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "100%",
    position: "relative",
  },
  overlay: {
    flex: "row",
    position: "absolute",
    // top: "20px",
    left: "20px",
    // color: "white",
  },
  overlay2: {
    marginBottom: "20px",
    position: "absolute",
    top: "20px",
    right: "20px",
    // color: "white",
  },
  grid: {
    display: "flex",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
  },
  title: {
    padding: "0 16px",
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
  },
  cardAction: {
    display: "block",
    textAlign: "initial",
  },
});
