import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useGroupContext } from "../store/use-group.context";
type GroupDrawerListProps = {
  setOpen: (open: boolean) => void;
  addLoading: boolean;
};
export const GroupDrawerList = ({
  setOpen,
  addLoading,
}: GroupDrawerListProps) => {
  const navigate = useNavigate();
  const { groups } = useGroupContext();
  const goToGroup = (id: number) => {
    navigate(`/groups/${id}`);
  };
  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <Typography>My Groups</Typography>
        {groups.map((group) => (
          <ListItem key={group.id}>
            <ListItemButton
              onClick={() => goToGroup(group.id)}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Chip label={group.name}></Chip>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <br />
      <Button
        sx={{ background: "black" }}
        onClick={() => setOpen(true)}
        disabled={addLoading}
      >
        + New Group
      </Button>
    </Box>
  );
};
