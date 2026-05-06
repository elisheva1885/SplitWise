
import { Accordion } from '@base-ui/react/accordion';
import * as React from 'react';
import styles from './index.module.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export const GroupPage = () => {



  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
      //have the group list
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Button sx={{ background: 'black' }}>Add Group</Button>
      </List>
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );
  return (
    <>
      <div>
        <Button sx={{ background: 'black' }}>Open drawer</Button>
        <Drawer open={true}>
          {DrawerList}
        </Drawer>
      </div>
      <Accordion.Root className={styles.Accordion}>
        <Accordion.Item className={styles.Item}>
          <Accordion.Header className={styles.Header}>
            <Accordion.Trigger className={styles.Trigger}>
              What is Base UI?
              <PlusIcon className={styles.TriggerIcon} />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className={styles.Panel}>
            <div className={styles.Content}>
              Base UI is a library of high-quality unstyled React components for design systems and
              web apps.
            </div>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={styles.Item}>
          <Accordion.Header className={styles.Header}>
            <Accordion.Trigger className={styles.Trigger}>
              How do I get started?
              <PlusIcon className={styles.TriggerIcon} />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className={styles.Panel}>
            <div className={styles.Content}>
              Head to the “Quick start” guide in the docs. If you’ve used unstyled libraries before,
              you’ll feel at home.
            </div>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={styles.Item}>
          <Accordion.Header className={styles.Header}>
            <Accordion.Trigger className={styles.Trigger}>
              Can I use it for my project?
              <PlusIcon className={styles.TriggerIcon} />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className={styles.Panel}>
            <div className={styles.Content}>Of course! Base UI is free and open source.</div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion.Root>

    </>
  );
}

function PlusIcon(props: React.ComponentProps<'svg'>) {
  return (
    <>
      <svg viewBox="0 0 12 12" fill="currentcolor" {...props}>
        <path d="M6.75 0H5.25V5.25H0V6.75L5.25 6.75V12H6.75V6.75L12 6.75V5.25H6.75V0Z" />
      </svg>

    </>
  );


}



