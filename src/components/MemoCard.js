import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import { makeStyles } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import { yellow, green, pink, blue } from '@material-ui/core/colors'

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (memo) => {
      if (memo.category == 'work') {
        return yellow[700]
      }
      if (memo.category == 'money') {
        return green[500]
      }
      if (memo.category == 'todos') {
        return pink[500]
      }
      return blue[500]
    },
  }
})
export default function MemoCard({ memo,handleDelete }) {
  const classes = useStyles(memo);
  return (
    <div>
      <Card elevation={2}>
        <CardHeader
		avatar={
            <Avatar className={classes.avatar}>
              {memo.category[0].toUpperCase()}
            </Avatar>}
          action={
            <IconButton onClick={()=>handleDelete(memo.id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={memo.title}
          subheader={memo.category}
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {memo.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
