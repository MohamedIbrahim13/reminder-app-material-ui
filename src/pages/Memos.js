import { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import MemoCard from "../components/MemoCard";
import Masonry from "react-masonry-css";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
  },
  
}));

export default function Memos() {
  const [memos, setMemos] = useState([]);
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };
  useEffect(() => {
    fetch("http://localhost:8000/memos")
      .then((res) => res.json())
      .then((data) => setMemos(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/memos/${id}`, {
      method: "DELETE",
    });
    const newMemos = memos.filter((memo) => memo.id != id);
    setMemos(newMemos);
  };
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        
          {memos.map((memo) => (
            <div key={memo.id}>
              <MemoCard memo={memo} handleDelete={handleDelete} />
            </div>
          ))}
        
      </Masonry>
    </Container>
  );
}
