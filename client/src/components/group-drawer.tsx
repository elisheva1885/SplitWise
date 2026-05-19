import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
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
  const { id } = useParams();
const activeGroupId = Number(id);
  const { groups, setAlignment } = useGroupContext()
 

  const goToGroup = (id: number) => {
    setAlignment(null)
    navigate(`/groups/${id}`);
  };
  return (
    <Box sx={{
      width: 250, height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }} role="presentation">
      <List sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: '87%',
        '& ul': { padding: 0 },
        flex: 3,
      }}>
        <Typography>My Groups</Typography>
        {groups.map((group) => (
          <ListItem key={group.id}>
            <ListItemButton
            selected={group.id===activeGroupId}
              onClick={() => {goToGroup(group.id)}}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Chip label={group.name} sx={{
                height: 'auto',
                '& .MuiChip-label': {
                  display: 'block',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                },
              }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <br />
      <Box sx={{ flex: 0.5 }}>
        <Button
          sx={{
            background: "black",
          }}
          onClick={() => setOpen(true)}
          disabled={addLoading}
        >
          + New Group
        </Button>
      </Box>
    </Box>
  );
};
